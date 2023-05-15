from bs4 import BeautifulSoup
import requests
from cachetools import TTLCache

cache = TTLCache(maxsize=1, ttl=6000)

def scrap_all_price():
    data = cache.get('allStocks')
    if data:
        return data

    url = 'https://merolagani.com/StockQuote.aspx'
    with requests.Session() as session:
        response = session.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract ViewState and EventValidation values
        viewstate = soup.select_one('#__VIEWSTATE')['value']
        eventvalidation = soup.select_one('#__EVENTVALIDATION')['value']

        # Scrap first page data
        rows = soup.select('.table tr')
        data = []
        for row in rows:
            cells = row.select('td')
            if cells:
                data_row = {
                    'company': cells[1].text.strip(),
                    'ltp': cells[2].text.strip(),
                    'changes': cells[3].text.strip(),
                }
                data.append(data_row)


        # Click button to load page 2
        payload = {
            '__EVENTTARGET': 'ctl00$ContentPlaceHolder1$PagerControl1$btnPaging',
            '__VIEWSTATE': viewstate,
            '__EVENTVALIDATION': eventvalidation,
            'ctl00$ContentPlaceHolder1$PagerControl1$txtCurrentPage': '2',
            'ctl00$ContentPlaceHolder1$PagerControl1$hdnCurrentPage': '2',
        }
        response = session.post(url, data=payload)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Scrap page 2 data
        rows = soup.select('.table tr')
        for row in rows:
            cells = row.select('td')
            if cells:
                data_row = {
                    'company': cells[1].text.strip(),
                    'ltp': cells[2].text.strip(),
                    'changes': cells[3].text.strip(),
                }
                data.append(data_row)


        # Click button to load page 3
        payload = {
            '__EVENTTARGET': 'ctl00$ContentPlaceHolder1$PagerControl1$btnPaging',
            '__VIEWSTATE': viewstate,
            '__EVENTVALIDATION': eventvalidation,
            'ctl00$ContentPlaceHolder1$PagerControl1$txtCurrentPage': '3',
            'ctl00$ContentPlaceHolder1$PagerControl1$hdnCurrentPage': '3',
        }
        response = session.post(url, data=payload)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Scrap page 3 data
        rows = soup.select('.table tr')
        for row in rows:
            cells = row.select('td')
            if cells:
                data_row = {
                    'company': cells[1].text.strip(),
                    'ltp': cells[2].text.strip(),
                    'changes': cells[3].text.strip(),
                }
                data.append(data_row)


        cache['allStocks'] = data
        return data

scrap_all_price()
