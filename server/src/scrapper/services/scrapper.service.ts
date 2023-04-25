import { Injectable } from '@nestjs/common';
import type { BrowserContext } from 'puppeteer';
import { InjectContext } from 'nest-puppeteer';
import * as puppeteer from 'puppeteer';
const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];
@Injectable()
export class ScrapperService {
  async scrapAllPrice() {
    async function getStockPrice() {
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
      await page.goto('https://merolagani.com/StockQuote.aspx');
      const element = await page.$$('.table');
      //   const text = await page.evaluate((el) => el.textContent, element);
      console.log(element);
      //   const rows = await page.evaluate(() => {
      //     const data = [];
      //     const rows = element[0];
      //     console.log(rows);
      //     //   for (let i = 1; i < rows; i++) {
      //     //     let company =
      //     //       document.getElementsByClassName('table')[0].rows[i].cells[1]
      //     //         .innerText;
      //     //     let ltp =
      //     //       document.getElementsByClassName('table')[0].rows[i].cells[2]
      //     //         .innerText;
      //     //     let changes =
      //     //       document.getElementsByClassName('table')[0].rows[i].cells[3]
      //     //         .innerText;
      //     //     data.push({ company, ltp, changes });
      //     //   }
      //     return data;
      //   });
      await browser.close();
      return 'rowss';
    }
    const getStockPrice23 = async () => {
      const browser = await puppeteer.launch({
        headless: true,
        args: minimal_args,
        userDataDir: './cache',
      });
      const page = await browser.newPage();
      await page.goto('https://merolagani.com/StockQuote.aspx');
      const rows = await page.$$('.table tr');

      const data = [];
      for (let i = 0; i < rows.length; i++) {
        const cells = await rows[i].$$('td');
        let dataRow = {};
        for (let j = 0; j < cells.length; j++) {
          const text = await cells[j].evaluate((node) => node.innerText);
          console.log(`Row ${i + 1}, Cell ${j + 1}: ${text}`);
        }
        if (cells.length > 0) {
          dataRow = {
            company: await cells[1].evaluate((node) => node.innerText),
            ltp: await cells[2].evaluate((node) => node.innerText),
            changes: await cells[3].evaluate((node) => node.innerText),
          };
          data.push(dataRow);
          console.log(dataRow);
        }
      }
      console.log(data);
      await browser.close();
      return data;
    };

    return getStockPrice23();
  }
}
