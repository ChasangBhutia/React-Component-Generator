import api from "./api";

export const saveChat = (chatData)=>{
    return api.post('/chats', chatData);
}

export const getChats = (sessionId)=>{
    return api.get(`/chats/${sessionId}`);
}