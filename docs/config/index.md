# 项目配置


## tailwindcss

### init

```sh
pnpm add -D tailwindcss@latest postcss@latest autoprefixer@latest

npx tailwindcss init -p

```

### config

```ts
// main.ts

import 'tailwindcss/tailwind.css'

```

## commitlint 


```
pnpm add -D @commitlint/cli @commitlint/config-conventional

```

添加 husky

```
npx husky-init && pnpm install

npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

添加 commitlint.config.js

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init',
        'build',
        'ci',
        'docs',
        'fix',
        'perf',
        'feat',
        'style',
        'refactor',
        'test',
        'revert',
        'chore',
        'wip'
      ]
    ],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never']
  }
}
```