import { getChats, saveChat } from "@/services/chatServices";
import { useEffect, useState } from "react";
import { useSessionContext } from "@/context/SessionContext";


const useChats = ()=>{

    const {setSessionRefresh} = useSessionContext()

    const [chats, setChats] = useState([]);
    const [chatRefresh, setChatRefresh] = useState(1);
    
    const createChat = async (chatData)=>{
        try{
            let response = await saveChat(chatData);
            if(response.data.success){
                setChatRefresh(chatRefresh+1);
                setTimeout(()=>{
                    setSessionRefresh(prev=>{
                        return prev+1
                    })
                },5000)
            }
        }catch(err){
            console.log("Error saving chat: ", err.message);
        }
    }

    useEffect(()=>{
        const fetchChat = async ()=>{
            const sessionId = localStorage.getItem("sessionId");
            try{
                let response = await getChats(sessionId);
                if(response.data.success){
                    setChats(response.data.chats);
                }
            }catch(err){
                console.log("Error fetching chats: ", err.message);
                
            }
        };
        fetchChat();
    },[chatRefresh]);
    
    return({createChat, chats});
}

export default useChats;