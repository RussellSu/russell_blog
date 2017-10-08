// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    amd: true,
    mocha: false
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'indent': [2, 2],
    'comma-dangle': [2, 'only-multiline'],
    'space-before-function-paren': [2, 'always'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //if-else中的else语句，连同catch 和 finally，都必须在右括号后另起一行， allowSingleLine 允许块的开括号和闭括号在 同一行
    'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }]
  }
}
