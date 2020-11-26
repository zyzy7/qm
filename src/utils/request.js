import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import { getToken, removeToken } from '@/utils/auth'
import router from '@/router'

// 根据环境不同引入不同api地址
// import { baseApi } from '@/config'
export const obj = {
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: '/api/', // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: { 'X-Requested-With': 'XMLHttpRequest', Authorization: 'Bearer ' + getToken(), 'Content-Type': 'application/json' }
}
const service = axios.create(obj)

// request interceptor
service.interceptors.request.use(
  config => {
    // alert('hi')
    // do something before request is sent
    Toast.loading({
      message: '加载中...',
      forbidClick: true
    })

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      // console.log(store.getters)
      // config.headers['x-requested-with'] = 'xmlhttprequest'
      config.headers.Authorization = 'Bearer ' + getToken()
      // config.headers.ContentType = 'multipart/form-data'
    }
    return config
  },
  error => {
    // do something with request error
    Toast.fail('网络异常，请稍后再试')
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    Toast.clear()
    // if the custom code is not 200, it is judged as an error.
    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    if (res.code === 10401) {
      // to re-login
      removeToken()
      router.push('login')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    Toast.fail('网络异常，请稍后再试')
    return Promise.reject(error)
  }
)

export default service
