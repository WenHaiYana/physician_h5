// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*eslint-disable*/
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css';
import FastClick from 'fastclick'
import '../static/js/flexible.js'
import axios from 'axios'
import "../static/fonts/iconfont.css"
import $jq from 'jquery'

import {post,get} from './require/http'
// // 定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$get=get;
//中间件
Vue.prototype.bus=new Vue()

import vueMiniPlayer from 'vue-mini-player'
import 'vue-mini-player/lib/vue-mini-player.css'
Vue.use(vueMiniPlayer)

import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video

import VueRouter from 'vue-router'
import $ from 'jquery'
// if (process.env.MOCK) {    // 判断是否为mock模式
//   require('./mock/index.js')
// }
/**
*监听浏览器点击返回前进操作动画
*浏览器端使用需要注意路由path的创建，二级应该在一级的基础上添加
*如一级/Home，则二级为/Home/Detail，依次往后加，如果是app的话可忽略以下代码
*/
window.eventBus = new Vue();
let init = 0
window.addEventListener('popstate', function(e) {
  init++
  if (init < 2) {
    router.beforeEach((to, from, next) => {
      let arr1 = to.path.split('/')
      let arr2 = from.path.split('/')
      if (arr1.length === 2) {
        if (arr1[1].length === 0) {
          arr1.splice(1, 1)
        }
      }
      if (arr2.length === 2) {
        if (arr2[1].length === 0) {
          arr2.splice(1, 1)
        }
      }
      if (arr1.length < arr2.length) {
        router.togoback()
      } else {
        router.togoin()
      }
      next()
    })
  }
}, false)

// app 修改状态栏颜色
// document.addEventListener('plusready', function () {
//   let System = window.plus.os.name
//   if (System === 'iOS') {
//     window.plus.navigator.setStatusBarBackground('#d81e06')
//   }
// })

Vue.use(Vant);
Vue.use(Vuex)
Vue.config.productionTip = false
FastClick.attach(document.body)
Vue.prototype.$http = axios

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

