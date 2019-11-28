/**
 * Created by liweiliang 406320591@QQ.com on 2019/11/26 0026 18:23.
 */
import api from '@/api/monitor'
import { Message } from 'element-ui'
const state = {
  monitorSetObj: {}, // 监控信息
  monitorDataInfo: {} // 监控数据信息
}

const mutations = {
  /**
   * 设置监控设置信息
   */
  setMonitorSetObj: (state, data) => { state.monitorSetObj = data },
  /**
   * 设置监控数据信息
   */
  setMonitorDataInfo: (state, data) => { state.monitorDataInfo = data }
}

const actions = {
  /**
   * 获取监控信息
   * @param context
   */
  getMonitorSetting(context) {
    console.log('获取监控设置信息')
    api.getMonitorSetting().then(data => {
      if (data.result === 1) {
        console.log(data.data)
        context.commit('setMonitorSetObj', data.data)
      } else {
        console.log(JSON.stringify(data))
      }
    }).catch(error => {
      console.log(JSON.stringify(error))
    })
  },
  /**
   * 设置监控信息
   * @param context
   */
  getModifyMonitorSetting(context, params) {
    console.log('设置监控信息')
    api.getModifyMonitorSetting(params).then(data => {
      if (data.result === 1) {
        console.log(data.data)
        Message.success('设置监控信息成功')
      } else {
        console.log(JSON.stringify(data))
      }
    }).catch(error => {
      console.log(JSON.stringify(error))
    })
  },
  /** *
   * 清空监控信息
   */
  getMonitorDelete() {
    console.log('清空监控信息')
    api.getMonitorDelete().then(data => {
      if (data.result === 1) {
        Message.success('监控记录清空成功')
      } else {
        console.log(JSON.stringify(data))
      }
    }).catch(error => {
      console.log(JSON.stringify(error))
    })
  },
  /** *
   * 获取监控数据信息
   */
  getMonitorInfo(context, parmas) {
    console.log('获取监控数据信息')
    api.getMonitorInfo(parmas).then(data => {
      if (data.result === 1) {
        console.log(data)
        context.commit('setMonitorDataInfo', data.data)
      } else {
        console.log(JSON.stringify(data))
      }
    }).catch(error => {
      console.log(JSON.stringify(error))
    })
  }
}

const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
