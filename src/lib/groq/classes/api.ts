import Groq, { APIError } from 'groq-sdk';
import { SYSTEM_PROMPT } from '../constants';
import {
  GroqApiConstructor,
  GroqApiInterface,
} from '../interfaces/classes/api';

export const newGroqApi = ({
  apiKey,
}: GroqApiConstructor): GroqApiInterface => {
  return new GroqApi(apiKey);
};

export class GroqApi {
  protected client: Groq;
  private model: string = 'llama3-8b-8192';

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('apiKey is required');
    }

    this.client = new Groq({
      apiKey,
    });
  }

  async postEvaluation(content: string): Promise<boolean> {
    try {
      const res = await this.client.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content,
          },
        ],
        model: this.model,
      });
      const resContent = res.choices[0].message.content;
      if (!resContent) {
        throw new Error('Failed to evaluate post content');
      }

      return resContent.includes('YES');
    } catch (error) {
      if (error instanceof APIError) {
        console.log(error);
        switch (error.status) {
          case 403:
            throw new Error('Invalid API key');
        }
      } else {
        throw error;
      }
    }

    return false;
  }
}
