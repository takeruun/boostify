export interface MorphicApiConstructor {
  LOGIN_EMAIL: string;
  PASSWORD: string;
}

export interface MorphicApiInterface {
  chat(content: string): Promise<string>
}