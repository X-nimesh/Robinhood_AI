import { Flex, Text, Image, Box, Input, Button, InputRightElement, IconButton, InputGroup } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import axios from 'axios';
import * as dotenv from 'dotenv'
import * as Yup from 'yup';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
const Login = () => {
    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Must contain at least one uppercase letter, one number, and one special character'
            )
            .required('Required'),
    });
    const [errorFromServer, seterrorFromServer] = useState("");
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                const data = await axios.post("http://localhost:3000/auth/login", {
                    email: values.email,
                    password: values.password
                });
                console.log(data);
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
    return (
        <Flex w="100vw" background={"white"} height={"100vh"} marginLeft={"-40px"}>
            <Box w={"50%"} >
                <Image src="./cover.jpg" boxSize='100%' objectFit='cover' />
            </Box >
            <Flex flexDirection={"column"} alignItems="flex-start" w="50%" height={"100vh"} textColor="black" background={"white"}
                p={"150px 50px"}>
                <Text fontSize={'2xl'} textColor="black" fontFamily={"Roboto"}>
                    Login in to RobinHood AI
                </Text>
                <Box marginTop={"100px"} w={"400px"}>

                    <form onSubmit={formik.handleSubmit}>
                        <Flex flexDirection={'column'} gap="50px">
                            <Box h="60px">
                                <Text as={"label"} htmlFor="email" fontSize={"16px"}>Email</Text>
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    _active={
                                        { transform: "scale(1.07)", }
                                    }
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <Text textColor={"red"}>{formik.errors.email}</Text>
                                ) : null}
                            </Box>

                            <Box h="90px">
                                <Text as={"label"} htmlFor="password" fontSize={"16px"}>Password</Text>
                                <InputGroup>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        _active={
                                            { transform: "scale(1.07)", }
                                        }
                                    />
                                    <InputRightElement>
                                        <IconButton
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            icon={showPassword ? (<AiFillEye />) : (<AiFillEyeInvisible />)}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                {formik.touched.password && formik.errors.password ? (
                                    <Text textColor={"red"}>{formik.errors.password}</Text>
                                ) : null}
                            </Box>
                            <Button type="submit" variant={"Login"}>Submit</Button>
                            <Text>Don't have Account? <NavLink to="/signup">
                                <Text as="span" color={"blue"} textDecoration={"underline"} fontWeight={"semi-bold"}>Click Here</Text>
                            </NavLink>
                            </Text>

                        </Flex>
                    </form>
                </Box>

            </Flex>
        </Flex >
    )
}

export default Login
