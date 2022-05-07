<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑，带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x"
              v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x"
              v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x"
              v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTradeMark">×</i></li>
            <!-- 平台的售卖的属性值展示 -->
            <li class="with-x"
              v-for="(attrValue,index) in searchParams.props"
              :key="index">{{attrValue.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo='trademarkInfo'
          @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{active:isOne}"
                  @click="changeOrder('1')">
                  <a>综合 <span v-show="isOne"
                      :class="['iconfont', isAsc ?'icon-xiangshangjiantoucuxiao':'icon-xiangxiajiantoucuxiao']"></span></a>
                </li>
                <li :class="{active:isTwo}"
                  @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo"
                      class='iconfont'
                      :class="{'icon-xiangshangjiantoucuxiao':isAsc,'icon-xiangxiajiantoucuxiao':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="
                      goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5"
                v-for="(good) in goodsList"
                :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>

                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp;</em>
                      <i>&nbsp;{{(good.price || 0.00).toFixed(2)}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);"
                      class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data() {
    return {
      // 带给服务器参数
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        order: '1:desc',
        pageNo: 1,
        pageSize: 3,
        props: [],
        trademark: ''
      }
    }
  },
  // 当组件挂载完毕之前执行一次【在mounted之前】
  beforeMount() {
    // Object.assign：ES6新增的语法，合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  // 组件挂载完毕执行一次【仅仅执行一次】
  mounted() {
    this.getData()
  },
  computed: {
    // 获取search模块展示产品一共多少数据
    ...mapState({
      total: state => state.search.searchList.total
    }),
    // mapGetters里面的写法：传递的数组，因为getters计算是没有划分模块
    ...mapGetters(['goodsList']),
    isOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    }
  },
  methods: {
    // 向服务器发送请求获取search模块数据(根据参数不同返回不同的数据进行展示)
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 删除分类的名字
    removeCategoryName() {
      // 把带给服务器的参数置空了，还需要向服务器发请求
      // 带给服务器参数说明可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器
      // 但是你把相应的字段变为undefined，当前这个字段不会带给服务器
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData()
      // 地址栏也需要修改：进行路由跳转
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    // 删除关键字
    removeKeyword() {
      // 给服务器带的参数searchParams的keyword置空
      this.searchParams.keyword = undefined
      // 再次发请求
      this.getData()
      // 通知兄弟组件Header清除关键字
      this.$bus.$emit('clear')
      // 进行路由的跳转
      this.$router.push({ name: 'search', query: this.$route.query })
    },
    // 自定义事件回调
    trademarkInfo(trademark) {
      console.log('---', trademark)
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getData()
    },
    // 删除品牌的信息
    removeTradeMark() {
      // 将品牌信息置空
      this.searchParams.trademark = undefined
      // 再次发送请求
      this.getData()
    },
    // 收集平台属性地方的回调函数
    attrInfo(attr, attrValue) {
      console.log(attr, attrValue)
      // 参数格式整理好
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 数组去重
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props)
      }
      // 再次发请求
      this.getData()
    },
    // 删除售卖的属性
    removeAttr(index) {
      // 删除点击的数组元素
      this.searchParams.props.splice(index, 1)
      // 再次发请求
      this.getData()
    },
    // 排序的操作
    changeOrder(flag) {
      // let originOrder = this.searchParams.order
      // 获取到的是最开始的状态
      let originFlag = this.searchParams.order.split(':')[0]
      let originSort = this.searchParams.order.split(':')[1]
      // 准备一个新的order属性值
      let newOrder = ''
      // 点击的是综合
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == 'desc' ? 'asc' : 'desc'}`
      } else {
        // 点击的是价格
        newOrder = `${flag}:${'desc'}`
      }
      // 将新的order赋予searchParams
      // console.log(newOrder)
      this.searchParams.order = newOrder
      // 再次发请求
      this.getData()
    },
    // 自定义事件的回调函数---获取当前第几页
    getPageNo(pageNo) {
      // console.log(pageNo)
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  // 数据监听
  watch: {
    // 监听属性路由的信息是否发生变化
    $route() {
      // 再次发请求之前整理带给服务器参数
      // Object.assign合并对象，合并到searchParams上
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // 再次发起ajax请求
      this.getData()
      // 每一次请求完毕，应该把相应的1、2、3级分类的id置空
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 0.625rem 0;

  .py-container {
    width: 75rem;
    margin: 0 auto;

    .bread {
      margin-bottom: 0.3125rem;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 0.1875rem 0.9375rem;
        margin: 0;
        font-weight: 400;
        border-radius: 0.1875rem;
        float: left;

        li {
          display: inline-block;
          line-height: 1.125rem;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -0.3125rem;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 0.3125rem 0 0;
        margin-bottom: 1.125rem;
        float: left;

        .with-x {
          font-size: 0.75rem;
          margin: 0 0.3125rem 0.3125rem 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 0.4375rem;
          height: 1.25rem;
          line-height: 1.25rem;
          border: 0.0625rem solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 0.625rem;
            cursor: pointer;
            font: 400 0.875rem tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 0.3125rem;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 2.5rem;
          padding-right: 1.25rem;
          background: #fbfbfb;
          border: 0.0625rem solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 0.625rem 0 0;

            li {
              float: left;
              line-height: 1.125rem;

              a {
                display: block;
                cursor: pointer;
                padding: 0.6875rem 0.9375rem;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 1.25rem 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 0.625rem;
            line-height: 1.75rem;

            .list-wrap {
              .p-img {
                padding-left: 0.9375rem;
                width: 13.4375rem;
                height: 15.9375rem;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 0.9375rem;
                font-size: 1.125rem;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -0.3125rem;
                  }
                }
              }

              .attr {
                padding-left: 0.9375rem;
                width: 85%;
                overflow: hidden;
                margin-bottom: 0.5rem;
                min-height: 2.375rem;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 0.9375rem;
                height: 1.375rem;
                font-size: 0.8125rem;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 0.75rem 0.9375rem;

                .sui-btn {
                  display: inline-block;
                  padding: 0.125rem 0.875rem;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 0.75rem;
                  line-height: 1.125rem;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 0.9375rem;
                }

                .btn-bordered {
                  min-width: 5.3125rem;
                  background-color: transparent;
                  border: 0.0625rem solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 0.0625rem solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 0.0625rem solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 0.0625rem solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 45.8125rem;
        height: 4.125rem;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 1.125rem 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 30.625rem;
            float: left;

            li {
              line-height: 1.125rem;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 1.125rem;
                text-decoration: none;
                background-color: #fff;
                border: 0.0625rem solid #e0e9ee;
                margin-left: -0.0625rem;
                font-size: 0.875rem;
                padding: 0.5625rem 1.125rem;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -0.0625rem;
                  position: relative;
                  float: left;
                  line-height: 1.125rem;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 0.875rem;
                  border: 0;
                  padding: 0.5625rem 1.125rem;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 0.875rem;
            float: right;
            width: 15.0625rem;
          }
        }
      }
    }
  }
}
</style>