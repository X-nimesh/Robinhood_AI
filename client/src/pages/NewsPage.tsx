import { Flex, Image, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { SharePriceContext } from '../context/SharePriceContext';
import { Link, useParams } from 'react-router-dom';

const NewsPage = () => {
    const newsId = useParams().id || 0;
    console.log(newsId);
    const { news, updateNews } = useContext(SharePriceContext);
    if (!news) return (
        <Flex direction={"column"} marginTop={"100px"}>
            <Text color={"red"}>Error occured</Text>
            <Link to="/dashboard">
                <Text color={"red"} textDecor={"underline"}>Go back to dahsboard</Text>
            </Link>
        </Flex>
    )
    console.log("asd");
    return (
        <Flex direction={"column"} marginTop={"20px"}>
            <Text fontSize={"2xl"} fontWeight={"bold"} color={"blue.300"}>{news[newsId]?.title}</Text>
            <Flex marginTop={"20px"} gap="30px  ">
                <Image src={news[newsId]?.urlToImage} alt="Cover" w="40vw" h='100%' marginTop={"10px"} />
                <Text fontSize={"md"} marginTop={"20px"}>{news[newsId]?.description}</Text>
            </Flex >
        </Flex >
    )
}

export default NewsPage
