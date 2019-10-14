// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import Vuelazyload from 'vue-lazyload'
Vue.component(Button.name,Button)
import loading from './common/imgs/loading.gif'
import './mock/mockServer' //加载自定义的数据
import './filters' // 加载自定义过滤器
/* eslint-disable no-new */
Vue.use(Vuelazyload,{
  loading
})
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
