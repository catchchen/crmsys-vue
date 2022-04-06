import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element.js 中使用了Vue.use
import './config/element'
import 'element-ui/lib/theme-chalk/index.css'
// 导入axios 的配置
import './config/axios'
// 引入全局样式文件
import './assets/css/global.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
