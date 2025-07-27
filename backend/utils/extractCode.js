// utils/extractCode.js
function extractCode(response) {
  const codeBlocks = [];
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;

  while ((match = regex.exec(response)) !== null) {
    const language = match[1] || 'text';
    const code = match[2].trim();
    codeBlocks.push(`// Language: ${language}\n${code}`);
  }

  return codeBlocks.join('\n\n'); // Final string
}

module.exports = { extractCode };
