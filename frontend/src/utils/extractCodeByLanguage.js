export const extractCodeByLanguage = (rawCode) => {
  const sections = rawCode.split(/\/\/ Language: (\w+)/g).slice(1);
  const result = { jsx: '', css: '', app: '' };

  for (let i = 0; i < sections.length; i += 2) {
    const lang = sections[i];
    const content = sections[i + 1].trim();

    if (lang === 'jsx' && !result.jsx) result.jsx = content;
    else if (lang === 'jsx' && result.jsx) result.app = content;
    else if (lang === 'css') result.css = content;
  }

  return result;
};