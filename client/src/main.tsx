import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import theme from './themes/theme'
import SharePriceProvider from './context/SharePriceContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <SharePriceProvider>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </SharePriceProvider>
    </React.StrictMode>,
)
