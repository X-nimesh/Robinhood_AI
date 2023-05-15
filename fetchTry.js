const axios = require('axios');
const cheerio = require('cheerio');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 6000 });

async function scrapAllPrice() {

    const url = 'https://merolagani.com/StockQuote.aspx';
    const response = await axios.get(url);


    // Extract ViewState and EventValidation values
    const viewstate = $('#__VIEWSTATE').attr('value');
    const eventvalidation = $('#__EVENTVALIDATION').attr('value');

    // Scrap first page data
    const rows = $('.table tr');
    const data = [];
    rows.each((index, row) => {
        const cells = $(row).find('td');
        if (cells.length > 0) {
            const dataRow = {
                company: cells.eq(1).text().trim(),
                ltp: cells.eq(2).text().trim(),
                changes: cells.eq(3).text().trim(),
            };
            data.push(dataRow);
        }
    });

    // Click button to load page 2
    const payload = {
        __EVENTTARGET: 'ctl00$ContentPlaceHolder1$PagerControl1$btnPaging',
        __VIEWSTATE: viewstate,
        __EVENTVALIDATION: eventvalidation,
        'ctl00$ContentPlaceHolder1$PagerControl1$txtCurrentPage': '2',
        'ctl00$ContentPlaceHolder1$PagerControl1$hdnCurrentPage': '2',
    };
    const nextPageResponse = await axios.post(url, payload);
    const nextPage$ = cheerio.load(nextPageResponse.data);

    // Scrap page 2 data
    const nextPageRows = nextPage$('.table tr');
    nextPageRows.each((index, row) => {
        const cells = nextPage$(row).find('td');
        if (cells.length > 0) {
            const dataRow = {
                company: cells.eq(1).text().trim(),
                ltp: cells.eq(2).text().trim(),
                changes: cells.eq(3).text().trim(),
            };
            data.push(dataRow);
        }
    });

    // Click button to load page 3
    payload['ctl00$ContentPlaceHolder1$PagerControl1$txtCurrentPage'] = '3';
    payload['ctl00$ContentPlaceHolder1$PagerControl1$hdnCurrentPage'] = '3';
    const page3Response = await axios.post(url, payload);
    const page3$ = cheerio.load(page3Response.data);

    // Scrap page 3 data
    const page3Rows = page3$('.table tr');
    page3Rows.each((index, row) => {
        const cells = page3$(row).find('td');
        if (cells.length > 0) {
            const dataRow = {
                company: cells.eq(1).text().trim(),
                ltp: cells.eq(2).text().trim(),
                changes: cells.eq(3).text().trim(),
            };
            data.push(dataRow);
        }
    });

    cache.set('allStocks', data);
    return data;
}

scrapAllPrice()
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
