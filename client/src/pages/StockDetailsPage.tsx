import { Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { createChart } from 'lightweight-charts';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const StockDetailsPage = () => {
    const [stockName, setstockName] = useState({
        stockName: '',
        symbol: '',
    });
    const getStockName = async () => {
        const res = await axios.get(`http://localhost:3000/stocks/${id}`);
        console.log(res.data)
        setstockName(res.data)
    }
    useEffect(() => {
        getStockName()
    }, [])


    let { id } = useParams();
    console.log(id)
    return (
        <Flex mt='100px' direction={'column'}>
            <Text fontSize={'xl'} >
                StockDetailsPages
            </Text>
            <Text>Id: {id}</Text>
            <Text>Stock Name: {stockName?.stockName}</Text>
            <Text>Symbol: {stockName?.symbol}</Text>
            <Flex className='chart'>
            </Flex>
        </Flex >
    )
}

export default StockDetailsPage
