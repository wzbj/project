import request from '@/utils/request'
import axios from 'axios'

export function login(username, password) {
  
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data: {
  //     username,
  //     password
  //   }
  // })
}

export function getInfo(token) {
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
}

export function getRouter(roule) {
  console.log(roule)
  if (roule === 'admin') {
    return axios.get(
      ' https://www.easy-mock.com/mock/5ca8799b4f62671c250622a9/vlogin/user/getRouterAdmin'
    )
  } else {
    return axios.get(
      ' https://www.easy-mock.com/mock/5ca8799b4f62671c250622a9/vlogin/user/getRouteReditor'
    )
  }
}

export function wordList() {
  return axios.get('https://easy-mock.com/mock/5cecd3782c9ff5043f7f0e48/manage/wordlist')
}
export function typeList() {
  return axios.get('https://www.easy-mock.com/mock/5cecd3782c9ff5043f7f0e48/manage/typeList')
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
