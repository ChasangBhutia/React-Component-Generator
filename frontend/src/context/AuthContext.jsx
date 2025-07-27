'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { registerUser, loginUser, getUser } from "@/services/authServices";
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const router = useRouter();
    const [user, setUser] = useState({});

    const signup = async (userData) => {
        try {
            let response = await registerUser(userData);
            if (response.data.success) {
                alert(response.data.message);
                router.push('/');
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const login = async (userData) => {
        try {
            let response = await loginUser(userData);
            if (response.data.success) {
                alert(response.data.message);
                router.push('/');
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                let response = await getUser();
                if(response.data.success){
                    setUser(response.data.user);
                }
            }catch(err){
                console.log("Error finding user: ",err.message);
                
            }
        };
        fetchData();
    },[])

    return (
        <AuthContext.Provider value={{login, signup, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);