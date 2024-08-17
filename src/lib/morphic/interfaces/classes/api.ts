/* eslint-disable no-unused-vars */

export interface MorphicApiConstructor {
  loginEmail: string;
  password: string;
}

export interface MorphicApiInterface {
  chat(content: string): Promise<string>;
}
