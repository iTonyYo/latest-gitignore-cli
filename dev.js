import gitignore from './src/gitignore';

(async () => {
  await gitignore(
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
})();
