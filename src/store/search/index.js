import { reqGetSearchInfo } from '@/api'
// search模块的小仓库
const state = {
  // 仓库初始状态
  searchList: {}
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  // 获取search模块数据
  async getSearchList({ commit }, params = {}) {
    // params形参：是当用户派发action的时候，第二个参数传递过来的
    let result = await reqGetSearchInfo(params)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
// 计算属性
// 项目当中getters主要的作用是：简化仓库中的数据(简化数据而生)
// 可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
  // 当前形参state，当前仓库中的state，并非大仓库中的那个state
  goodsList(state) {
    // 假如网络出现问题，服务器返回数据失败，就会是undefined，所有防止出错加上了空数组
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
