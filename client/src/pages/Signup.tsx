import { Box, Button, Flex, IconButton, Image, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
const Signup = () => {
    let navigate = useNavigate();
    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        name: Yup.string().required('Required'),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Must contain at least one uppercase letter, one number, and one special character'
            )
            .required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
    });
    const [errorFromServer, seterrorFromServer] = useState("");
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                // console.log(values);
                const data = await axios.post("http://localhost:3000/user/signup", {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    role: "User"
                });
                console.log(data);
                toast({
                    title: "Account Created.",
                    description: "We've created your account for you.",
                })
                navigate("/login");
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
                p={"100px 100px"}>
                <Text fontSize={'2xl'} textColor="black" fontFamily={"Roboto"}>
                    Create Account in RobinHood AI
                </Text>
                <Box marginTop={"30px"} w={"400px"}>

                    <form onSubmit={formik.handleSubmit}>
                        <Flex flexDirection={'column'} gap="40px">
                            <Box h="60px">
                                <Text as={"label"} htmlFor="name" fontSize={"16px"}>Full Name:</Text>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    _active={
                                        { transform: "scale(1.07)", }
                                    }
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <Text textColor={"red"}>{formik.errors.name}</Text>
                                ) : null}
                            </Box>
                            <Box h="60px">
                                <Text as={"label"} htmlFor="email" fontSize={"16px"}>Email:</Text>
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
                                <Text as={"label"} htmlFor="password" fontSize={"16px"}>Password:</Text>
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
                            <Box h="90px">
                                <Text as={"label"} htmlFor="confirmPassword" fontSize={"16px"}>Confirm Password:</Text>
                                <InputGroup>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confirmPassword}
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
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <Text textColor={"red"}>{formik.errors.confirmPassword}</Text>
                                ) : null}
                            </Box>
                            <Button type="submit" variant={"Login"}>Submit</Button>
                            <Text>Already have Account? <NavLink to="/login">
                                <Text as="span" color={"blue"} textDecoration={"underline"} fontWeight={"semi-bold"}> Login</Text>
                            </NavLink>
                            </Text>

                        </Flex>
                    </form>
                </Box>

            </Flex>
        </Flex >
    )
}

export default Signup
