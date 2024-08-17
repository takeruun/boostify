import 'dotenv/config';
import * as fs from 'fs';
import {
  Browser,
  Builder,
  By,
  Key,
  ThenableWebDriver,
  until,
} from 'selenium-webdriver';
import { LOGIN_URL, MORPHIC_URL } from '../constants';
import {
  MorphicApiConstructor,
  MorphicApiInterface,
} from '../interfaces/classes/api';

export const newMorphicApi = ({
  loginEmail,
  password,
}: MorphicApiConstructor): MorphicApiInterface => {
  return new MorphicApi(loginEmail, password);
};

export class MorphicApi {
  private seleniumDriver: ThenableWebDriver;
  private loginEmail: string;
  private password: string;
  private cookiesFilePath: string = 'credentials/morphic/cookies.json';

  constructor(loginEmail: string, password: string) {
    if (!loginEmail || !password) {
      throw new Error('loginEmail and password are required');
    }
    this.loginEmail = loginEmail;
    this.password = password;

    const seleniumServerUrl = process.env.SELENIUM_SERVER_URL;

    const driver = new Builder().forBrowser(Browser.CHROME);

    if (seleniumServerUrl) {
      driver.usingServer(seleniumServerUrl);
    }
    this.seleniumDriver = driver.build();
  }

  private async setAuth() {
    if (fs.existsSync(this.cookiesFilePath)) {
      await this.seleniumDriver.get(MORPHIC_URL);
      // cookies.json から読み込み
      const cookies = JSON.parse(
        fs.readFileSync(this.cookiesFilePath, 'utf-8'),
      );
      for (const cookie of cookies) {
        await this.seleniumDriver.manage().addCookie(cookie);
      }

      await this.seleniumDriver.get(MORPHIC_URL);

      return;
    }

    await this.login();
  }

  private async login() {
    try {
      await this.seleniumDriver.get(LOGIN_URL);
      await this.seleniumDriver
        .findElement(By.id('email'))
        .sendKeys(this.loginEmail);
      await this.seleniumDriver
        .findElement(By.id('password'))
        .sendKeys(this.password);
      await this.seleniumDriver
        .findElement(By.xpath('/html/body/div[2]/div/div[3]/form/button'))
        .click();

      await this.seleniumDriver.wait(until.urlIs(MORPHIC_URL), 10000);

      // cookies.json に保存
      const cookies = await this.seleniumDriver.manage().getCookies();
      fs.writeFileSync(
        this.cookiesFilePath,
        JSON.stringify(cookies, null, 2),
      );
    } catch (error) {
      console.log('login error:', error);

      this.seleniumDriver.quit();

      if (fs.existsSync(this.cookiesFilePath)) {
        fs.unlinkSync(this.cookiesFilePath);
      }

      throw error;
    }
  }

  async chat(content: string): Promise<string> {
    if (!content) {
      throw new Error('content is required');
    }

    let result = '';

    try {
      await this.setAuth();

      await this.seleniumDriver
        .findElement(By.xpath('/html/body/div[2]/div/div/form/div[1]/textarea'))
        .sendKeys(content.replace(/\n/g, Key.chord(Key.SHIFT, Key.ENTER)));

      await this.seleniumDriver
        .findElement(By.xpath('/html/body/div[2]/div/div/form/div[1]/button'))
        .click();

      await this.seleniumDriver.wait(
        until.elementLocated(By.xpath("//*[text()='Answer']")),
        60000,
      );

      await this.seleniumDriver.wait(
        until.elementLocated(
          By.xpath(
            "//*[text()='Morphic can make mistakes. Verify response and sources.']",
          ),
        ),
        60000,
      );

      const elem = await this.seleniumDriver.wait(
        until.elementLocated(
          By.xpath("//*[text()='Answer']/following-sibling::*[1]"),
        ),
        60000,
      );

      result = await elem.getText();
    } catch (e) {
      console.log('postImageEvaluation Error:', e);
    } finally {
      await this.seleniumDriver.sleep(5000);

      await this.seleniumDriver.quit();
    }

    return result;
  }
}
