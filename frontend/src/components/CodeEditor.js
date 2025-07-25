"use client";

import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-jsx";
import DOMPurify from "isomorphic-dompurify";
import { extractCodeFromLLMREsponse } from "@/utils/extractCode";

const highlight = (code, language = "jsx") => {
  return Prism.highlight(code, Prism.languages[language] || Prism.languages.jsx, language);
};

export default function CodeEditor({ code }) {
  const blocks = extractCodeFromLLMREsponse(code);

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, index) =>
        block.type === "text" ? (
          <p key={index} className="text-gray-800 whitespace-pre-wrap">
            {block.content}
          </p>
        ) : (
          <pre
            key={index}
            className="bg-zinc-800 text-white text-sm p-4 rounded-md w-full overflow-x-auto whitespace-pre"
          >
            <code
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(highlight(block.content, block.language)),
              }}
            />
          </pre>
        )
      )}
    </div>
  );
}
