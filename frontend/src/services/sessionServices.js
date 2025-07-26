import api from "./api";

export const getAllSessions = ()=>{
    return api.get('/sessions');
}

export const createSession = ()=>{
    return api.post('/sessions');
}

export const getSession = (sessionId)=>{
    return api.get(`/sessions/${sessionId}`);
}