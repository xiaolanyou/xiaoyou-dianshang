import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'

const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  // 获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    console.log(commit)
    let result = await reqDeleteCartById(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 修改购物车某一个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    console.log(commit)
    let result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 删除全部勾选的产品
  deleteAllCheckedCart(context) {
    // context：仓库
    let { dispatch, getters } = context
    let PromiseAll = []
    // 获取购物车中全部的产品
    getters.cartList.cartInfoList.forEach((item) => {
      if (item.isChecked == 1) {
        let promise = dispatch('deleteCartListBySkuId', item.skuId)
        // 将每一次返回的Promise添加到数组当中
        PromiseAll.push(promise)
      }
    })
    // 只要全部的p1|p2...都成功，返回结果即为成功
    // 只要有一个失败，返回即为失败结果
    return Promise.all(PromiseAll)
  },
  // 修改全部产品的状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
      promiseAll.push(promise)
    })
    // 最终返回的结果
    return Promise.all(promiseAll)
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
