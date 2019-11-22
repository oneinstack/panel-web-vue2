import request from '@/utils/request'

export function cronReload() {
  return request({
    url: '/cron/reload',
    method: 'post'
  })
}

export function cronCreate(data) {
  return request({
    url: '/cron/create',
    method: 'post',
    data
  })
}

export function cronDelete(data) {
  return request({
    url: '/cron/delete',
    method: 'post',
    data
  })
}

export function cronUpdate(data) {
  return request({
    url: '/cron/update',
    method: 'post',
    data
  })
}

export function cronUpdateBatch(data) {
  return request({
    url: '/cron/update_batch',
    method: 'post',
    data
  })
}

export function cronList(data) {
  return request({
    url: '/cron/list',
    method: 'get',
    params: data
  })
}

export function cronDetail(data) {
  return request({
    url: '/cron/detail',
    method: 'get',
    params: data
  })
}
