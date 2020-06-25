import axios from 'axios';
import qs from 'qs'
import router from '@/router'
import store from '@/store'

// import {message, Modal} from 'ant-design-vue'
// import 'nprogress/nprogress.css'

let baseURL = process.env.NODE_ENV === '"development"' ? process.env.BASE_URL : 'http://192.168.1.153'; //  定义基本url
// 定义请求头

axios.defaults.baseURL = baseURL // Default base path

// axios.defaults.headers.post['Content-Type'] = 'application/json;charSet=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.headers.get['Content-Type'] = 'application/json;charSet=UTF-8'

axios.defaults.headers.put['Content-Type'] = 'application/json;charSet=UTF-8'

axios.defaults.headers.delete['Content-Type'] = 'application/json;charSet=UTF-8'

axios.defaults.headers.patch['Content-Type'] = 'application/json;charSet=UTF-8'

// 添加请求拦截器
/* axios.interceptors.request.use((config) => {
  //   localStorage.getItem('token')
  let Token = store.getters['user/getUserInfo'].token;
  if (Token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `Bearer ${Token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
}) */

// 添加响应拦截器
axios.interceptors.response.use((response) => {

    const res = response
    console.log(res, response)
    // Judging status code in interceptor reply returns corresponding processing information 处理状态码
    if (res.status == null) { // 无状态码，停止,并打印结果
      console.warn(res);
      return;
    }
    if (response.config.method === 'delete' || response.config.method === 'put' || response.config.method === 'post' ) { // 当方法为编辑或者删除时，提示操作成功！
      switch (response.status) {
        case 200 :
          // success('操作成功')
          break;
        default:
          // warning(`${response.data.msg}`)
          break;
      }
    }
    if (res.status !== 200) {
      // message.warn(`${res.msg || 'Error'}`)
      console.log('请求信息', res)
      // if (res.status === 20001 || res.status === 70004 || res.status === 70006) {
      //   Modal.confirm({
      //     title: '警告信息',
      //     content: res.msg || 'Error',
      //     okText: '重新登录',
      //     onOk() {
      //       store.dispatch('user/removeUserInfo').then(() => {
      //         router.push('/login')
      //       })
      //     },
      //     onCancel() {
      //     },
      //   });
      // }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

// 封装的方法

/**

 * get 方法封装

 * @param url

 * @param params

 * @returns {Promise}

 */

export function getApi(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(`${url}`, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**

 * post

 * @param url

 * @param paramsData

 * @returns {Promise}

 */

export function postApi(url, paramsData = {}) {
  console.log(url,paramsData)
  return new Promise((resolve, reject) => {
    axios.post(`${url}`, qs.stringify(paramsData))
      .then(response => {
        console.log(response)
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**

 * delete 方法封装

 * @param url

 * @param data

 * @returns {Promise}

 */

export function deleteApi(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(`${url}`, {

      params: params

    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**

 * put 方法封装

 * @param url

 * @param params

 * @returns {Promise}

 */

export function putApi(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.put(`${url}`, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**

 * patch 方法封装

 * @param url

 * @param params

 * @returns {Promise}

 */

export function patchApi(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(`${url}`, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}