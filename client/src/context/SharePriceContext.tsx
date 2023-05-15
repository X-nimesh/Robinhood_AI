import React, { createContext, useState } from 'react'

export const SharePriceContext = createContext<any>(null);

const SharePriceProvider: React.FC<any> = ({ children }) => {
    const [sharePrice, setsharePrice] = useState();
    const [news, setnews] = useState()
    const updateSharePrice = (value: any) => {
        setsharePrice(value);
    };
    const updateNews = (value: any) => {
        setnews(value);
    };
    return (
        <SharePriceContext.Provider value={{ sharePrice, updateSharePrice, news, updateNews }}>
            {children}
        </SharePriceContext.Provider>
    )
}

export default SharePriceProvider
