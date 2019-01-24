import latestGitignore from './src/latestGitignore';

(async () => {
  const generated = await latestGitignore(
    [
      'macOS',
      'Windows',
      'Linux',
      'Node',
      'VisualStudioCode',
      'SublimeText',
      'CVS',
      'Diff',
      'Vim',
      'TortoiseGit',
    ],
    '.vscode',
  );

  console.info(generated);
})();
