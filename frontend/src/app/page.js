"use client";

import "./style.css"
import { useState, useRef, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import useChats from "@/hooks/useChats";
import {useSessionContext} from "@/context/SessionContext";
import SandpackRenderer from "@/components/SandpackRenderer";
import Hero from "@/components/Hero";

export default function GeneratePage() {
  const {session} = useSessionContext()
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);
  const { createChat, chatLoading } = useChats();
  const [preview, setPreview] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrompt("");
    createChat({ prompt, sessionId: localStorage.getItem("sessionId") })
  };


  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 400)}px`;
    }
  }, [prompt]);

  return (
    <div className="min-h-screen flex bg-black">
      <SideBar />
      <section className="w-[80vw]">
        <Navbar />
        <section className="px-10 text-white flex flex-col items-center">
          <div
            className="overflow-y-scroll w-[70vw] h-[70vh] p-2 pb-50 pt-10"
          >
            {session.chats?.length > 0 ? (
              session.chats.map((item, index) => (
                <div key={index}>
                <section className="text-right w-full">
                  <h3 className="ml-auto p-2 rounded-xl bg-zinc-800 my-5 w-fit">{item.prompt}</h3>
                </section>
                <CodeEditor code={item.response} />
                <button onClick={()=>setPreview(!preview)}>Preview</button>
                {preview && <SandpackRenderer code={item?.relatedComponent?.code}/>}
                </div>
              ))
            ) : <Hero/>}
            {chatLoading && <h1 className="text-right generatingLoading">Generating</h1>}

          </div>

          <form className="fixed bottom-5 w-[70vw]" onSubmit={handleSubmit}>
            <textarea
              ref={textareaRef}
              placeholder={chatLoading ? 'Loading...' : 'Describe your component...'}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{
                maxHeight: "150px",
                overflowY: "auto",
                scrollbarWidth: "none",         // Firefox
                msOverflowStyle: "none",        // IE and Edge
              }}
              className="w-full p-4 border rounded-lg border-gray-300 resize-none text-white bg-black"
              rows={1}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-2 neon-btn"
            >
              Send
            </button>
          </form>
        </section>
      </section>
    </div>
  );
}
