
import { Button, Divider, Flex, Select, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
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
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from 'react-icons/ai';
import AddStock from '../components/AddStock';
import axios from 'axios';
import { SharePriceContext } from '../context/SharePriceContext';
interface portfolio {
    id: number;
    desc: string;
    userId: number;
}
interface stock {
    stockName: string;
    portfolioID: number;
    id: number;
    purchase_price: number;
    created_at: Date;
    updated_at: Date;
}
interface Stock {
    id: number;
    stockID: number;
    portfolioID: number;
    purchase_price: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    purchase_date: string;
    stockName: string;
    symbol: string;
}

const Portfolio = () => {
    const { sharePrice, updateSharePrice, stockList, setstockList } = useContext(SharePriceContext);
    console.log(sharePrice)
    const userId = localStorage.getItem("uid");
    const [portfolios, setportfolios] = useState<portfolio[]>([]);
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [portfolioId, setportfolioId] = useState<Number>();
    const [portfolioDet, setportfolioDet] = useState({
        investmentVal: 0,
        portfolioValue: 0
    });

    const { isOpen, onOpen, onClose } = useDisclosure()

    function addStocks(stocks: Stock[]): Stock[] {
        const result: Stock[] = [];

        stocks.forEach(stock => {
            const existingStock = result.find(item => item.stockID === stock.stockID);

            if (existingStock) {
                existingStock.quantity += stock.quantity;
            } else {
                result.push(stock);
            }
        });

        return result;
    }
    function editClick() {
        alert("Edit");
    }
    function deleteClick() {
        const delConfirm = confirm("Delete");
        alert(delConfirm);
    }
    const getportfolios = async () => {
        let portfolioList = await axios.get(`http://localhost:3000/portfolio/user/${userId}`);
        // let trialData = await axios.get('https://nepsealpha.com/trading/1/search?limit=500');
        // console.log(trialData);
        setportfolios(portfolioList.data);
        console.log(portfolioList.data)
        handlePortfolioChange(portfolioList.data[0].id)
    }

    const handlePortfolioChange = async (pid: string) => {
        setportfolioId(parseInt(pid));
        let stocks = await axios.get(`http://localhost:3000/portfolio/${pid}`);
        console.log(stocks.data);
        let investmentVal = 0;
        stocks?.data?.forEach((stock: any) => {
            investmentVal += stock.purchase_price * stock.quantity;
        })
        setportfolioDet((port) => ({ ...port, investmentVal }));
        const combined = addStocks(stocks.data)
        setStocks(combined);
    }
    const numberWithCommas = (x: any) => {
        // const num = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const num = x.toLocaleString('en-IN')
        console.log(num);
        return num;
    }
    useEffect(() => {
        getportfolios()
    }, [])
    const findLtp = (ltp: string) => {

        const foundStock = sharePrice?.find((stock: any) => stock.stockSymbol === ltp);
        console.log(foundStock)
        return foundStock?.closingPrice;
    }
    return (
        <Flex flexDirection={"column"}>
            <Text fontSize={"5xl"} _hover={{ color: "blue.300" }} w="fit-content" transition={"ease-in-out .3s"}>Portfolio</Text>
            <Flex gap="20px" marginTop={"40px"}>
                <Flex flexDirection={"column"} p="40px" background={"green.700"} w="20%" minW="300px" borderRadius={"30px"} gap="20px">
                    <Text fontSize={"xl"}>Portfolio Value:</Text>
                    <Flex>
                        <Text fontSize={"l"}>Total:
                            <Text fontSize={"l"} as='span'> Rs. 2,00,000</Text>
                        </Text>
                    </Flex>
                </Flex>
                <Flex flexDirection={"column"} p="40px" background={"blue.700"} w="20%" minW="300px" borderRadius={"30px"} gap="20px">
                    <Text fontSize={"xl"}>Investment Value:</Text>
                    <Flex>
                        <Text fontSize={"xl"} fontWeight={"bold"}>Rs. {numberWithCommas(portfolioDet.investmentVal)}
                        </Text>
                    </Flex>
                </Flex>
                <Flex flexDirection={"column"} p="40px" background={"green"} w="20%" minW="300px" borderRadius={"30px"} gap="10px">
                    <Text fontSize={"xl"}>Investment Return:</Text>
                    <Text fontSize={"xl"} fontWeight={"bold"}>100%</Text>
                    <Text fontSize={"xl"} fontWeight={"bold"}>Rs. 1,00,000</Text>
                </Flex>
            </Flex>
            <Divider marginTop={"30px"} />
            <Flex justifyContent={"space-between"} marginY={"20px"}>
                <Flex gap="50px">
                    <Text fontSize={"2xl"}>Stocks</Text>
                    <Select variant={"flushed"}
                        title='portfolios'
                        id="portfolio"
                        onChange={(e) => handlePortfolioChange(e.target.value)}
                    >
                        {portfolios.map((port, key) => {
                            console.log(port)
                            return (
                                <option value={port.id} style={{ background: "black" }} key={key}>{port.desc}</option>
                            )
                        }
                        )}
                    </Select>
                </Flex>
                <Button colorScheme="blue" size="md" borderRadius={"30px"} onClick={onOpen}>Add Stock</Button>
                <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered motionPreset='slideInBottom' size={"5xl"} >
                    <ModalOverlay />
                    {/* <ModalContent></ModalContent> */}
                    <AddStock shareP={sharePrice} portfolioId={portfolioId} onClose={onClose} />
                </Modal>
            </Flex>
            <TableContainer>
                <Table variant='striped' colorScheme='whiteAlpha'>
                    <Thead>
                        <Tr>
                            <Th>Stock Name</Th>
                            <Th isNumeric>LTP</Th>
                            <Th isNumeric>Qty</Th>
                            <Th isNumeric>Purchased price</Th>
                            <Th isNumeric>Purchased on(Total):</Th>
                            <Th isNumeric>Market value</Th>
                            <Th isNumeric>Total Profit</Th>
                            <Th>Risk</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* <Tr>
                            <Td>NABIL</Td>
                            <Td isNumeric>890</Td>
                            <Td isNumeric>80</Td>
                            <Td isNumeric>800</Td>
                            <Td isNumeric>80,000</Td>
                            <Td isNumeric>10%( Rs.15,000 )</Td>
                            <Td >Medium</Td>
                            <Td >
                                <Flex gap="20px">
                                    <BiEditAlt onClick={editClick} />
                                    <AiOutlineDelete onClick={deleteClick} />
                                </Flex>
                            </Td>
                        </Tr> */}

                        {stocks?.map((data: any, index: number) => {
                            let ltp = findLtp(data.symbol);
                            const purchasedValue = data.purchase_price * data.quantity;
                            const marketVal = ltp * data.quantity;
                            let total = portfolioDet.portfolioValue + marketVal;
                            const profit = marketVal - purchasedValue;
                            console.log(profit)
                            const per: number = profit / purchasedValue;
                            return (
                                <Tr key={index}>
                                    <Tooltip label={data.stockName} aria-label='A tooltip'>
                                        <Td maxWidth={'200px'} overflow={'clip'} overflowWrap={'break-word'}><Text  >
                                            {data.symbol}
                                        </Text></Td>
                                    </Tooltip>
                                    <Td isNumeric>{ltp}</Td>
                                    <Td isNumeric>{data.quantity}</Td>
                                    <Td isNumeric>{data.purchase_price}</Td>
                                    <Td isNumeric>Rs. {numberWithCommas(purchasedValue)}</Td>
                                    <Td isNumeric>Rs.{numberWithCommas(marketVal)}</Td>
                                    <Td isNumeric color={per < 0 ? '#e53c3c' : '#00bf49'}>{`${per.toFixed(2)}`}% ({`Rs. ${numberWithCommas(profit)}`})</Td>
                                    <Td >Medium</Td>
                                    <Td >
                                        <Flex gap="20px">
                                            <BiEditAlt onClick={editClick} />
                                            <AiOutlineDelete onClick={deleteClick} />
                                        </Flex>
                                    </Td>
                                </Tr>
                            )
                        })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex >
    )
}

export default Portfolio
