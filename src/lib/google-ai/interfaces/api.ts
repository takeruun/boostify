/* eslint-disable no-unused-vars */

export interface GoogleAiInterface {
  generateContent(prompt: string, imagePaths?: Array<string>): Promise<string>;
}
