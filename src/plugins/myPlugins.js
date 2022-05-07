// 全局自定义指令
// Vue插件一定要暴露一个对象
let myPlugins = {}

myPlugins.install = function (Vue, options) {
  console.log(Vue, options)
}

export default myPlugins
