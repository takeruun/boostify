import { Common, google, sheets_v4 } from 'googleapis';

import { SheetApiInterface } from '../interface';

type SheetApiConstructor = {
  ClientEmail: string;
  PrivateKey: string;
  SheetId: string;
};

export const newSheetApi = (params: SheetApiConstructor): SheetApiInterface => {
  return new SheetApi(params);
};

export class SheetApi {
  private sheetsClient = google.sheets('v4');
  protected sheetId: string;

  constructor({ ClientEmail, PrivateKey, SheetId }: SheetApiConstructor) {
    if (!ClientEmail || !PrivateKey || !SheetId) {
      throw new Error('ClientEmail, PrivateKey, and SheetId are required');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: ClientEmail,
        private_key: PrivateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    google.options({ auth });
    this.sheetId = SheetId;
  }

  async getValues(
    range: string,
  ): Promise<Common.GaxiosResponse<sheets_v4.Schema$ValueRange>> {
    return await this.sheetsClient.spreadsheets.values.get({
      spreadsheetId: this.sheetId,
      range,
    });
  }

  async addValues(
    range: string,
    values: string[][],
  ): Promise<Common.GaxiosResponse<sheets_v4.Schema$AppendValuesResponse>> {
    return await this.sheetsClient.spreadsheets.values.append({
      spreadsheetId: this.sheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
  }

  async rewriteValues(
    range: string,
    values: string[][],
  ): Promise<Common.GaxiosResponse<sheets_v4.Schema$UpdateValuesResponse>> {
    return await this.sheetsClient.spreadsheets.values.update({
      spreadsheetId: this.sheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
  }

  async getSheets(): Promise<Array<sheets_v4.Schema$Sheet>> {
    const res = await this.sheetsClient.spreadsheets.get({
      spreadsheetId: this.sheetId,
    });

    return res.data.sheets || [];
  }

  async createSheets(titles: Array<string>): Promise<void> {
    const requests: Array<sheets_v4.Schema$Request> = [];
    titles.forEach((title) => {
      requests.push({
        addSheet: {
          properties: {
            title,
          },
        },
      });
    });

    await this.sheetsClient.spreadsheets.batchUpdate({
      spreadsheetId: this.sheetId,
      requestBody: {
        requests,
      },
    });
  }
}
