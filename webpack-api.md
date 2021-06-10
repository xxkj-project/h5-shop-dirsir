<!--
 * @Author: wangshengxian
 * @Date: 2020-12-09 10:58:15
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-09 11:51:48
 * @Desc: webpack常用api
-->

### 获取特定的上下文

```bash

  # require.context
  ==》实现自动化导入模块
  ==》实现场景：遇到从一个文件夹引入很多模块的情况,可以使用这个api,它会遍历文件夹中的指定文件,然后自动导入,使得不需要每次显式的调用import导入模块

  # require.context() 接受三个参数
  1、directory {String} 读取文件的路径
  2、useSubdirectories{Boolean} 是否遍历文件的子目录
  3、regExp{RegExp} 匹配文件的正则

  # 语法
  require.context(directory, useSubdirectories = false, regExp = /^.//)

  #  TODO: 自动化导入模块文件
  const modulesFiles = require.context('./modules', false, /\.js$/)

  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // console.log(module, modulePath)
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    // console.log(moduleName)
    const value = modulesFiles(modulePath)
    // console.log(value)
    modules[moduleName] = value.default
    return modules
  }, {})

  // console.log(modules)

```
