import { Flex, Image, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
const MenuBar = () => {
    let location = useLocation();
    const [userId, setuserId] = useState(null);
    const checkLogin = async (token: string) => {
        let res = await axios.get("http://localhost:3000/user/token",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        setuserId(res.data.userId);
    }
    useEffect(() => {
        console.log(localStorage.getItem("access_token"));
        if (localStorage.getItem("access_token")) {
            checkLogin(localStorage.getItem("access_token")!);
        }

    }, [])
    console.log("userID: " + userId);
    // console.log(location.pathname);
    // console.log(location);
    return (
        <>
            {location.pathname === '/login' || location.pathname === '/signup' ? null : (
                <Flex w="100%" p="20px 0px"
                    justifyContent="space-between"
                    alignItems={"center"}

                >
                    <Image src='./robinhood.png' w="40px" />
                    <Flex w="30vw" justifyContent={"space-evenly"} h="20px">
                        <NavLink to='/'>
                            <Text variant={"menu"}>
                                Home
                            </Text>
                        </NavLink>
                        <NavLink to='/about'>
                            <Text variant={"menu"}>
                                About
                            </Text>
                        </NavLink>
                        <NavLink to='/portfolio'>
                            <Text variant={"menu"}>
                                Portfolio
                            </Text>
                        </NavLink>
                        {userId ? (
                            <NavLink to='/profile'>
                                <Text _hover={
                                    {
                                        color: "#15ff55"
                                    }
                                }>
                                    <CgProfile size={'25px'} />
                                </Text>
                            </NavLink>
                        ) : (
                            <>
                                <NavLink to='/login'>
                                    <Text variant={"menu"} color="#15ff55">
                                        Login
                                    </Text>
                                </NavLink>
                                <NavLink to='/signup'>
                                    <Text variant={"menu"} >
                                        Sign-Up
                                    </Text>
                                </NavLink>
                            </>)}

                    </Flex>
                </Flex >)}
        </>

    )
}

export default MenuBar
