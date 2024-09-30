/* eslint-disable no-unused-vars */

import { Common, sheets_v4 } from 'googleapis';

export interface SheetApiConstructor {}

export interface SheetApiInterface {
  getValues(
    range: string,
  ): Promise<Common.GaxiosResponse<sheets_v4.Schema$ValueRange>>;
  addValues(
    range: string,
    values: string[][],
  ): Promise<Common.GaxiosResponse<sheets_v4.Schema$AppendValuesResponse>>;
  rewriteValues(
    range: string,
    values: string[][],
  ): Promise<Common.GaxiosResponse<sheets_v4.Schema$UpdateValuesResponse>>;
  getSheets(): Promise<Array<sheets_v4.Schema$Sheet>>;
  createSheets(titles: Array<string>): Promise<void>;
}
