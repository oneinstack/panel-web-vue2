import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/profile',
    method: 'get'
  })
}

export function postInfo(data) {
  return request({
    url: '/user/profile',
    method: 'post',
    data
  })
}

export function userDelete(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function userList(data) {
  return request({
    url: '/user/list',
    method: 'get',
    params: data
  })
}

export function userUpdate(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function userCreate(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function userUpdateBatch(data) {
  return request({
    url: '/user/update_batch',
    method: 'post',
    data
  })
}
