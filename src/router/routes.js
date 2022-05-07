// 路由配置信息
export default [
  {
    path: '/center',
    component: () => import('@/pages/Center'),
    meta: { show: true },
    // 二级路由组件
    children: [
      {
        path: 'myorder',
        component: () => import('@/pages/Center/myOrder')
      },
      {
        path: 'grouporder',
        component: () => import('@/pages/Center/groupOrder')
      },
      // 二级路由重定向
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  {
    path: '/paysuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { show: true }
  },
  {
    path: '/pay',
    component: () => import('@/pages/Pay'),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        if (from.path == '/login') {
          next('/home')
        } else {
          next(false)
        }
      }
    }
  },
  {
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        if (from.path == '/login') {
          next('/home')
        } else {
          next(false)
        }
      }
    }
  },
  {
    path: '/shopcart',
    component: () => import('@/pages/ShopCart'),
    meta: { show: true }
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/pages/AddCartSuccess'),
    meta: { show: true }
  },
  {
    path: '/detail/:skuId',
    component: () => import('@/pages/Detail'),
    meta: { show: true }
  },
  {
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: { show: true }
  },
  {
    path: '/search/:keyword?',
    component: () => import('@/pages/Search'),
    meta: { show: true },
    name: 'search'
    //路由组件能不能传递props数据？
    // 1.布尔值写法：params
    // props: true
    // 2.对象写法：额外的给路由组件传递一些props
    // props: { a: 1, b: 2 }
    // 3.函数写法(常用): 可以params参数、query参数，通过props传递给路由组件
    // props: ($route) => {
    //   return { keyword: $route.params.keyword, k: $route.query.k }
    // }
    // 简写
    // props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
  },
  {
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: { show: false }
  },
  {
    path: '/register',
    component: () => import('@/pages/Register'),
    meta: { show: false }
  },
  // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
  {
    path: '/',
    redirect: '/home'
  }
]
