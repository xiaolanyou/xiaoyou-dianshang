import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'

const state = {
  // 详情页数据
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}
const mutations = {
  GETGOODSINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const actions = {
  // 获取产品信息的action
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    console.log(commit)
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 代表服务器加入购物车成功
    if (result.code === 200) {
      return 'ok'
    } else {
      // 代表加入购物车失败
      return Promise.reject(new Error('faile'))
    }
  }
}
// 简化数据而生
const getters = {
  // 简化路径导航的数据
  categoryView(state) {
    // 当前计算出的 categoryView属性值至少是一个空对象，假的报错不会有哦
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息的数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  // 简化产品售卖属性的数据
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
