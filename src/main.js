// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from 'axios'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css

let baseUrl='http://47.244.151.32:9000/api';
// let baseUrl='http://192.168.31.44:8000/api';
Vue.config.productionTip = false;
Vue.prototype.httpPost=function (url,data,callback) {
  let urlStr=baseUrl+url;
  let config={
    method:'post',
    url:urlStr,
    headers:{
      'AUTHORIZATION':'token '+localStorage.getItem('token')
    },
    data:data
  };
  http(config).then(function (res) {
    // console.log(res);
    callback&&callback(res.data)
  }).catch(function (err) {
    if(err.code==1000){
      localStorage.removeItem('token');
      location.reload()
    }
  })
};
Vue.prototype.httpGet=function (url,callback) {
  let urlStr=baseUrl+url;
  let config={
    method:'get',
    url:urlStr,
    headers:{
      'AUTHORIZATION':'token '+localStorage.getItem('token'),
      'Content-Type':'application/gzip'
    }
  };
  http(config).then(function (res) {
    // console.log(res)
    if(res.data.code==1000){
      localStorage.removeItem('token');
      location.reload()
    }else {
      callback&&callback(res.data)
    }
  }).catch(function (err) {
    if(err.code==1000){
      localStorage.removeItem('token');
      location.reload()
    }
  })
};

Vue.use(ElementUI); //使用elementUI
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
