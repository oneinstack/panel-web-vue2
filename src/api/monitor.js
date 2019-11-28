/**
 * Created by liweiliang 406320591@QQ.com on 2019/11/26 0026 18:16.
 */
import axios from '@/utils/request'

/**
 * 处理POST请求
 * @param url
 * @param params
 */

export function fetch(url, params) {
  if (!params) {
    params = {}
  }
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 处理GET
 * @param url
 */

export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params }).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    }).catch(error => {
      reject(error)
    })
  })
}

export default {
  /**
   * 获取监控信息
   * @param params
   */
  getMonitorSetting: params => fetchGet('/monitor/setting', params),
  /**
   * 更改监控设置
   * @param params
   */
  getModifyMonitorSetting: params => fetch('/monitor/setting', params),
  /**
   * 清空监控信息
   * @param params
   */
  getMonitorDelete: params => fetch('/monitor/delete', params),
  /**
   * 获取监控数据信息
   * @param params
   */
  getMonitorInfo: params => fetchGet('/monitor/info', params)

}

