import axios from 'axios'
import Vue from 'vue'

// 响应拦截
axios.interceptors.response.use(res => {
  return res.data
})
// 配置基准路劲 自己的服务器的
// axios.defaults.baseURL = 'http://localhost:9999'
// 导入挂在 axios在vue上
Vue.prototype.$axios = axios
