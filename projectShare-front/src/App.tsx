import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Flex, Text } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Login from './pages/Login'
function App() {
    const [count, setCount] = useState(0)

    return (
        <Flex p="0px 40px" direction={'column'} maxWidth="99vw" bg="#0a091c" textColor={'white'} minHeight="100vh" overflow={"hidden"}>
            <BrowserRouter>
                <MenuBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </Flex>


    )
}

export default App
