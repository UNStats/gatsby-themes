module.exports = {
  '*.js': ['eslint --cache --fix', 'git add'],
  '*.{md,mdx,css,yaml,yml}': [
    'prettier --write',
    'prettier --check',
    'git add',
  ],
};
