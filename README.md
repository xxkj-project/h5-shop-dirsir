### h5 移动端电商项目

#### 技术栈

- 技术选型

```bash

# 前端框架
  vue

# ui框架
  vant

```

#### 项目地址

[git 地址] http://47.110.80.101:8088/H5/h5-shop-dirsir

#### 域名

测试：http://shop.tangseng.io

正式：http://blog.xinxingouwu.com

#### 服务器地址

测试：18.167.22.103
路径：/usr/share/nginx/html/shopdirsir

正式：18.167.22.41
路径：/usr/share/nginx/html/shopdirsir

#### 常用的组件

- 组件

  ```bash

  # header组件

  # search组件

  # qrcode组件

  # htmlToCancas组件

  ```

* 插件

  ```bash

  # loading插件

  # 自定义toast插件(暂未开发)

  ```

#### 编码规范(尽量遵循，不要求一律照旧)

https://guide.aotu.io/docs/js/language.html

#### 本地访问说明

域名 + 路由 + 渠道码

http://192.168.91.21:8899/index/123456

#### 文档地址(蓝湖/接口/测试链接) (此处以唐僧直播 app 为示例，根据不同的项目自行修改)

[蓝湖地址] https://lanhuapp.com/web/#/item/project/board?pid=48f4afd9-22cb-4987-b954-ed3cb7d289df

[本地] http://192.168.91.21:8080/index/123456

[测试线上地址] http://shop.tangseng.io/shopdirsir/index/123456

[正式线上地址] http://blog.xinxingouwu.com/shopdirsir/index/123456

[测试接口文档] http://shop.tangseng.io/shop/swagger-ui.html#/
[测试接口文档] http://shop.tangseng.io/im/swagger-ui.html#/
[测试接口文档] http://shop.tangseng.io/cms/swagger-ui.html#/

[正式接口文档] http://blog.xinxingouwu.com/shop/swagger-ui.html#/
[正式接口文档] http://blog.xinxingouwu.com/im/swagger-ui.html#/
[正式接口文档] http://blog.xinxingouwu.com/cms/swagger-ui.html#/

#### 访问线上相关

- 相关参数

```bash

# 访问地址(访问方式本地和线上一样都需要拼接参数key)
  访问地址：域名/shopdirsir/ + 页面路由 + 渠道码

# 例如：
  http://blog.xinxingouwu.com/shopdirsir/index/123456

```

#### 运行及打包

- 常用命令

  ```bash

  # 运行项目
    yarn serve

  # 以指定环境打包项目(目前环境有dev、test、prod，具体以项目的.env相关文件)
    yarn build:环境名； 例如：打包正式服 yarn build:prod

  ```

#### 注意

vant 版本可能会影响现有功能,若一些原本的功能不能用了，可以看看是不是版本的问题

#### 第三方插件(所需的模块需要自行安装，没有用上的不必考虑，)

- vue-clipboard2 (复制插件)

  ```bash

  # html
    <div
      v-clipboard:copy="infoData.currencyAddress"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
      class="copyBtn"
    >
      复制地址
    </div>

  # js
    methods: {
      onCopy() {
        this.$toast('复制成功')
      },
      onError() {
        this.$toast('复制失败')
      },
    }

  ```

* html2canvas

  ```bash

    # html
      <div class="screenShot" v-if="dialogImgVis">
        <img :src="imgUrl" alt="" />
      </div>

    #js
    methods: {
      screenShotHandle() {
        html2canvas(this.$refs.indexWrapper).then(canvas => {
          this.dialogImgVis = true
          console.log(canvas)
          let dataUrl = canvas.toDataURL('image.png')
          console.log(dataUrl)
          this.imgUrl = dataUrl
          setTimeout(() => {
            this.dialogImgVis = false
          }, 2000)
        })
      }
    }

  ```

#### 结构

#### 代码规范

- 代码规范的目的是提高项目的可维护性。
- 请阅读以上目录结构，了解每个文件和文件夹的作用，按照项目结构风格来编程。
- 项目已配置 eslint + prettier，需要自行配置好编辑器才能生效。

#### vscode 相关配置

- eslint：
  1、安装 eslint 插件。
  2、打开 vscode 设置的 settings.json，添加以下配置：

  ```bash

    "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue-html",
    "vue"
    ],
    "eslint.options": {
    "plugins": ["html"]
    },

  ```

- prettier：
  1、安装 prettier 插件。
  2、打开 vscode 设置的 settings.json，添加以下配置：

  ```bash

    "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[less]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[scss]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[vue]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "vetur.format.defaultFormatter.html": "js-beautify-html",
      "vetur.format.defaultFormatterOptions": {
      "prettier": {
      "eslintIntegration": true,
      "singleQuote": true,
      "semi": true
    }
  },

  ```

- 还需要安装个插件：EditorConfig for VS Code
  用来自动识别项目的.editorconfig 文件配置，保持编辑器编码风格的统一。

  根路径下添加.editorconfig 文件，添加如下配置

  ```bash

  # https://editorconfig.org
    root = true

    [*]
    charset = utf-8
    indent_style = space
    indent_size = 2
    end_of_line = crlf
    insert_final_newline = true
    trim_trailing_whitespace = true

    [*.md]
    insert_final_newline = false
    trim_trailing_whitespace = false

  ```
