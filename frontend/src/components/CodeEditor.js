"use client";

import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-jsx";
import DOMPurify from "isomorphic-dompurify";
import { extractCodeFromLLMResponse } from "@/utils/extractCode";
import { useState } from "react";

const highlight = (code, language = "jsx") => {
  return Prism.highlight(code, Prism.languages[language] || Prism.languages.jsx, language);
};

export default function CodeEditor({ code }) {

  const blocks = extractCodeFromLLMResponse(code);
  const [copiedIndex, setCopiedIndex] = useState(null);


  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, index) =>
        block.type === "text" ? (
          <p key={index} className="text-white my-5 whitespace-pre-wrap">
            {block.content}
          </p>
        ) : (
          <pre
            key={index}
            className="p-2 bg-zinc-800 text-white text-sm sm:p-4 rounded-md w-full"
          >
            <header className="flex justify-between mb-2">
              <h1>{block.language}</h1>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(block.content);
                  setCopiedIndex(index);
                  setTimeout(() => setCopiedIndex(null), 2000);
                }}
                className="hover:text-blue-400 text-sm"
              >
                {copiedIndex === index ? "Copied!" : "Copy"}
              </button>
            </header>
            <section className="overflow-x-auto whitespace-pre">

              <code
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(highlight(block.content, block.language)),
                }}
              />
            </section>
          </pre>
        )
      )}
    </div>
  );
}
