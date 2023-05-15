import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { useCheckLogin } from "./useCheckLogin";
import axios from "axios";

const Protected = (props: any) => {
    const [userDet, setuserDet] = useState<any>("a");
    const useCheckLogin = async () => {
        const token = localStorage.getItem("access_token");
        try {
            let res = await axios.get("http://localhost:3000/user/token", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setuserDet(res?.data);
        } catch (error: any) {
            // console.log(error);
            setuserDet(null);
        }
    };
    useEffect(() => {
        useCheckLogin()
    }, [])

    const { children } = props;
    return (
        userDet ? <>{children}</> : <Navigate to='/' />

    )
}

export default Protected
