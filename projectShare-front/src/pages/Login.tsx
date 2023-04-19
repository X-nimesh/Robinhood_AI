import { Flex, Text, Image, Box, Input, Button } from '@chakra-ui/react'
import React from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <Flex w="100vw" background={"white"} height={"100vh"} >
            <Box w={"50%"} >
                <Image src="./sharemarket.png" boxSize='100%' objectFit='cover' />
            </Box >
            <Flex flexDirection={"column"} alignItems="flex-start" w="50%" height={"100vh"} textColor="black" background={"white"}
                p={"150px 50px"}>
                <Text fontSize={'2xl'} textColor="black" fontFamily={"Roboto"}>
                    Login in to RobinHood AI
                </Text>
                <Box marginTop={"100px"}>

                    <form onSubmit={formik.handleSubmit}>
                        <Flex flexDirection={'column'} gap="50px">
                            <Box>
                                <Text as={"label"} htmlFor="email" fontSize={"16px"}>Email</Text>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                            </Box>
                            <Box>
                                <Text as={"label"} htmlFor="password" fontSize={"16px"}>Password</Text>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                            </Box>

                            <Button type="submit" variant={"Login"}>Submit</Button>
                        </Flex>
                    </form>
                </Box>

            </Flex>
        </Flex >
    )
}

export default Login
