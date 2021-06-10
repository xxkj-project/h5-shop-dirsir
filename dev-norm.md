<!--
 * @Author: wangshengxian
 * @Date: 2020-11-04 16:34:07
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-18 15:00:43
 * @Desc: 开发规范文档
-->

### 开发规范

#### css 规范

- 元素定位层级设置

```bash

  # 最高级 999

  # 此高级 666

  # 一般 100

  # 没有要求 (0~10)

  # 遮罩为最高级；悬浮按钮、公共的上下栏为次高级；元素定位(absolute)

```

#### eslint 配置

- 忽略某一行代码检测

```bash

  # 代码后面加上 // eslint-disable-line

```

- 跳过多行

```bash

  # 代码前后分别加上 (/* eslint-disable */ /* eslint-enable */)

  /* eslint-disable */
  export function getAddressByLngLat (lng, lat) {
    return new Promise((resolve) => {
      let myGeo = new BMap.Geocoder()
      myGeo.getLocation(new BMap.Point(lng, lat), function (result) {
        if (result) {
          resolve(result)
        }
      })
    })
  }
  /* eslint-enable */

```
