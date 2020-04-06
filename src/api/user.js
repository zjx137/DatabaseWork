import request from '@/utils/request'
import axios from 'axios'

const baseURL = 'http://localhost:8080'

export function login(data) {
  return axios.request({
    baseURL,
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return axios.request({
    baseURL,
    url:'/staffinfo',
    params:{
      "account":id
    },
    method:'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
