import {
  GoogleGenerativeAI,
  GoogleGenerativeAIFetchError,
  Part,
} from '@google/generative-ai';
import * as fs from 'fs';

import { GoogleAiInterface } from '../interfaces';
import { GoogleAiError } from './error';

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
    systemInstruction?: string,
    imagePaths?: Array<string>,
    model?: string,
  ): Promise<string> {
    try {
      const imageParts: Array<Part> = imagePaths
        ? imagePaths.map((path) => this.fileToGenerativePart(path, 'image/png'))
        : [];

      const result = await this.client
        .getGenerativeModel({ model: model || this.model, systemInstruction })
        .generateContent([prompt, ...imageParts]);
      const response = result.response.text();
      if (!response) {
        throw new GoogleAiError('No response');
      }

      return response;
    } catch (error) {
      if (error instanceof GoogleGenerativeAIFetchError) {
        let errorMessages = error.statusText || '';
        if (error.errorDetails) {
          if (errorMessages) errorMessages += '\nError Details:\n';
          errorMessages += error.errorDetails
            .map((detail) => `domain:${detail.domain}, reason:${detail.reason}`)
            .join('\n');
        }
        throw new GoogleAiError(errorMessages, error.status);
      } else {
        throw new GoogleAiError('Failed to generate content');
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
