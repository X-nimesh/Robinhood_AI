import { Flex, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
    const [userDetails, setuserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',

    })
    const getownDetails = async () => {
        console.log(localStorage.getItem('access_token'))
        const res = await axios.get(`http://localhost:3000/user/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        console.log(res.data)
        setuserDetails(res.data)
    }
    useEffect(() => {
        getownDetails();
    }, [])
    return (
        <Flex marginTop={'100px'} direction={'column'} alignItems={'center'} gap='20px'>
            <Text fontSize={'4xl'}>
                ProfilePage
            </Text>
            <Flex direction={'column'} alignItems={'center'} p='40px' gap='10px' background={'teal.600'} borderRadius={'20px'}>
                <Text>Name:{userDetails.name}</Text>
                <Text>e-mail: {userDetails.email}</Text>
                <Text>Phone:{userDetails.phone}</Text>
            </Flex>
        </Flex>
    )
}

export default ProfilePage
