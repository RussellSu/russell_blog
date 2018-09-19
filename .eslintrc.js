// http://eslint.org/docs/user-guide/configuring
// http://eslint.cn/docs/user-guide/configuring
module.exports = {
  root: true, // 只使用当前配置，停止在父级目录中寻找配置文件。
  parserOptions: {
    parser: 'babel-eslint', // 解析器: Esprima（default）/ babel-eslint（babel-eslint解析器是对babel解析器的包装使其与ESLint解析） / typescript-eslint-parser(实验)
    // sourceType: 'module', // 设置 script(默认) 或 module，如果代码是在ECMASCRIPT中的模块
    // "ecmaVersion": 6, // 默认 3，5
  },
  // http://eslint.cn/docs/user-guide/configuring#specifying-environments
  env: {
    browser: true, // 浏览器环境中的全局变量。
    node: true, // Node.js 全局变量和 Node.js 作用域。
    commonjs: true, // CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
    es6: true, // 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
    amd: true, // 将 require() 和 define() 定义为像 amd 一样的全局变量。
    mocha: false // 添加所有的 Mocha 测试全局变量。
  },
  // http://eslint.cn/docs/user-guide/configuring#extending-configuration-files
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  // http://eslint.cn/docs/user-guide/configuring#using-the-configuration-from-a-plugin
  plugins: [
    // 'html' // eslint-plugin-html : This ESLint plugin allows linting and fixing inline scripts contained in HTML files.
  ],
  // http://eslint.cn/docs/rules/
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': [2, 'only-multiline'], // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'indent': [2, 2],
    // allow debugger during development
    // if-else中的else语句，连同catch 和 finally，都必须在右括号后另起一行， allowSingleLine 允许块的开括号和闭括号在 同一行
    'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }],
    'operator-linebreak': [2, 'before'], // + || 强制操作符使用一致的换行符风格  before行前
    'quotes': 0,
    'semi': [2, 'never'],
    'space-before-function-paren': [2, {
      "anonymous": "always",
      "named": "always",
      "asyncArrow": "always"
    }],
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }] //   来自某插件的某规则:  <pluginName>/<ruleName>
  },
}
