import { Divider, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { createChart } from 'lightweight-charts';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { IgrFinancialChart } from 'igniteui-react-charts';

const StockDetailsPage = () => {
    Chart.register(CategoryScale);

    const [stockName, setstockName] = useState({
        stockName: '',
        symbol: ''
    });
    const [stockPrice, setstockPrice] = useState([])
    const [date15Array, setdateArray] = useState([])
    const [stockRSI, setstockRSI] = useState(0)
    const create15daysDate = () => {
        function getDates(startDate, endDate): any {
            const dates = [];
            let currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                const monthsLIst = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const monthsText = monthsLIst[new Date(currentDate).getMonth()];
                // const months = new Date(currentDate).getMonth() + 1;
                const day = new Date(currentDate).getDate();
                dates.push(`${monthsText}/${day}`);
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return dates;
        }

        const today = new Date();
        const fifteenDaysAgo = new Date(today);
        fifteenDaysAgo.setDate(today.getDate() - 15);

        const dateArray = getDates(fifteenDaysAgo, today);
        console.log({ dateArray })
        setdateArray(dateArray);
        return dateArray;
    }

    const getStockName = async () => {
        const res = await axios.get(`http://localhost:3000/stocks/${id}`);
        console.log({ stock: res.data })
        const companyId = res.data.id;
        setstockName(res.data)
        const rsi = await axios.get(`http://localhost:3000/portfolio/rsi?symbol=${res.data.id}`);
        setstockRSI(rsi.data.rsi.toFixed(2))
        const companyPrices = await axios.get(`http://localhost:3000/portfolio/stock/history/${companyId}`);
        console.log(companyPrices.data)
        create15daysDate()
        // companyPrices.data.t = companyPrices.data.t.map((time: any) => {
        //     const date = new Date(time * 1000);
        //     return date.toLocaleDateString();
        // })

        setstockPrice(companyPrices.data);
    }
    useEffect(() => {
        getStockName()
    }, [])

    const datas = [
        584,
        587.8,
        599.9,
    ]
    let { id } = useParams();
    console.log(id)
    const data = {
        labels: date15Array,

        datasets: [
            {
                label: 'Stock Price',
                data: stockPrice,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    drawBorder: false,
                    color: 'rgb(75, 192, 192)',
                },
            },
        },

    };
    return (
        <Flex mt='100px' direction={'column'} >
            <Text fontSize={'2xl'} fontWeight={'bold'}> {stockName?.stockName} <Text as="span" fontWeight={'bold'}>({stockName?.symbol})</Text></Text>
            <Text>Stock Id: {id}</Text>
            <Flex justifyContent={'space-around'} w='100%'>

                <Flex width={'60vw'}    >
                    {/* <AdvancedRealTimeChart theme="dark" autosize width={'100px'}  ></AdvancedRealTimeChart> */}
                    <Line data={data} options={options} />
                </Flex>
                <Flex direction={'column'} gap='10px' p='20px' bg='teal.700' borderRadius={'20px'}>
                    <Text fontSize={'2xl'} fontWeight={'bold'}> {stockName?.stockName}</Text>
                    <Text fontWeight={'bold'}>Symbol: ({stockName?.symbol})</Text>
                    <Divider />
                    <Text>Current Price: {stockPrice[stockPrice.length - 1]}</Text>
                    <Text>Previous Close: {stockPrice[stockPrice.length - 2]}</Text>
                    <Text>Open: {stockPrice[0]}</Text>
                    <Text>High: {Math.max(...stockPrice)}</Text>
                    <Text>Low: {Math.min(...stockPrice)}</Text>
                    <Text>RSI: {stockRSI}</Text>
                    <Text backgroundColor={stockRSI > 70 ? 'Red' : stockRSI > 30 ? 'orange.600' : 'Red'} p={'10px'} borderRadius={'0 20px 20px 0'}>Risk: <Text as={'span'} fontWeight={'800'}>
                        {stockRSI > 70 ? 'High' : stockRSI > 30 ? 'Medium' : 'Low'}
                    </Text>
                    </Text>
                    <Text
                        backgroundColor={stockRSI > 70 ? 'Red' : stockRSI > 30 ? 'orange.600' : 'Red'} p={'10px'} borderRadius={'0 20px 20px 0'}>
                        Staus <Text as={'span'} fontWeight={'800'}
                        >
                            {stockRSI > 70 ? 'OverBought' : stockRSI > 30 ? 'Medium' : 'Oversold'}

                        </Text>
                    </Text>
                </Flex>
            </Flex>
        </Flex >
    )
}

export default StockDetailsPage
