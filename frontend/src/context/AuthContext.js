'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { registerUser, loginUser, getUser, logoutUser } from "@/services/authServices";
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const router = useRouter();
    const [refreshUser, setRefreshUser] = useState(1);
    const [user, setUser] = useState({});

    const signup = async (userData) => {
        try {
            let response = await registerUser(userData);
            if (response.data.success) {
                console.log(response.data.token);
                
                setRefreshUser(refreshUser+1);
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
                console.log(response.data.token);
                setRefreshUser(refreshUser+1);
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
    },[refreshUser])

    const logout = async ()=>{
        try{
            let response = await logoutUser();
            if(response.data.success){
                alert(response.data.message);
                router.push('/login');
            }
        }catch(err){
            console.log("Error logging out: ",err.message);
            
        }
    }

    return (
        <AuthContext.Provider value={{login, signup, user, refreshUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);