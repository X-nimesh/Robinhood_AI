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
import Signup from './pages/Signup'
import Protected from './utils/Protected'
import Dashboard from './pages/Dashboard'
import NewsPage from './pages/NewsPage'
function App() {
    const [count, setCount] = useState(0)

    return (
        <BrowserRouter>
            <MenuBar />
            <Flex p="0px 70px" direction={'column'} maxWidth="100vw" bg="#0a091c" textColor={'white'} minHeight="100vh" overflow={"hidden"}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    {/* <Protected>
                        <Route path="/dashboard" element={<Home />} />
                    </Protected> */}
                    <Route path="dashboard" element={<Protected><Dashboard /></Protected>} />
                    <Route path="portfolio" element={<Protected><Portfolio /></Protected>} />
                    <Route path="news/:id" element={<Protected><NewsPage /></Protected>} />
                </Routes>
            </Flex>
        </BrowserRouter>


    )
}

export default App
