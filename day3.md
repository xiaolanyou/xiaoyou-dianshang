复习： 1)商品分类的三级列表由静态变为动态形式【获取服务器数据：解决跨域问题】 2)函数防抖与节流【面试频率很好】 3)路由跳转：声明式导航(router-link)、编程式导航
编程式导航解决这个问题：自定义属性

1)开发 Search 模块中的 TypeNav 商品分类菜单(过渡动画效果)
过渡动画：前提组件|元素务必要有 v-if|v-show 指令才可以进行过渡动画

2)现在咱们的商品分类三级列表要进行优化？
在 App 根组件当中发请求【根组件 mounted】执行一次

3)合并 params 参数与 query 参数

4)开发 Home 首页当中的 ListContainer 组件与 Floor 组件？
但是这里需要知道一件事情：服务器返回的数据(接口)只有商品分类菜单分类数据，对于 ListContainer 组件与 Floor 组件数据服务器没有提供的。
mock 数据(模拟)：如果你想 mock 数据，需要用到一个插件 mockjs

使用步骤： 1)在项目当中 src 文件夹中创建 mock 文件夹 2)第二步准备 JSON 数据(mock 文件夹中创建相应的 JSON 文件) ----格式化一下(使用 Prettier 格式化)，别留空格(不然跑不起的) 3)把 mock 数据需要的图片放置到 public 文件夹中【public 文件夹在打包的时候，会把相应的资源原封不动打包到 dist 文件夹中】 4)创建 mockServer.js 通过 mockjs 插件实现模拟数据
5)mockServer.js 文件在入口文件中引入(至少需要执行一次，才能模拟数据)

6)ListContainer 组件开发重点？
安装 Swiper 插件，这里安装的是swiper@5.4.5
cnpm install --save swiper@5.4.5

7)swiper 插件：经常制作轮播图(移动端|PC 端)
使用步骤：
第一步：引入相应的依赖包
第二步：页面中的结构务必要有
第三步：初始化 swiper 实例，给轮播图添加动态效果

8)最完美的解决方案，解决轮播图问题。
watch + $nextTick：数据监听 + 监听已有数据变化
$nextTick: 在下次 DOM 更新，循环结束之后，执行延迟回调。在修改数据之后，立即使用这个方法，获取更新后的 DOM
$nextTick: 可以保证页面中的结构一定是有的，经常和很多插件一起使用【都需要 DOM 存在了】

9.开发 floor 组件
切记：仓库当中的 state 的数据格式取决于服务器返回的数据
9.1：getFloorList 这个 action 在哪里触发，是需要在 Home 路由组件当中发的，不能在 Floor 组件内部发 action，因为我们需要 v-for 遍历 floor 组件

9.2v-for 也可以在自定义标签(组件)当中使用

9.3 组件通信的方式有哪些？面试频率极高
props：用于父子组件通信
自定义事件：@on @emit 可以实现子给父通信
全局事件总线：$bus 全能
pubsub-js：在 react 当中用，vue 当中几乎不用 (全能)
插槽
vuex

10.把首页当中轮播图拆分为一个共用全局组件。
切记：以后在开发项目的时候，如果看到某一个组件在很多地方都使用，你把它变成全局组件，
注册一次，可以在任意地方使用，共用的组件|非路由组件放到 components 文件夹中

11.Search 模块开发？
1：先写静态页面 + 静态组件拆分出来
2：发请求(API)
3：vuex(三连环)
4：组件获取仓库数据，动态展示数据
