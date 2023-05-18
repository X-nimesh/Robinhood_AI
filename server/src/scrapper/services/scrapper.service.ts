import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import type { BrowserContext } from 'puppeteer';
import { InjectContext } from 'nest-puppeteer';
import * as puppeteer from 'puppeteer';
import { Cache } from 'cache-manager';
import * as redisStore from 'cache-manager-redis-store';

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
import { spawn } from 'child_process';
@Injectable()
export class ScrapperService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async scrapAllPrice() {
    const value = await this.cacheManager.get('allStocks');
    console.log(value);
    if (value) {
      return value;
    }
    const start = Date.now();
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
    await this.cacheManager.set('allStocks', data, 60);
    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
    return data;
  }

  async scrapTry() {
    // const value = await this.cacheManager.get('allStocks');
    // console.log(value);
    // if (value) {
    //   return value;
    // }
    // await this.cacheManager.set('allStocks', 'trydtaa', 60);

    return [
      {
        company: 'ACLBSL',
        ltp: '571.00',
        changes: '-0.7',
      },
      {
        company: 'ADBL',
        ltp: '237.40',
        changes: '1.45',
      },
      {
        company: 'ADLB',
        ltp: '1,397.00',
        changes: '2.72',
      },
      {
        company: 'AHL',
        ltp: '379.00',
        changes: '0.26',
      },
      {
        company: 'AHPC',
        ltp: '297.00',
        changes: '1.02',
      },
      {
        company: 'AIL',
        ltp: '415.00',
        changes: '1.72',
      },
      {
        company: 'AKJCL',
        ltp: '234.00',
        changes: '1.78',
      },
      {
        company: 'AKPL',
        ltp: '389.00',
        changes: '-0.26',
      },
      {
        company: 'ALBSL',
        ltp: '713.00',
        changes: '0.42',
      },
      {
        company: 'ALICL',
        ltp: '570.00',
        changes: '0.53',
      },
      {
        company: 'API',
        ltp: '248.00',
        changes: '0.81',
      },
    ];
  }
  JS;
  async runColabNotebook() {
    const colabNotebookPath =
      'https://colab.research.google.com/drive/1aCRHTjgzGZSnm4pgx24XiZfr7i_ib06u?usp=sharing';
    const pythonProcess = spawn('jupyter', [
      'notebook',
      'run',
      colabNotebookPath,
    ]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });

    return 'Colab notebook execution initiated.';
  }

  //   async scrapAlltryPrice() {
  //     const value = await this.cacheManager.get('allStocks');
  //     if (value) {
  //       return value;
  //     }

  //     const minimalArgs = ['--no-sandbox', '--disable-setuid-sandbox'];
  //     const browser = await puppeteer.launch({
  //       headless: true,
  //       args: minimalArgs,
  //       userDataDir: './cache',
  //     });
  //     const page = await browser.newPage();
  //     await page.goto('https://merolagani.com/StockQuote.aspx');

  //     // Extract data from first page
  //     const data = await this.extractDataFromPage(page);

  //     // Click button to load page 2
  //     const button2 = await page.$(
  //       'input[name="ctl00$ContentPlaceHolder1$PagerControl1$btnPaging"]',
  //     );
  //     await page.evaluate((btn) => btn && btn.click(), button2);
  //     await page.waitForNavigation();
  //     const page2Data = await this.extractDataFromPage(page);
  //     data.push(...page2Data);

  //     // Click button to load page 3
  //     const button3 = await page.$(
  //       'input[name="ctl00$ContentPlaceHolder1$PagerControl1$btnPaging"]',
  //     );
  //     await page.evaluate((btn) => btn && btn.click(), button3);
  //     await page.waitForNavigation();
  //     const page3Data = await this.extractDataFromPage(page);
  //     data.push(...page3Data);

  //     await browser.close();
  //     await this.cacheManager.set('allStocks', data, 60);
  //     return data;
  //   }

  //   private async extractDataFromPage(page: puppeteer.Page): Promise<any[]> {
  //     const rows = await page.$$('.table tr');
  //     const data = [];

  //     for (const row of rows) {
  //       const cells = await row.$$('td');
  //       if (cells.length > 0) {
  //         const dataRow = {
  //           company: await cells[1].evaluate((node) => node.innerText),
  //           ltp: await cells[2].evaluate((node) => node.innerText),
  //           changes: await cells[3].evaluate((node) => node.innerText),
  //         };
  //         data.push(dataRow);
  //       }
  //     }

  //     return data;
  //   }
}
