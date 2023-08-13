import React, { useContext, useEffect, useState } from 'react'
import { SharePriceContext } from '../context/SharePriceContext';
import axios from 'axios';
import { Box, Center, Divider, Flex, Image, Text } from '@chakra-ui/react';
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
import DetailedStockPrice from '../components/DetailedStockPrice';
const Dashboard = () => {
    const { sharePrice, updateSharePrice } = useContext(SharePriceContext);
    const [spinner, setspinner] = useState(true);
    // const getSharePrice = async () => {
    //     const url = `https://nepsealpha.com/trading/0/history?symbol=HIDCL&resolution=1D&from=1688926500&to=1691599286&pass=ok&force=0.9015580012767925&currencyCode=NRS`;
    //     console.log(url);
    //     const data = await axios.get(url);
    //     console.log(data);
    // }
    // getSharePrice();
    return (
        <Flex flexDirection={'column'} gap="20px" marginTop={"80px"} >
            {/* table to show sshare marketi priice */}
            <Flex justifyContent={"flex-start"} gap={"100px"}>
                <Image src="/coverPhoto.svg" alt="COver" w="50vw" h='100%' marginTop={"200px"} />
                <TableContainer mt={"30px"} w='55vw' minW="400px" height={"80vh"} overflowY={'scroll'}
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


                            {sharePrice && sharePrice.map((share: any, key: any) => {
                                return (
                                    <Tr key={key}>
                                        <Td textColor={"white"}>{share.stockSymbol}</Td>
                                        <Td isNumeric textColor={"white"}>{share.closingPrice}</Td>
                                        <Td isNumeric textColor={"white"} color={share.percentChange > 0 ? "green.300" : "red.600"}>
                                            <Flex gap={"15px"} justifyContent={'flex-end'}>
                                                {share.percentChange}
                                                {share.percentChange > 0 ? <BsFillArrowUpCircleFill /> : <BsArrowDownCircleFill />}
                                            </Flex>
                                        </Td>
                                    </Tr>
                                )
                            })}

                        </Tbody>
                    </Table>
                    <Flex mt="50px" w='100%' alignItems={'center'} paddingX={'20px'} justifyContent={'center'}>
                        {spinner && <Spinner size={'lg'} />}
                    </Flex>
                </TableContainer>
            </Flex>
            <Divider h='10px' color={'green'} />
            <DetailedStockPrice sharePrice={sharePrice} />
            <News />
        </Flex >
    )
}

export default Dashboard
