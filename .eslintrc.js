/*
 * @Author: wangshengxian
 * @Date: 2020-11-18 13:31:26
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-18 15:01:08
 * @Desc: eslint配置
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  // extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off'
    // 'space-before-function-paren': [2, 'never'] // 函数定义时括号前面要不要有空格
  }
}
