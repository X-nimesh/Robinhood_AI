import { Flex, Text } from '@chakra-ui/react';
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
        symbol: '',
    });
    const [stockPrice, setstockPrice] = useState({
        t: [],
        c: []
    })
    const getStockName = async () => {
        const res = await axios.get(`http://localhost:3000/stocks/${id}`);
        console.log(res.data)
        const companyId = res.data.id;
        setstockName(res.data)
        const companyPrices = await axios.get(`http://localhost:3000/stocks/company/${companyId}`);

        companyPrices.data.t = companyPrices.data.t.map((time: any) => {
            const date = new Date(time * 1000);
            return date.toLocaleDateString();
        })

        console.log(companyPrices.data)
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
        labels: stockPrice?.t,
        datasets: [
            {
                label: 'Stock Price',
                data: stockPrice?.c,
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
            <Flex width={'60vw'}    >
                {/* <AdvancedRealTimeChart theme="dark" autosize width={'100px'}  ></AdvancedRealTimeChart> */}
                <Line data={data} options={options} />
            </Flex>
        </Flex >
    )
}

export default StockDetailsPage
