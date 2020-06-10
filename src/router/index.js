import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 需要左方向动画的路由用this.$router.to('****')
Router.prototype.togo = function (path) {
  this.isleft = true
  this.isright = false
  this.push(path)
}
// 需要右方向动画的路由用this.$router.goRight('****')
Router.prototype.goRight = function (path) {
  this.isright = true
  this.isleft = false
  this.push(path)
}
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
Router.prototype.goBack = function () {
  this.isright = true
  this.isleft = false
  this.go(-1)
}
// 点击浏览器返回按钮执行，此时不需要路由回退
Router.prototype.togoback = function () {
  this.isright = true
  this.isleft = false
}
// 点击浏览器前进按钮执行
Router.prototype.togoin = function () {
  this.isright = false
  this.isleft = true
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['@/pages/index'], resolve),
      redirect: '/news',
      children: [
        {
          path: '/news',
          name: 'news',
          component: (resolve) => require(['@/pages/index/news'], resolve)
        },
        {
          path: '/noticelist',
          name: 'noticelist',
          component: (resolve) => require(['@/pages/index/noticelist'], resolve)
        },
        {
          path: '/noticecase/:id',
          name: 'noticecase',
          component: (resolve) => require(['@/pages/index/noticecase'], resolve)
        },
        {
        path: '/home',
        name: 'home',
        component: (resolve) => require(['@/pages/index/home'], resolve)
      },
      {
        path: '/video',
        name: 'video',
        component: (resolve) => require(['@/pages/index/video'], resolve)
      },
      
      {
        path: '/loop/:id',
        name: 'loop',
        component: (resolve) => require(['@/pages/index/loop'], resolve)
      },
      {
        path: '/personal',
        name: 'personal',
        component: (resolve) => require(['@/pages/index/personal'], resolve)
      }
      ]
    },

    {
      path: '/Home/classify/:id',
      name: 'classify',
      component: (resolve) => require(['@/pages/index/classify'], resolve)
    },
    {
      path: '/Home/detail/:id',
      name: 'detail',
      component: (resolve) => require(['@/pages/index/detail'], resolve)
    },
    {
      path: '/Home/video_detail',
      name: 'video_detail',
      component: (resolve) => require(['@/pages/index/video_detail'], resolve)
    },
    {
      path: '/Home/expert',
      name: 'expert',
      component: (resolve) => require(['@/pages/index/expert'], resolve)
    },
    {
      path: '/mywatch/:id',
      name: 'mywatch',
      component: (resolve) => require(['@/pages/index/mywatch'], resolve)
     },
     {
      path: '/newslist/:id',
      name: 'newslist',
      component: (resolve) => require(['@/pages/index/newslist'], resolve)
     },
     {
      path: '/newscase/:id',
      name: 'newscase',
      component: (resolve) => require(['@/pages/index/newscase'], resolve)
     },
     {
       path: '/myComments/:id',
       name: 'myComments',
       component: (resolve) => require(['@/pages/index/myComments'], resolve)
     },
     {
      path: '/collect/:id',
      name: 'collect',
      component: (resolve) => require(['@/pages/index/collect'], resolve)
    },
    {
      path: '/about',
      name: 'about',
      component: (resolve) => require(['@/pages/index/about'], resolve)
    },
    {
      path: '/typeVedio',
      name: 'typeVedio',
      component: (resolve) => require(['@/pages/index/typeVedio'], resolve)
    },
  ]
})
