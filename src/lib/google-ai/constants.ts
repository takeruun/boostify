// モデル名
export const GEMINI_FLASH = 'gemini-1.5-flash';
export const GEMINI_PRO = 'gemini-1.5-pro';

// モデル別 1日あたりのリクエスト数
export const FREE_REQUEST_LIMIT_PER_DAY = {
  'gemini-1.5-flash': 1500,
  'gemini-1.5-pro': 50,
};

// モデル別 1分あたりのリクエスト数
export const FREE_REQUEST_LIMIT_PER_MINUTE = {
  'gemini-1.5-flash': 15,
  'gemini-1.5-pro': 2,
};
