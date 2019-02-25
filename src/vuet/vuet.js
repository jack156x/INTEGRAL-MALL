import Vue from 'vue'
import Vuet from 'vuet'
import {getStore} from '../config/utils'
Vue.use(Vuet)
const vuet = new Vuet({
  data () {
    return {
      loading: true, // 请求中
      loaderr: false // 请求失败
    }
  },
  pathJoin: '-', // 父子模块的连接路径
  modules: {
    topic: {
      list: {
        routeWatch: 'query',  // 定义页面的更新规则
        data () {
          return {
            loading: true, // 数据正在加载中
            done: false, // 数据是否已经全部加载完成
            data: [], // 列表存储的数据
            page: 1,
            long: false,
            catId: null,
            anyData: 1,
          }
        },
        async fetch ({ state, route, params, path }) {
          if (params.routeWatch === true) { // 路由发生了变化，重置模块状态
            this.reset(path)
          }else if (params.routeWatch === false) { // 路由没有变化触发的请求，可能是从详情返回到列表
            return {
            }
          }
          if(state.long){
            return
          }
          // var token = this.vm.returnToken()
          var tokenStrs = '';
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if(isiOS){
              tokenStrs = getStore("tokenStrs");
              // this.tokenStrs = "Bearer ac05f7d07087c5cffd154a1f075e01c7916b0357"
              // alert(this.tokenStrs)
          }else {
              tokenStrs = this.vm.returnToken()
          }
          let catId=route.query.catId
          if (route.query.catId) {
            const res= await this.vm.$http.get(`http://xtan4.xtan.cc/v3.3.3/api/score/goods/List?access_token=${tokenStrs}&platformId=1&catId=${catId}&page=${state.page}` ,
            // {headers: {
            //   Authorization : tokenStrs, "X-Requested-With": 'XMLHttpRequest'       
            // }}
            )
            const data =  params.routeWatch ? res.body.backdata.data:[...state.data, ...res.body.backdata.data]
            if(res.body.backdata.next_page_url == null){
              state.long = true
            }
            return {
              catId,
              data,
              loading: false,
              page: ++state.page,
              done:res.body.backdata.next_page_url == null
            }
          }else {
            const res= await this.vm.$http.get(`http://xtan4.xtan.cc/v3.3.3/api/score/canExchenge/goods?access_token=${tokenStrs}&platformId=1&page=${state.page}` ,
            // {headers: {
            //   Authorization : tokenStrs,"X-Requested-With": 'XMLHttpRequest'
            // }}
            )
            const data =  params.routeWatch ? res.body.backdata.data:[...state.data, ...res.body.backdata.data]
            if(res.body.backdata.next_page_url == null){
              state.long = true
            }
            if(data == '') {
              state.anyData = false
            }else {
              state.anyData = true
            }
            return {
              data,
              loading: false,
              page: ++state.page,
              done:res.body.backdata.next_page_url == null
            }
          }
        },
      },
      detail: {
        routeWatch: 'params.id', // 定义页面的更新规则
        data () {
          return {
            data: {
            },
          }
        },
        async fetch ({ route }) {
          const res= await this.vm.$http.get(`http://xtan4.xtan.cc/v3.3.3/api/score/goods?platformId=1&goodsId=${route.params.id}`)
          const data = res.body.backdata
          return {
            data,
          }
        }
      }
    },
    order: {
      list: {
        routeWatch: 'query',  // 定义页面的更新规则
        data () {
          return {
            loading: true, // 数据正在加载中
            done: false, // 数据是否已经全部加载完成
            data: [], // 列表存储的数据
            page: 1,
            long: false,
            type: [
              {
                label: '兑换中',
                value: 'orderIng',
                type:0
              },
              {
                label: '兑换完成',
                value: 'complete',
                type:1
              }
            ],
            anyData: Boolean,
          }
        },
        async fetch ({ state, route, params, path }) {
          // const { type = '' } =route
          if (params.routeWatch === true) { // 路由发生了变化，重置模块状态
            this.reset(path)
          }else if (params.routeWatch === false) { // 路由没有变化触发的请求，可能是从详情返回到列表
            return {
            }
          }
          if(state.long){
            return
          }
          var tokenStrs = '';
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if(isiOS){
              tokenStrs = getStore("tokenStrs");
              // this.tokenStrs = "Bearer ac05f7d07087c5cffd154a1f075e01c7916b0357"
              // alert(this.tokenStrs)
          }else {
              tokenStrs = this.vm.returnToken()
          }
          // var token = this.vm.returnToken()
          let type = route.query.type
          const res= await this.vm.$http.get(`http://xtan4.xtan.cc/v3.3.3/api/score/orders?access_token=${tokenStrs}&status=${type}&page=${state.page}` ,
          // {headers: {
          //   Authorization : tokenStrs
          // }}
          )
          const data =  params.routeWatch ? res.body.backdata.data:[...state.data, ...res.body.backdata.data]
          // console.log(data=='')
          if(res.body.backdata.next_page_url == null){
            state.long = true
          }
          if(data == '') {
            state.anyData = false
          }else {
            state.anyData = true
          }
          // console.log(res.body.backdata.next_page_url == null)
          return {
            data,
            loading: false,
            page: ++state.page,
            done:res.body.backdata.next_page_url == null
          }
        },
      },
      detail: {
        routeWatch: 'params.id', // 定义页面的更新规则
        data () {
          return {
            data: {
            }
          }
        },
        async fetch ({ route }) {
          var tokenStrs = '';
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if(isiOS){
              tokenStrs = getStore("tokenStrs");
              // this.tokenStrs = "Bearer ac05f7d07087c5cffd154a1f075e01c7916b0357"
              // alert(this.tokenStrs)
          }else {
              tokenStrs = this.vm.returnToken()
          }
          const res= await this.vm.$http.get(`http://xtan4.xtan.cc/v3.3.3/api/score/order?access_token=${tokenStrs}&orderId=${route.params.id}` ,
          // {headers: {
          //   Authorization : tokenStrs
          // }}
          )
          const data =  res.body.backdata
          return {
            data
          }
        }
      }
    },
    new: {
      list: {
        routeWatch: 'query',  // 定义页面的更新规则
        data () {
          return {
            loading: true, // 数据正在加载中
            done: false, // 数据是否已经全部加载完成
            data: [], // 列表存储的数据
            page: 1,
            long: false,
            anyData: true,
          }
        },
        async fetch ({ state, route, params, path }) {
          // const { type = '' } =route
          if (params.routeWatch === true) { // 路由发生了变化，重置模块状态
            this.reset(path)
          }else if (params.routeWatch === false) { // 路由没有变化触发的请求，可能是从详情返回到列表
            return {
            }
          }
          if(state.long){
            return
          }
          var tokenStrs = '';
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if(isiOS){
              tokenStrs = getStore("tokenStrs");
              // this.tokenStrs = "Bearer ac05f7d07087c5cffd154a1f075e01c7916b0357"
              // alert(this.tokenStrs)
          }else {
              tokenStrs = this.vm.returnToken()
          }
          // var token = this.vm.returnToken()
          const res= await this.vm.$http.get(`http://xtan4.xtan.cc/v3.3.3/api/score/log?access_token=${tokenStrs}&page=${state.page}` ,
          // {headers: {
          //   Authorization : tokenStrs, "X-Requested-With": 'XMLHttpRequest'
          // }}
          )
          const data =  params.routeWatch ? res.body.backdata.data:[...state.data, ...res.body.backdata.data]
          if(res.body.backdata.next_page_url == null){
            state.long = true
          }
          if(res.body.backdata.data == '') {
            state.anyData = false
          }
          // console.log(res.body.backdata.next_page_url == null)
          return {
            data,
            loading: false,
            page: ++state.page,
            done:res.body.backdata.next_page_url == null
          }
        },
      },
    }
  }
}) 
vuet.beforeEach(({ path, params, state }) => {
  state.loading = true
  state.loaderr = false
})

vuet.afterEach((err, { path, params, state }) => {
  state.loading = false
  state.loaderr = !!err
})

export default vuet