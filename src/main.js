import Vue from 'vue'
import App from './App.vue'

// 引入路由相关文件
import router from './router'

// 引入仓库进行注册
import store from '@/store'

// 三级联动组件---全局组件
// 定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用，无需再引入
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

// 引入elementUI组件
import { Message, MessageBox } from 'element-ui'

// 第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// // 使用按需加载的element组件,注册全局组件
// Vue.component(Message.name, Message)
// ElementUI注册组件的时候，挂载在原型上
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 引入MockServer.js----mock数据
import '@/mock/mockServer'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一接口api文件夹里面全部请求函数
import * as API from '@/api'

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入loading加载的gif图
import loadingImg from '@/assets/loading.gif'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: loadingImg
})

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'

Vue.use(myPlugins, { name: 'upper' })

// 引入表单校验插件
import '@/plugins/validate'

new Vue({
  render: (h) => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },

  // 注册路由：下面的写法KV一致省略V【router小写的】
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库：组件实例的身上会多了一个属性$store属性
  store
}).$mount('#app')
