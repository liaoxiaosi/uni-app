import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

import uView from 'uview-ui'
//使用
Vue.use(uView)

//设置文件访问基础地址信息,地址是服务器地址，这里是假的，全局注册，这样哪里都能获取
Vue.prototype.BaseFileURL = 'http://47.115.83.135/api/v2/files'

//引入store 
import store from "@/store/index.js"

//引入公用组件 登录模块
import login from '@/components/login.vue'
Vue.component('login',login)

//引用公用组件，gotoShare
import gotoShare from '@/components/gotoShare.vue'
Vue.component('goto-share',gotoShare)

App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})




// 引入请求封装，将app参数传递到配置中
require('@/common/request.js')(App)
app.$mount()

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif