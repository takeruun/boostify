declare module 'process' {
	global {
		namespace NodeJS {
			interface ProcessEnv {
				readonly NODE_ENV?: string;
        readonly SPREAD_SHEET_ID?: string;
        readonly SHEET_NAME?: string;
				readonly GROQ_API_KEY?: string;
				readonly SELENIUM_SERVER_URL?: string;
			}
		}
	}
}
