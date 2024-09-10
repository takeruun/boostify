/* eslint-disable no-unused-vars */

export interface GroqApiConstructor {
  apiKey: string;
}

export interface GroqApiInterface {
  postEvaluation(content: string): Promise<boolean>;
}
