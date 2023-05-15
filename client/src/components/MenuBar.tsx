import { Button, Flex, Image, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
import { BiDownArrow } from 'react-icons/bi';
const MenuBar = () => {
    const navigate = useNavigate();
    let location = useLocation();
    const [userId, setuserId] = useState(null);
    const [name, setname] = useState('')
    const checkLogin = async (token: string) => {
        try {
            let res = await axios.get("http://localhost:3000/user/token",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setname(res?.data.name.split(" ")[0]);
            localStorage.setItem("uid", res?.data.userId);
            setuserId(res?.data.userId);
        } catch (error: any) {
            // console.log(error);
        }

    }
    checkLogin(localStorage.getItem("access_token")!);


    function Logout() {
        localStorage.removeItem("access_token");
        navigate('/')
        window.location.reload();
    }

    return (
        <>
            {location.pathname === '/login' || location.pathname === '/signup' ? null : (
                <Flex w="100%"
                    p="20px  70px"
                    justifyContent="space-between"
                    alignItems={"center"}
                    position={"fixed"}
                    top={0}
                    background={"#000c1ead"}
                    textColor={'white'}
                    backdropFilter={'blur(10px)'}
                >
                    <Image src='/RobinhoodFullLogo.png' w="200px" />
                    <Flex w="30vw" justifyContent={"space-evenly"} h="20px" minW="450px">
                        {userId ? (
                            <NavLink to='/dashboard'>
                                <Text variant={"menu"}>
                                    Dashboard
                                </Text>
                            </NavLink>) : (<NavLink to='/'>
                                <Text variant={"menu"}>
                                    Home
                                </Text>
                            </NavLink>)}
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
                            < >
                                {/* <Text fontWeight={"bold"} >
                                        {name}
                                    </Text> */}
                                <Menu>
                                    <MenuButton background={"transparent"} >
                                        <Flex gap="10px"
                                            transition={"ease-in-out 0.2s"}
                                            _hover={
                                                {
                                                    color: "#15ff55"
                                                }}>
                                            <CgProfile size={'25px'} />
                                            {name}
                                        </Flex>

                                    </MenuButton>
                                    <MenuList background={"transparent"} >
                                        <Flex flexDirection={"column"} paddingLeft={"30px"}>
                                            <NavLink to={'profile'} >Profile</NavLink>
                                            <Text cursor={"pointer"} onClick={Logout}>Log out</Text>
                                        </Flex>
                                    </MenuList>
                                </Menu>
                                {/* <Text >
                                        <CgProfile size={'25px'} />
                                    </Text> */}
                                {/* </Flex> */}
                            </>
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
                </Flex >)
            }
        </>

    )
}

export default MenuBar
