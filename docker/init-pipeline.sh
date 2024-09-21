#!/bin/bash

# Elasticsearchが起動するまで待つ
until curl -s http://elasticsearch:9200; do
  echo "Waiting for Elasticsearch to be available..."
  sleep 5
done

# Ingest Pipelineを登録する
curl -X PUT http://elasticsearch:9200/_ingest/pipeline/replace_timestamp \
-H 'Content-Type: application/json' \
-d '{
  "description": "Replace @timestamp with the custom timestamp field",
  "processors": [
    {
      "date": {
        "field": "parsed_message.timestamp",
        "target_field": "@timestamp",
        "formats": ["yyyy-MM-dd HH:mm:ss"],
        "timezone": "Asia/Tokyo"
      }
    }
  ]
}'

curl -X PUT http://elasticsearch:9200/_ingest/pipeline/main_pipeline \
-H 'Content-Type: application/json' \
-d '{
  "description": "Main pipeline with replace_timestamp and parsed_message",
  "processors": [
    {
      "json": {
        "field": "message",
        "target_field": "parsed_message"
      }
    },
    {
      "pipeline": {
        "name": "replace_timestamp"
      }
    }
  ]
}'

echo "Ingest pipeline registered successfully."
