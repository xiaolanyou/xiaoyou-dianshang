// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)
// 引入store
import store from '@/store'

// 引入路由配置信息
import routes from './routes'

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转(传递哪些参数)
// 第二个参数：成功的回调
// 第三个参数：失败的回调
// call || apply 的区别
// 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

// 配置路由
let router = new VueRouter({
  // 配置路由
  routes,
  // 滚动行为
  scrollBehavior() {
    // console.log(to, from, savedPosition)
    return { y: 0 }
  }
})

// 全局守卫：前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
  next()
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo.name
  if (token) {
    // 用户已经登录
    if (to.path == '/login') {
      next('/home')
    } else {
      // 登录了，但去的不是login
      if (name) {
        next()
      } else {
        // 没有用户信息，派发action
        try {
          // 获取用户信息成功
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          console.log(error.message)
          // token失效了获取不到用户信息
          // 清除token
          await store.dispatch('userLogout')
          next()
        }
      }
    }
  } else {
    // 未登录：不能去的页面
    let toPath = to.path
    let arrPath = ['/trade', '/pay', '/center/myorder', '/shopcart', '/paysuccess']
    if (arrPath.indexOf(toPath) != -1) {
      next('/login?redirect=' + toPath)
    } else {
      // 去的不是上面数组里路由就放行
      next()
    }
  }
})

export default router
