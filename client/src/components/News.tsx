import { Flex, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { SharePriceContext } from '../context/SharePriceContext';
import { Link } from 'react-router-dom';

const News = () => {
    const { news, updateNews } = useContext(SharePriceContext);

    const getNews = async () => {
        try {
            const response = await axios.request({
                method: 'GET',
                url: 'https://newsapi.org/v2/everything',
                params: {
                    q: 'nepal',
                    'apiKey': "365c3cffc4d747b3aec720da5da1d230"
                },

            });
            updateNews(response.data.articles)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getNews()
    }, [])
    let count = -1;
    return (
        <Flex direction={"column"} >
            <Text fontSize={"5xl"}>
                Recent News
            </Text>
            <Flex direction={"column"} gap={"20px"} marginTop={"20px"}>
                {
                    news && news?.map((newss: any, key: any) => {
                        count++;
                        return (
                            <Flex key={key} w="100%" backgroundColor={"gray.900"} gap="20px" >
                                <Flex direction={"column"} padding={"20px 50px"} gap="20px">
                                    <Link to={`/news/${count}`}>
                                        <Text fontSize={"xl"} fontWeight={"bold"} color={"blue.300"}>{newss.title}</Text>
                                    </Link>
                                    <Text fontSize={"sm"}>{newss.description}</Text>
                                </Flex>
                                <Image src={newss.urlToImage} alt="Cover" w="30vw" h='100%' marginTop={"10px"} />
                            </Flex>
                        )
                    })
                }

            </Flex >
        </Flex >
    )
}

export default News
