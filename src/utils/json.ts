import * as fs from 'fs';

/**
 * json ファイルから、name の値を key にして value の値を value として新たな json ファイルを作成する
 */
export function createJsonFileFromJson(
  jsonFilePath: string,
  savablePath: string,
) {
  const cookieData = fs.readFileSync(jsonFilePath, 'utf8');
  // json parse
  const json: Array<Record<string, string>> = JSON.parse(cookieData);

  const newJson: Record<string, string> = {};
  for (const [, value] of Object.entries(json)) {
    newJson[value.name] = value.value;
  }

  fs.writeFileSync(savablePath, JSON.stringify(newJson, null, 2));
}
