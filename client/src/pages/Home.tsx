import { Flex, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'

const Home = () => {
    useEffect(() => {
        getPrices();
    }, [])
    const getPrices = async () => {
        const prices = await axios.get("http://localhost:3000/portfolio")
        console.log(prices);
    }
    return (
        <Flex >
            <Text fontSize={"2xl"}>Home</Text>
        </Flex>
    )
}

export default Home
