import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const MenuBar = () => {
    let location = useLocation();
    console.log(location);
    return (
        <>
            {location.pathname === '/login' ? null : (
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
                        <NavLink to='/login'>
                            <Text variant={"menu"} color="#15ff55">
                                Login
                            </Text>
                        </NavLink>
                        <NavLink to='/'>
                            <Text variant={"menu"} >
                                Sign-Up
                            </Text>
                        </NavLink>

                    </Flex>
                </Flex >)}
        </>

    )
}

export default MenuBar
