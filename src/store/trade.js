import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
  address: [],
  orderInfo: {}
}
const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}
const actions = {
  // 获取用户地址信息
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo()
    if (result.code == 200) {
      commit('GETUSERADDRESS', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 获取商品的清单数据
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo()
    if (result.code == 200) {
      commit('GETORDERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
