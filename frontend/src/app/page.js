"use client";

import { useState } from "react";
import { generateSolution } from "../services/llmServices";
import CodeEditor from "../components/CodeEditor";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [res, setRes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await generateSolution(prompt);
      setRes(response.data.component);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-zinc-900">
      <h1 className="text-3xl font-bold mb-6">React Component Generator</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe your component..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-4 rounded-lg border border-gray-300 resize-none"
          rows={6}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Generate Component
        </button>
      </form>

      {res && (
        <>
          <h2 className="text-xl mt-8 mb-2 font-semibold">Generated Code:</h2>
          <CodeEditor code={res} />
        </>
      )}
    </div>
  );
}
