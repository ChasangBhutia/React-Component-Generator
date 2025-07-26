"use client";

import { useState, useRef, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import useChats from "@/hooks/useChats";
import useSessions from "@/hooks/useSessions";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);
  const { createChat } = useChats();
  const { session } = useSessions();



  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="min-h-screen bg-black flex">
      <SideBar />
      <section className="w-[80vw]">
        <Navbar />
        <section className="px-10 text-white flex flex-col items-center">
          <div
            style={{
              scrollbarWidth: "none",         // Firefox
              msOverflowStyle: "none",        // IE and Edge
            }}
            className="overflow-scroll w-[70vw] h-[70vh] p-2"
          >
            {session?.chats?.length > 0 && (
              session.chats.map((item, index) => (
                <CodeEditor key={index} code={item.response} />
              ))
            )}

          </div>

          <form className="fixed bottom-5 w-[70vw]" onSubmit={handleSubmit}>
            <textarea
              ref={textareaRef}
              placeholder="Describe your component..."
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
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-2"
            >
              Send
            </button>
          </form>
        </section>
      </section>
    </div>
  );
}
