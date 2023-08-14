
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
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { sharePrice, updateSharePrice, stockList, setstockList } = useContext(SharePriceContext);
    const userId = localStorage.getItem("uid");
    const [portfolios, setportfolios] = useState<portfolio[]>([]);
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [portfolioId, setportfolioId] = useState<Number>();
    const [portfolioDet, setportfolioDet] = useState({
        investmentVal: 0,
        portfolioValue: 0
    });
    const [portfolioValue, setportfolioValue] = useState(0);

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
    function deleteClick(stockId: string) {
        const delConfirm = confirm("Delete");
        if (delConfirm) {
            axios.delete(`http://localhost:3000/portfolio/stock/${stockId}`)
                .then((res) => {
                    console.log(res);
                    getportfolios();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    const getportfolios = async () => {
        let portfolioList = await axios.get(`http://localhost:3000/portfolio/user/${userId}`);
        // let trialData = await axios.get('https://nepsealpha.com/trading/1/search?limit=500');
        setportfolios(portfolioList.data);
        handlePortfolioChange(portfolioList.data[0].id)
    }
    const findLtp = (ltp: string) => {
        const foundStock = sharePrice?.find((stock: any) => stock.stockSymbol === ltp);
        return foundStock?.closingPrice;
    }
    const handlePortfolioChange = async (pid: string) => {
        setportfolioId(parseInt(pid));
        let stocks = await axios.get(`http://localhost:3000/portfolio/${pid}`);
        console.log(stocks.data)
        let investmentVal = 0;
        stocks?.data?.forEach((stock: any) => {
            investmentVal += stock.purchase_price * stock.quantity;
        })
        setportfolioDet((port) => ({ ...port, investmentVal }));
        const combined = addStocks(stocks.data)
        console.log(combined)
        let stockWithRsi = await Promise.all(combined.map(async (stock: any) => {
            console.log(stock.stockID)
            const rsi = await axios.get(`http://localhost:3000/portfolio/rsi?symbol=${stock.stockID}`);
            console.log(rsi)
            return {
                ...stock, rsi: rsi.data.rsi,
                stockName: rsi.data.stockName,
                symbol: rsi.data.symbol,
                stockId: rsi.data.stockId
            }
        }))
        let stockval = 0;
        await stockWithRsi.map((data: any) => {
            let ltp = findLtp(data.symbol);
            const marketVal = ltp * data.quantity;
            stockval += marketVal;
            console.log({ stockval, ltp, data })
        })

        setportfolioValue(stockval);
        console.log(stockWithRsi)
        setStocks(stockWithRsi);
    }
    const numberWithCommas = (x: any) => {
        // const num = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const num = x.toLocaleString('en-IN')
        return num;
    }
    useEffect(() => {
        getportfolios()
    }, [])

    return (
        <Flex flexDirection={"column"} marginTop={'70px'}>
            <Flex gap="20px" marginTop={"40px"}>
                <Flex flexDirection={"column"} p="40px" background={"green.700"} w="20%" minW="300px" borderRadius={"30px"} gap="20px">
                    <Text fontSize={"xl"}>Portfolio Value:</Text>
                    <Flex>
                        <Text fontSize={"l"}>Total:
                            <Text fontSize={"l"} as='span'> Rs. {portfolioValue}</Text>
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
            <Flex justifyContent={"space-between"} marginY={"20px"} paddingLeft={'25px'}>
                <Text>
                    <Text fontSize={"4xl"} fontWeight={'bold'}>Stocks</Text>
                </Text>
                {/* <Flex gap="50px">
                    <Text fontSize={"2xl"}>Stocks</Text>
                    <Select variant={"flushed"}
                        title='portfolios'
                        id="portfolio"
                        onChange={(e) => handlePortfolioChange(e.target.value)}
                    >
                        {portfolios.map((port, key) => {
                            return (
                                <option value={port.id} style={{ background: "black" }} key={key}>{port.desc}</option>
                            )
                        }
                        )}
                    </Select>
                </Flex> */}
                <Button colorScheme="blue" size="md" borderRadius={"30px"} onClick={onOpen}>Add Stock</Button>
                <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered motionPreset='slideInBottom' size={"5xl"} >
                    <ModalOverlay />
                    {/* <ModalContent></ModalContent> */}
                    <AddStock shareP={sharePrice} portfolioId={portfolioId} onClose={onClose} />
                </Modal>
            </Flex>
            <TableContainer>
                <Table variant='simple' colorScheme='whiteAlpha'>
                    <Thead>
                        <Tr>
                            <Th>Stock Name</Th>
                            <Th isNumeric>LTP</Th>
                            <Th isNumeric>Qty</Th>
                            <Th>Risk(RSI)</Th>
                            <Th isNumeric>Purchased price</Th>
                            <Th isNumeric>Purchased on(Total):</Th>
                            <Th isNumeric>Market value</Th>
                            <Th isNumeric>Total Profit</Th>
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
                            console.log(data)
                            let ltp = findLtp(data.symbol);
                            const purchasedValue = data.purchase_price * data.quantity;
                            const marketVal = ltp * data.quantity;
                            let total = portfolioDet.portfolioValue + marketVal;
                            const profit = marketVal - purchasedValue;
                            const per: number = profit / purchasedValue;
                            let risk = "Normal";
                            let color = "orange";
                            if (data.rsi > 70) {
                                risk = "High"
                                color = "red"
                            }
                            else if (data.rsi < 30) {
                                risk = "Low"
                                color = "green"
                            }
                            console.log(color)
                            // console.log(data)
                            return (
                                <Tr key={index}>
                                    <Tooltip label={data.stockName} aria-label='A tooltip' >
                                        <Td maxWidth={'200px'} overflow={'clip'} overflowWrap={'break-word'}
                                            onClick={() => navigate(`/stocks/${data.id}`)}>
                                            <Text>
                                                {data.symbol}
                                            </Text>
                                        </Td>
                                    </Tooltip>
                                    <Td isNumeric>{ltp}</Td>
                                    <Td isNumeric>{data.quantity}</Td>
                                    <Td backgroundColor={color}>
                                        <Text fontWeight={'900'}>
                                            {risk}({data?.rsi?.toFixed(2)})
                                        </Text>
                                    </Td>
                                    <Td isNumeric>{data.purchase_price}</Td>
                                    <Td isNumeric>Rs. {numberWithCommas(purchasedValue)}</Td>
                                    <Td isNumeric>Rs.{numberWithCommas(marketVal)}</Td>
                                    <Td isNumeric color={per < 0 ? '#e53c3c' : '#00bf49'} >
                                        {`${per.toFixed(2)}`}% ({`Rs. ${numberWithCommas(profit)}`})
                                    </Td>
                                    <Td >
                                        <Flex gap="20px">
                                            {/* <BiEditAlt onClick={editClick} color='#00bf49' /> */}
                                            <AiOutlineDelete onClick={() => deleteClick(data.stockId)} color="red" />
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
