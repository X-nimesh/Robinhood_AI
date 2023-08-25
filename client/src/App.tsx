import { useContext, useEffect, useState } from 'react'
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
import { SharePriceContext } from './context/SharePriceContext'
import axios from 'axios'
import StockDetailsPage from './pages/StockDetailsPage'
import ProfilePage from './pages/ProfilePage'
function App() {
    const { sharePrice, updateSharePrice } = useContext(SharePriceContext);

    const [count, setCount] = useState(0)
    useEffect(() => {
        getPrices();
    }, [])
    const getPrices = async () => {
        const prices = await axios.get("http://localhost:3000/stocks/live")
        updateSharePrice(prices.data.result.stocks)
    }
    return (
        <BrowserRouter>
            <MenuBar />
            <Flex p="0px 70px" direction={'column'} maxWidth="100vw" bg="#0a091c"
                textColor={'white'} minHeight="100vh" overflow={"hidden"}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    {/* <Protected>
                        <Route path="/dashboard" element={<Home />} />
                    </Protected> */}
                    <Route path="dashboard" element={<Protected><Dashboard /></Protected>} />
                    <Route path='profile' element={<Protected><ProfilePage /></Protected>} />
                    <Route path="portfolio" element={<Protected><Portfolio /></Protected>} />
                    <Route path="news/:id" element={<Protected><NewsPage /></Protected>} />
                    <Route path="stocks/:id" element={<Protected><StockDetailsPage /></Protected>} />

                </Routes>
            </Flex>
        </BrowserRouter>


    )
}

export default App
