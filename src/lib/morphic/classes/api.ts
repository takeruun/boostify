import 'dotenv/config'
import * as fs from 'fs';
import { Browser, Builder, By, ThenableWebDriver, until, error as SELENIUM_ERROR } from 'selenium-webdriver';
import { LOGIN_URL, MORPHIC_URL } from '../constants';
import {MorphicApiConstructor, MorphicApiInterface} from '../interfaces/classes/api';

export const newMorphicApi = ({LOGIN_EMAIL, PASSWORD}:MorphicApiConstructor): MorphicApiInterface => {
  return new MorphicApi(LOGIN_EMAIL, PASSWORD);
}

export class MorphicApi {
  private seleniumDriver: ThenableWebDriver;
  private LOGIN_EMAIL: string;
  private PASSWORD: string;
  private COOKIES_FILE_PATH: string = 'credentials/morphic/cookies.json';

  constructor(LOGIN_EMAIL: string, PASSWORD: string) {
    if (!LOGIN_EMAIL || !PASSWORD) {
      throw new Error('LOGIN_EMAIL and PASSWORD are required');
    }
    this.LOGIN_EMAIL = LOGIN_EMAIL;
    this.PASSWORD = PASSWORD;

    const seleniumServerUrl = process.env.SELENIUM_SERVER_URL;

    const driver = new Builder().
    forBrowser(Browser.CHROME)

    if (seleniumServerUrl) {
      driver.usingServer(seleniumServerUrl)
    }
    this.seleniumDriver = driver.build();
  }

  private async setAuth() {
    if (fs.existsSync(this.COOKIES_FILE_PATH)) {
      await this.seleniumDriver.get(MORPHIC_URL)
      // cookies.json から読み込み
      const cookies = JSON.parse(fs.readFileSync(this.COOKIES_FILE_PATH, 'utf-8'))
      for (const cookie of cookies) {
        await this.seleniumDriver.manage().addCookie(cookie)
      }

      await this.seleniumDriver.get(MORPHIC_URL)
      
      return;
    }

    await this.login();
  }

  private async login() {
    try {
      await this.seleniumDriver.get(LOGIN_URL)
      await this.seleniumDriver.findElement(By.id('email')).sendKeys(this.LOGIN_EMAIL)
      await this.seleniumDriver.findElement(By.id('password')).sendKeys(this.PASSWORD)
      await this.seleniumDriver.findElement(By.xpath('/html/body/div[2]/div/div[3]/form/button')).click()

      await this.seleniumDriver.wait(until.urlIs(MORPHIC_URL), 10000);
  
      // cookies.json に保存
      const cookies = await this.seleniumDriver.manage().getCookies()
      fs.writeFileSync(this.COOKIES_FILE_PATH, JSON.stringify(cookies,null,2))
    } catch (error) {
      console.log('login error:',error);

      this.seleniumDriver.quit();

      if (fs.existsSync(this.COOKIES_FILE_PATH)) {
        fs.unlinkSync(this.COOKIES_FILE_PATH);
      }

      throw error;
    }
  }

  async chat(content: string): Promise<string> {
    if (!content) {
      throw new Error('content is required');
    }

    let result = "";

    try{
      await this.setAuth();

      await this.seleniumDriver.findElement(By.xpath('/html/body/div[2]/div/div/form/div[1]/textarea')).sendKeys(content)

      await this.seleniumDriver.findElement(By.xpath('/html/body/div[2]/div/div/form/div[1]/button')).click()

      await this.seleniumDriver.wait(until.elementLocated(By.xpath("//*[text()='Answer']")), 60000);

      await this.seleniumDriver.wait(until.elementLocated(By.xpath("//*[text()='Morphic can make mistakes. Verify response and sources.']")), 60000);
      
      const elem = await this.seleniumDriver.wait(
        until.elementLocated(By.xpath("//*[text()='Answer']/following-sibling::*[1]")), 
        60000
      );

      result = await elem.getText();
    }catch(e){
      console.log('postImageEvaluation Error:', e);
    } finally {
      await this.seleniumDriver.sleep(5000);

      await this.seleniumDriver.quit();
    }

    return result;
  }
}