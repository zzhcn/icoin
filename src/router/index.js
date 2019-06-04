import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import login from '@/view/login/login'
import documents from '@/view/documents/documents'
import bot from '@/view/bot/bot'
import botLog from '@/view/bot/botlog'
import market from '@/view/market/market'
import wealth from '@/view/wealth/index'
import homePage from '@/view/home'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      show:false,
      title:'首页',
      icon:'el-icon-s-home',
      redirect:'/home',
      children:[
        {
          path: '/home',
          name: 'home',
          component: homePage,
          show:true,
          title:'首页',
          icon:'el-icon-s-home',
        },
        {
          path: '/wealth',
          name: 'wealth',
          component: wealth,
          show:true,
          title:'资产',
          icon:'el-icon-s-finance',
        },
        {
          path: '/market',
          name: 'market',
          component: market,
          show:true,
          title:'行情',
          icon:'el-icon-s-unfold',
          children:[
          ]
        },
        {
          path: '/bot',
          name: 'bot',
          component: bot,
          show:true,
          title:'机器人',
          icon:'el-icon-s-platform',
          children:[
          ]
        },
        {
          path: '/botlog',
          name: 'botlog',
          component: botLog,
          show:false,
          title:'机器人日志',
          icon:'el-icon-s-platform',
          children:[
          ]
        },
        {
          path: '/documents',
          name: 'documents',
          component: documents,
          show:true,
          title:'文档',
          icon:'el-icon-document',
          children:[
          ]
        },

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      show:false
    }
  ]
})
