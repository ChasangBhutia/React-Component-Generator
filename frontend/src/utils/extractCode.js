export const extractCodeFromLLMResponse = (response)=> {
  const regex = /```(\w+)?\n([\s\S]*?)```/g;

  let parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(response)) !== null) {
    const start = match.index;

    // Push plain text before the code block
    if (start > lastIndex) {
      parts.push({
        type: 'text',
        content: response.slice(lastIndex, start).trim(),
      });
    }

    // Push the code block
    parts.push({
      type: 'code',
      language: match[1] || 'jsx',
      content: match[2].trim(),
    });

    lastIndex = regex.lastIndex;
  }

  // Push any remaining text after the last code block
  if (lastIndex < response.length) {
    parts.push({
      type: 'text',
      content: response.slice(lastIndex).trim(),
    });
  }
  
  return parts;
}
