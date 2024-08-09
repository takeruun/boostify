import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "../constants";
import { GroqApiConstructor, GroqApiInterface } from "../interfaces/classes/api";

export const newGroqApi = ({API_KEY}:GroqApiConstructor): GroqApiInterface => {
  return new GroqApi(API_KEY);
}

export class GroqApi {
  protected client: Groq;
  private model: string = 'llama3-8b-8192';

  constructor(API_KEY: string) {
    this.client = new Groq({
      apiKey: API_KEY,
    });
  }

  async postEvaluation(content: string): Promise<boolean> {
    const res = await this.client.chat.completions.create({
      messages: [
        {
          role: 'system', content: SYSTEM_PROMPT
        },
        {
          role: 'user', content
        }
      ],
      model: this.model,
    });
    const resContent = res.choices[0].message.content;
    if (!resContent) {
      return false;
    }
    return resContent.includes('YES');
  }
}