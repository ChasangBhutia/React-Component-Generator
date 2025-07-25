'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ inline, children }) {
          return inline ? (
            <code className="bg-gray-200 text-red-600 px-1 rounded text-sm">
              {children}
            </code>
          ) : (
            <pre className="bg-gray-900 text-white p-4 rounded-md text-sm overflow-x-auto my-4">
              <code>{children}</code>
            </pre>
          );
        },
        p({ children }) {
          return <p className="text-gray-800 my-2">{children}</p>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
