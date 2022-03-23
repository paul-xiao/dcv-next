
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