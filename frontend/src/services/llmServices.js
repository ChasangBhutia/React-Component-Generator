import api from "./api";

export const generateSolution = (prompt)=>{
    return api.post('/llm/generate', {prompt});
}
