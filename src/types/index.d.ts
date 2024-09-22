declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly NODE_ENV?: string;
        readonly GOOGLE_SHEET_CLIENT_EMAIL?: string;
        readonly GOOGLE_SHEET_PRIVATE_KEY?: string;
        readonly GOOGLE_SHEET_ID?: string;
        readonly GOOGLE_SHEET_NAME?: string;
        readonly GROQ_API_KEY?: string;
        readonly GOOGLE_AI_API_KEY?: string;
      }
    }
  }
}
