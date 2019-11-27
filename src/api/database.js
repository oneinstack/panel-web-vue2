import request from '@/utils/request'

export function databaseReload() {
  return request({
    url: '/database/reload',
    method: 'post'
  })
}

export function databaseCreate(data) {
  return request({
    url: '/database/create_db',
    method: 'post',
    data
  })
}

export function databaseUserCreate(data) {
  return request({
    url: '/database/create_user',
    method: 'post',
    data
  })
}

export function databaseDelete(data) {
  return request({
    url: '/database/delete_db',
    method: 'post',
    data
  })
}

export function databaseUserDelete(data) {
  return request({
    url: '/database/delete_user',
    method: 'post',
    data
  })
}

export function databaseUserUpdate(data) {
  return request({
    url: '/database/update_user',
    method: 'post',
    data
  })
}

export function databaseList(data) {
  return request({
    url: '/database/list_db',
    method: 'get',
    params: data
  })
}

export function databaseUserList(data) {
  return request({
    url: '/database/list_user',
    method: 'get',
    params: data
  })
}

export function databaseDetail(data) {
  return request({
    url: '/database/detail_db',
    method: 'get',
    params: data
  })
}

export function databaseUserDetail(data) {
  return request({
    url: '/database/detail_user',
    method: 'get',
    params: data
  })
}
