'use client'
import { useState } from "react";
import {generateSolution} from "../../services/llmServices";

export default function GeneratePage() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState("");
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true);
        try{
            let response = await generateSolution(prompt);
            setRes(response.data.component);
        }catch(err){
            console.log(err.message);
        }finally{
            setLoading(false);
        }
    }
  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">React Component Generator</h1>
      <form className="space-y-4"  onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe your component..."
          onChange={(e)=>{setPrompt(e.target.value)}}
          className="w-full p-4 rounded-lg border text-black border-gray-300 resize-none"
          rows={6}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Generate Component
        </button>
      </form>
      <p className="text-black">{loading ? 'Loading...' : res}</p>
    </div>
  );
}
