/* eslint-disable no-unused-vars */

export interface GoogleAiInterface {
  generateContent(
    prompt: string,
    systemInstruction?: string,
    imagePaths?: Array<string>,
    model?: string,
  ): Promise<string>;
}
