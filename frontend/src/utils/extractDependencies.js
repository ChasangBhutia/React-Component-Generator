export const extractDependencies = (code) => {
  const importRegex = /import\s+(?:.+?\s+from\s+)?['"]([^'"]+)['"]/g;
  const deps = new Set();
  let match;

  while ((match = importRegex.exec(code))) {
    const pkg = match[1];
    if (!pkg.startsWith('.') && !pkg.startsWith('/')) {
      const basePkg = pkg.startsWith('@') ? pkg.split('/').slice(0, 2).join('/') : pkg.split('/')[0];
      deps.add(basePkg);
    }
  }

  return Array.from(deps).reduce((acc, pkg) => {
    acc[pkg] = 'latest';
    return acc;
  }, {});
};