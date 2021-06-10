/*
 * @Author: wangshengxian
 * @Date: 2020-10-19 15:35:17
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-11 11:03:05
 * @Desc: vant组件按需引入配置文件
 */

import {
  Sku,
  Overlay,
  PullRefresh,
  List,
  Cell,
  CellGroup,
  Card,
  Tag,
  Toast,
  Dialog,
  Button,
  Icon,
  Loading,
  Lazyload,
  Field,
  Uploader,
  Checkbox,
  CheckboxGroup,
  CouponCell,
  CouponList,
  Popup,
  Picker,
  Tabs,
  Tab,
  Col,
  Row,
  Area,
  Form,
  DropdownItem,
  DropdownMenu
} from 'vant'

const components = {
  Sku,
  Overlay,
  PullRefresh,
  List,
  Cell,
  CellGroup,
  Card,
  Tag,
  Toast,
  Dialog,
  Button,
  Icon,
  Loading,
  Lazyload,
  Field,
  Uploader,
  Checkbox,
  CheckboxGroup,
  CouponCell,
  CouponList,
  Popup,
  Picker,
  Tabs,
  Tab,
  Col,
  Row,
  Area,
  Form,
  DropdownItem,
  DropdownMenu
}

const componentHandler = {
  install(Vue) {
    let keyArr = Object.keys(components)
    // console.log(keyArr)
    keyArr.forEach(key => Vue.use(components[key]))
  }
}

export default componentHandler
