import { createSession, getAllSessions, getSession } from "@/services/sessionServices";
import { useEffect, useState } from "react";

const useSessions = ()=>{
    const [session, setSession] = useState({});
    const [allSessions, setAllSessions] = useState([]);
    const [sessionRefresh, setSessionRefresh] = useState(1);
        

    const generateSession = async ()=>{
        try{
            let response = await createSession();
            if(response.data.success){
                alert(response.data.message);
                localStorage.setItem("sessionId",response.data.session._id);
                setSessionRefresh(sessionRefresh+1);
            }
        }catch(err){
            console.log("Error creating session: ",err.message);
        }
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                let response = await getAllSessions();
                if(response.data.success){
                    setAllSessions(response.data.sessions);
                }
            }catch(err){
                console.log("Error fetching sessions: ",err.message);
                
            }
        }
        fetchData();
    },[sessionRefresh])

    useEffect(()=>{
        const fetchData = async ()=>{
            const sessionId = localStorage.getItem("sessionId");
            try{
                let response = await getSession(sessionId);
                if(response.data.success){
                    setSession(response.data.session);
                }
            }catch(err){
                console.log("Error fetching session: ",err.message);
                
            }
        }
        fetchData();
    },[])



    return ({session,allSessions, generateSession});
}

export default useSessions;
