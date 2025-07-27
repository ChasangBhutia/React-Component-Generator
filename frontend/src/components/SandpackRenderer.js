'use client';

import { Sandpack } from "@codesandbox/sandpack-react";
import { extractDependencies } from "@/utils/extractDependencies"

export default function StaticPreviewer({ code }) {

  const dependencies = extractDependencies(code);

  return (
    <div className="my-6 border rounded-md overflow-hidden">
      <Sandpack
        template="react"
        customSetup={{
          dependencies: {
            react: 'latest',
            'react-dom': 'latest',
            ...dependencies,
          },
        }}
        options={{
          showNavigator: false,
          showLineNumbers: true,
          wrapContent: true,
          editorHeight: 400,
          showTabs: true,
        }}
        files={{
          "/App.js": code,
          "/main.js": {
            code: `
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
            `.trim(),
            hidden: true,
          },
          "/index.html": {
            code: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Static Preview</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
            `.trim(),
            hidden: true,
          },
        }}
      />
    </div>
  );
}
