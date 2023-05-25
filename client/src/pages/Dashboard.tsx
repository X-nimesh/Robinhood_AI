import React, { useContext, useEffect } from 'react'
import { SharePriceContext } from '../context/SharePriceContext';
import axios from 'axios';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { BsArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs';
import News from '../components/News';
const Dashboard = () => {
    const { sharePrice, updateSharePrice } = useContext(SharePriceContext);
    useEffect(() => {
        getPrices();
    }, [])
    const getPrices = async () => {
        const prices = await axios.get("http://localhost:3000/scrap")
        updateSharePrice(prices.data)
    }
    return (
        <Flex flexDirection={'column'} gap="20px" marginTop={"80px"} >
            {/* table to show sshare marketi priice */}
            <Flex justifyContent={"flex-start"} gap={"100px"}>
                <Image src="/coverPhoto.svg" alt="COver" w="50vw" h='100%' marginTop={"200px"} />
                <TableContainer mt={"10px"} w='55vw' minW="400px" height={"100vh"} overflowY={'scroll'}
                    sx={{
                        '&::-webkit-scrollbar': {
                            width: '8px',
                            borderRadius: '8px',
                            backgroundColor: `#000c1ead`,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: '8px',

                            backgroundColor: `#00CB00`,
                        },
                    }}>
                    <Table variant='striped' colorScheme='whiteAlpha' size={'md'}  >
                        <Thead position={"sticky"} top={'0'}
                            background={"#000c1ead"}
                            backdropFilter={'blur(2px)'}>
                            <Tr >
                                <Th textColor={"white"}>Company</Th>
                                <Th isNumeric textColor={"white"}>ltp</Th>
                                <Th isNumeric textColor={"white"}>Changes</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {sharePrice?.length === 0 && <Spinner />
                            }

                            {sharePrice && sharePrice.map((share: any, key: any) => {
                                return (
                                    <Tr key={key}>
                                        <Td textColor={"white"}>{share.company}</Td>
                                        <Td isNumeric textColor={"white"}>{share.ltp}</Td>
                                        <Td isNumeric textColor={"white"} color={share.changes > 0 ? "green.300" : "red.600"}>
                                            <Flex gap={"15px"}>
                                                {share.changes}
                                                {share.changes > 0 ? <BsFillArrowUpCircleFill /> : <BsArrowDownCircleFill />}
                                            </Flex>
                                        </Td>
                                    </Tr>
                                )
                            })}

                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
            <News />
        </Flex >
    )
}

export default Dashboard
