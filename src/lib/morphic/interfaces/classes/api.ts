export interface MorphicApiConstructor {
  LOGIN_EMAIL: string;
  PASSWORD: string;
}

export interface MorphicApiInterface {
  postImageEvaluation(content: string): Promise<boolean>
}