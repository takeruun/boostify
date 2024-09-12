import { google, Common, sheets_v4 } from 'googleapis';
import { SheetApiInterface } from '../interface';

export const newSheetApi = (): SheetApiInterface => {
  return new SheetApi();
};

export class SheetApi {
  private sheetsClient = google.sheets('v4');

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: './credentials/google-service-account.json',
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });
    google.options({ auth });
  }

  async getValues(
    spreadsheetId: string,
    range: string,
  ): Promise<Common.GaxiosResponse<sheets_v4.Schema$ValueRange>> {
    return await this.sheetsClient.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
  }
}
