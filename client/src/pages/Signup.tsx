import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
const Signup = () => {

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
            confirmPassword: '',
            name: '',
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
                    Create ACcount in RobinHood AI
                </Text>
                <Box marginTop={"100px"} w={"400px"}>

                    <form onSubmit={formik.handleSubmit}>

                    </form>
                </Box>

            </Flex>
        </Flex >
    )
}

export default Signup
