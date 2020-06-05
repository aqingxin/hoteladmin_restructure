import axios from 'axios';
import Vue from 'vue';
import Router from '@/router/index';
var baseURL = '';

if(process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000/api'
}else{
  baseURL = 'http://47.107.147.178:1689'
}

var service = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
})

// service.interceptors.request.use(
//   config=> {
//     if(getToken()) {
//       config.headers.common['Authorization'] = getToken();
//     }
//     return config
//   }
// )

service.interceptors.response.use(
  res=>{
    if(res.data.code==400&&res.data.message==='登录过期') {
      Vue.prototype.$message({
        message: res.data.message,
        type: 'error'
      })
      removeToken()
      Router.push('/login')
    }else if(res.data.code==400) {
      Vue.prototype.$message({
        message: res.data.message,
        type: 'error'
      })
      // return Promise.reject(res)
    }else if(res.data.code==200){
      return Promise.resolve(res)
    }else{
      Vue.prototype.$message({
        message: res.data.message,
        type: 'error'
      })
    }
  }
)

export default service