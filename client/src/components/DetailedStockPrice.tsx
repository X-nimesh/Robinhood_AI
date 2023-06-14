import { Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { BsArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
interface props {
    sharePrice: shareDet[]
}
interface shareDet {
    stockSymbol: string,
    companyName: string,
    noOfTransactions: number,
    maxPrice: number,
    minPrice: number,
    openingPrice: number,
    closingPrice: number,
    amount: number,
    previousClosing: number,
    differenceRs: number,
    percentChange: number,
    volume: number,
    ltv: number,
    asOfDate: Date,
    asOfDateString: string,
    tradeDate: string,
    dataType: null

}
const DetailedStockPrice: React.FC<props> = (props) => {
    const { sharePrice } = props;
    return (
        <>
            <Text fontSize={'2xl'} fontWeight={'bold'}>Live Market</Text>
            <TableContainer mt={"10px"} minW="400px" height={"50vh"} border='1px' borderColor={'green'} overflowY={'scroll'}
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

                <Table variant='striped' colorScheme='whiteAlpha' size={'md'} border={'white'} borderWidth={'thick'}>
                    <Thead position={"sticky"} top={'0'}
                        border='2px'
                        borderColor={'green'}
                        background={"#000c1ead"}
                        backdropFilter={'blur(2px)'}>
                        <Tr >
                            <Th textColor={"white"}>Symbol</Th>
                            <Th isNumeric textColor={"white"}>ltp</Th>
                            <Th isNumeric textColor={"white"}>Change(Rs.)</Th>
                            <Th isNumeric textColor={"white"}>Change(%)</Th>
                            <Th isNumeric textColor={"white"}>Max Price</Th>
                            <Th isNumeric textColor={"white"}>Min Price</Th>
                            <Th isNumeric textColor={"white"}>Open Price</Th>
                            <Th isNumeric textColor={"white"}>Qty</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sharePrice && sharePrice.map((share: shareDet, key: any) => {
                            return (
                                <Tr key={key} border={'white'} borderWidth={'20px'}>
                                    <Td textColor={"white"}>{share.stockSymbol}</Td>
                                    <Td isNumeric textColor={"white"}>{share.closingPrice}</Td>
                                    <Td isNumeric textColor={"white"}>Rs.{share.differenceRs}</Td>
                                    <Td isNumeric textColor={"white"} color={share.percentChange > 0 ? "green.300" : "red.600"} >
                                        <Flex gap={"15px"} >
                                            {share.percentChange}
                                            {share.percentChange > 0 ? <BsFillArrowUpCircleFill color='green' /> : <BsArrowDownCircleFill color='red' />}
                                        </Flex>
                                    </Td>
                                    <Td isNumeric textColor={"white"}>Rs.{share.maxPrice}</Td>
                                    <Td isNumeric textColor={"white"}>Rs.{share.minPrice}</Td>
                                    <Td isNumeric textColor={"white"}>Rs.{share.openingPrice}</Td>
                                    <Td isNumeric textColor={"white"}>Rs.{share.volume}</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer >
        </>
    )
}

export default DetailedStockPrice
