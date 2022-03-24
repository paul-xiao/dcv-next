module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write", "git add"],
  "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": [
    "prettier --write--parser json",
    "git add",
  ],
  "package.json": ["prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix", "git add"],
  "*.{scss,less,styl}": ["stylelint --fix", "prettier --write", "git add"],
  "*.md": ["prettier --write", "git add"],
};
