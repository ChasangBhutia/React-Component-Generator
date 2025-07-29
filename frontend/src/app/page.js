"use client";

import "./style.css"
import { useState, useRef, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import useChats from "@/hooks/useChats";
import { useSessionContext } from "@/context/SessionContext";
import SandpackRenderer from "@/components/SandpackRenderer";
import Hero from "@/components/Hero";
import SendIcon from '@mui/icons-material/Send';


export default function Home() {
  const { session, generateSession, allSessions } = useSessionContext()
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);
  const { createChat, chatLoading } = useChats();
  const [preview, setPreview] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

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
    <div className="h-full pb-10 flex w-full">
      <SideBar openSideBar={openSideBar}/>
      <section className="w-full h-full md:ml-[300px] lg:ml-[20vw]">
        <Navbar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
        <section className="h-full px-0 sm:px-10 text-white bg-black flex flex-col items-center">
          <div
            className="w-[90vw] sm:w-[70vw] h-full p-2 py-10"
          >
            {session.chats?.length > 0 ? (
              session.chats.map((item, index) => (
                <div key={index}>
                  <section className="text-right w-full">
                    <h3 className="ml-auto p-2 rounded-xl bg-zinc-800 my-5 w-fit flex gap-2 text-left">{item.prompt}</h3>
                  </section>
                  <CodeEditor code={item.response} />
                  <button className="bg-[#0a68d2] my-3 py-2 px-5 rounded hover:bg-blue-900" onClick={() => setPreview(!preview)}>Preview</button>
                  {preview && <SandpackRenderer code={item?.relatedComponent?.code} />}
                </div>
              ))
            ) : <Hero />}
            {chatLoading && <h1 className="text-right generatingLoading">Generating</h1>}

          </div>

          {allSessions.length>0 ? <form className="w-[90vw] sm:w-[70vw] fixed pb-5 bottom-0 z-97 bg-black" onSubmit={handleSubmit}>
            <textarea
              ref={textareaRef}
              placeholder={chatLoading ? 'Loading...' : 'Describe your component...'}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{
                maxHeight: "150px",
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="w-full p-4  border rounded-lg border-gray-300 resize-none text-white bg-black"
              rows={1}
            />
            <button
              type="submit"
              className="bg-[#0a68d2] text-white h-10 w-20 rounded hover:bg-blue-900 mt-2 overflow-hidden"
              onClick={()=>{setButtonClicked(!buttonClicked); setTimeout(()=>{setButtonClicked(false)},1000)}}
            >
              <section className={`${buttonClicked? 'animate-button':''}`}>
              <SendIcon />
              </section>
            </button>
          </form> : <div className="w-full ps-10"><p className="text-left text-xl">Create a new chat to start generating component</p> <button className="h-13 w-60 mt-10 bg-[#0a68d2] hover:bg-blue-900" onClick={() => generateSession()}>Create Chat</button></div>}
        </section>
      </section>
    </div>
  );
}
