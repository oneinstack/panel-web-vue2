import request from '@/utils/request'

export function ftpReload() {
  return request({
    url: '/ftp/reload',
    method: 'post'
  })
}

export function ftpCreate(data) {
  return request({
    url: '/ftp/create',
    method: 'post',
    data
  })
}

export function ftpDelete(data) {
  return request({
    url: '/ftp/delete',
    method: 'post',
    data
  })
}

export function ftpUpdate(data) {
  return request({
    url: '/ftp/update',
    method: 'post',
    data
  })
}

export function ftpUpdateBatch(data) {
  return request({
    url: '/ftp/update_batch',
    method: 'post',
    data
  })
}

export function ftpList(data) {
  return request({
    url: '/ftp/list',
    method: 'get',
    params: data
  })
}

export function ftpDetail(data) {
  return request({
    url: '/ftp/detail',
    method: 'get',
    params: data
  })
}
