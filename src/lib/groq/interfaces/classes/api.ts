/* eslint-disable no-unused-vars */

export interface GroqApiConstructor {
  API_KEY: string;
}

export interface GroqApiInterface {
  postEvaluation(content: string): Promise<boolean>;
}