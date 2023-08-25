import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    Select,
} from '@chakra-ui/react'
import { Flex, Text, Image, ModalContent, Box, Input, Button, InputRightElement, IconButton, InputGroup } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import * as Yup from 'yup';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { SharePriceContext } from '../context/SharePriceContext';

const AddStock = (props: any) => {
    const { sharePrice, updateSharePrice, stockList, setstockList } = useContext(SharePriceContext);

    const { shareP, portfolioId, onClose } = props;
    const schema = Yup.object().shape({
        transitionType: Yup.mixed().oneOf(['buy', 'sell'], 'Invalid transition type').required('Required'),
        // stockSym: Yup.string().required('Required'),
        quantity: Yup.number().min(0, 'higher than 0').required('Required'),
        purchaseDate: Yup.date().required('Required'),
        type: Yup.mixed().oneOf(['IPO', 'Secondary', 'FPO', 'Bonus', 'Right'], 'Invalid type').required('Required'),
        purchasePrice: Yup.number().min(0, 'higher than 0').required('Required'),
    });
    const [errorFromServer, seterrorFromServer] = useState("");
    const toast = useToast();
    const getStockList = async () => {
        let allStockLists = await axios.get('http://localhost:3000/stocks');
        setstockList(allStockLists);
    }

    useEffect(() => {
        getStockList()
    }, [])
    // fetch stocks
    const [stocks, setStocks] = useState([]);
    const getStocks = async () => {
        let stockList = await axios.get(`http://localhost:3000/stocks`);
        setStocks(stockList.data);
    }

    useEffect(() => {
        getStocks();
    }, [])
    const [symstock, setsymstock] = useState('');
    const [searchSym, setsearchSym] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            transitionType: '',
            stockSymId: 0,
            quantity: '',
            purchaseDate: '',
            type: '',
            purchasePrice: '',
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                console.log(values)
                console.log("submit");
                const data = await axios.post(`http://localhost:3000/portfolio/stock/add/${portfolioId}`, values);
                console.log(data);
                // reload window using react router dom
                window.location.reload();
                onClose();
                // localStorage.setItem('access_token', data.data.access_token);
                // toast({
                //     title: "Stock added successfully.",
                //     description: "We've added the stock.",
                // })

            } catch (error: any) {
                console.log(error);
                seterrorFromServer(error.response.data.message);
                toast({
                    title: "An error occurred.",
                    description: error.response.data.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
        },
    });
    const handelsearch = (e: any) => {
        setsymstock(e.target.value);
    }
    useEffect(() => {
        const getData = setTimeout(async () => {

            const searchString = symstock?.toLowerCase();

            const filteredCharacters = stocks?.filter((price: any) => {
                console.log(price)
                return (
                    price.symbol.toLowerCase().includes(searchString)
                );
            });

            //* to get stock name up in debentures case
            // console.log(filteredCharacters.reverse())
            console.log(filteredCharacters)
            setsearchSym(filteredCharacters);
        }, 1000)

        return () => clearTimeout(getData)
    }, [symstock])
    const handleClickoption = (stockName: string, stockId: number) => {
        formik.values.stockSymId = stockId;
        setsymstock(stockName)
        setsearchSym([]);
        console.log(stockName, stockId)
    }
    return (
        <ModalContent background={"#000c1e"} color={"white"} height={"70vh"} borderRadius={"20px"} >
            <ModalHeader>Add New Stock</ModalHeader>
            <ModalCloseButton size={"lg"} />
            <ModalBody >
                <form onSubmit={formik.handleSubmit}>
                    <Flex flexDirection={'column'} gap="50px">
                        <Flex w="100%" justifyContent={"space-between"} flexWrap={'wrap'} rowGap={'30px'}>

                            <Box h="60px" w='10%'>
                                <Text as={"label"} htmlFor="transitionType" fontSize={"16px"}>Quantity</Text>
                                <Select variant={"flushed"}
                                    id="transitionType"
                                    name="transitionType"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.transitionType}
                                    placeholder='Select'

                                // defaultValue={}
                                >
                                    <option value='buy' style={{ background: "black" }}>buy</option>
                                    <option value='sell' style={{ background: "black" }}>sell</option>
                                </Select>
                                {formik.touched.transitionType && formik.errors.transitionType ? (
                                    <Text textColor={"red"}>{formik.errors.transitionType}</Text>
                                ) : null}
                            </Box>
                            <Box
                                h="60px"
                            // onBlur={() => {
                            //     setsearchSym([]);
                            //     console.log("changes focus")
                            // }}
                            >
                                <Text as={"label"} htmlFor="stockSym" fontSize={"16px"}>Stock Name(symbol)</Text>
                                <Input
                                    id="stockSym"
                                    name="stockSym"
                                    type="text"
                                    onChange={(e) => handelsearch(e)}
                                    // onBlur={formik.handleBlur}
                                    // onBlur={() => { formik.handleBlur; setsearchSym([]); }}
                                    value={symstock}
                                    // value={formik.values.stockSym}
                                    _active={
                                        { transform: "scale(1.07)", }
                                    }
                                />
                                <Flex direction={'column'} background={"white"} color={"black"}>
                                    <Flex direction={'column'}>
                                        {/* {searchSym?.map((sym: any, index) => {
                                            console.log(sym)
                                            if (index > 2) {
                                                return;
                                            }
                                            return (

                                                <Text id={sym.symbol}>{sym.company}</Text>
                                            )
                                        })} */}
                                        {/* {searchSym?.length ? (<Text>hey</Text>) : (<Text>no data</Text>)} */}
                                        {searchSym?.slice(0, 3).map((syms: any, index: number) => {
                                            return (
                                                <Box key={index} onClick={() => {
                                                    handleClickoption(syms.stockName, syms.id)
                                                    // setsymstock(syms.stockName)
                                                }}>
                                                    <Text id={syms.symbol}>{syms.stockName}</Text>
                                                </Box>
                                            )
                                        })}
                                    </Flex>
                                </Flex>

                            </Box>
                            <Box h="60px">
                                <Text as={"label"} htmlFor="quantity" fontSize={"16px"}>Quantity</Text>
                                <Input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.quantity}
                                    _active={
                                        { transform: "scale(1.07)", }
                                    }
                                />
                                {formik.touched.quantity && formik.errors.quantity ? (
                                    <Text textColor={"red"}>{formik.errors.quantity}</Text>
                                ) : null}
                            </Box>
                            <Box h="60px">
                                <Text as={"label"} htmlFor="purchaseDate" fontSize={"16px"}>Purchase Date</Text>
                                <Input
                                    id="purchaseDate"
                                    name="purchaseDate"
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.purchaseDate}
                                    _active={
                                        { transform: "scale(1.07)", }
                                    }
                                />
                                {formik.touched.purchaseDate && formik.errors.purchaseDate ? (
                                    <Text textColor={"red"}>{formik.errors.purchaseDate}</Text>
                                ) : null}
                            </Box>
                            <Box h="60px" w='20%'>
                                <Text as={"label"} htmlFor="type" fontSize={"16px"}>Type</Text>
                                <Select variant={"flushed"}
                                    id="type"
                                    name="type"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.type}
                                    placeholder='Select'
                                >
                                    <option value='IPO' style={{ background: "black" }} >IPO</option>
                                    <option value='Secondary' style={{ background: "black" }}>Secondary</option>
                                    <option value='FPO' style={{ background: "black" }}>FPO</option>
                                    <option value='Bonus' style={{ background: "black" }}>Bonus</option>
                                    <option value='Right' style={{ background: "black" }}>Right</option>
                                </Select>
                                {formik.touched.type && formik.errors.type ? (
                                    <Text textColor={"red"}>{formik.errors.type}</Text>
                                ) : null}
                            </Box>
                            <Box h="60px">
                                <Text as={"label"} htmlFor="purchasePrice" fontSize={"16px"}>Purchase Price</Text>
                                <Input
                                    id="purchasePrice"
                                    name="purchasePrice"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.purchasePrice}
                                    _active={
                                        { transform: "scale(1.07)", }
                                    }
                                />
                                {formik.touched.purchasePrice && formik.errors.purchasePrice ? (
                                    <Text textColor={"red"}>{formik.errors.purchasePrice}</Text>
                                ) : null}
                            </Box>
                        </Flex>

                        <Button type="submit" variant={"Login"}>Add stock</Button>
                    </Flex>
                </form>
            </ModalBody >

        </ModalContent >
    )
}

export default AddStock
