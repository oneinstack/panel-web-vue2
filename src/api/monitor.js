import request from '@/utils/request'

export function getInfo(data) {
  return request({
    url: '/monitor/info',
    method: 'get',
    data
  })
}
