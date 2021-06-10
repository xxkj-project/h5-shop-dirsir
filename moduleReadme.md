### 2020-07-02

```bash

# banner 组件

# 单列横版商品组件

# 两列商品组件(可能为瀑布流)

# 三列商品组件

# 轮播图组件

```

#### 前端模拟数据

- 使用 mockjs

```bash

  # 安装
  npm/cnpm i mockjs -S

  # 使用
  var Mock = require('mockjs')
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|10': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        title: `商品名`
      }
    ]
  })

  console.log(JSON.stringify(data, null, 4))

```

- json-server(模仿后台接口)

```bash

  # 全局安装
  npm i json-server -g

  # 根目录创建db.json文件(如下的数据为示例数据)
  {
    “ posts ”：[
      { “ id ”：1，“ title ”：“ json-server ”，“ author ”：“ typicode ” }
    ]，“评论”：[
      { “ id ”：1，“ body ”：“一些评论“，” postId “：1 }

    ]，“ profile ”：{ “ name ”：“ typicode ” }
  }

  # 启动json-server
  json-server --watch db.json

  # 访问http：// localhost：3000 / posts / 1
  得到 { “ id ”：1，“ title ”：“ json-server ”，“ author ”：“ typicode ” }

```
