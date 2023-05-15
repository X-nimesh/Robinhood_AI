
import { Button, Divider, Flex, Select, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
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
const Portfolio = () => {
    const userId = localStorage.getItem("uid");
    const [portfolios, setportfolios] = useState<portfolio[]>([]);
    const [stocks, setStocks] = useState<stock[]>([]);

    const { isOpen, onOpen, onClose } = useDisclosure()
    function editClick() {
        alert("Edit");
    }
    function deleteClick() {
        const delConfirm = confirm("Delete");
        alert(delConfirm);
    }
    const getportfolios = async () => {
        let portfolioList = await axios.get(`http://localhost:3000/portfolio/user/${userId}`);
        setportfolios(portfolioList.data);
        // console.log(portfolioList.data);
        // console.log(portfolioList.data[0].id);
        handlePortfolioChange(portfolioList.data[0].id)
    }
    useEffect(() => {
        getportfolios()
    }, [])
    const handlePortfolioChange = async (pid: string) => {
        // console.log(e.target.value);
        let stocks = await axios.get(`http://localhost:3000/portfolio/${pid}`);
        console.log(stocks.data);
        setStocks(stocks.data);
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
                        <Text fontSize={"xl"} fontWeight={"bold"}>Rs. 1,00,000
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
                    <AddStock />
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
                            <Th isNumeric>Market value</Th>
                            <Th isNumeric>Total Profit</Th>
                            <Th>Risk</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
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
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex >
    )
}

export default Portfolio
