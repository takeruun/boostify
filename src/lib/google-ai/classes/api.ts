import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import * as fs from 'fs';
import { GoogleAiInterface } from '../interfaces';

export const newGoogleAi = (apiKey: string): GoogleAiInterface => {
  return new GoogleAi(apiKey);
};

class GoogleAi implements GoogleAiInterface {
  protected client: GoogleGenerativeAI;
  private model: string = 'gemini-1.5-pro';

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('apiKey is required');
    }

    this.client = new GoogleGenerativeAI(apiKey);
  }

  async generateContent(
    prompt: string,
    imagePaths?: Array<string>,
  ): Promise<string> {
    try {
      const imageParts: Array<Part> = imagePaths
        ? imagePaths.map((path) => this.fileToGenerativePart(path, 'image/png'))
        : [];

      const result = await this.client
        .getGenerativeModel({ model: this.model })
        .generateContent([prompt, ...imageParts]);
      const response = result.response.text();
      if (!response) {
        throw new Error('Failed to generate content');
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw error;
      } else {
        throw new Error('Failed to generate content');
      }
    }
  }

  private fileToGenerativePart(path: string, mimeType: string) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString('base64'),
        mimeType,
      },
    };
  }
}
