<template>
  <div>
      <div class="nav_banner">
          <div class="swiper-container">
                <div class="swiper-wrapper">
                    <router-link v-for="(value,index) in navList" :key="index" :to="'/mainListChild/' +value.href" class="swiper-slide">
                    <img v-lazy="'http://image.jswl.cc/' + value.imgUrl">
                   </router-link>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
          </div>
            <!-- <mt-swipe class="swipe" :auto="0">
            <mt-swipe-item  v-for="(value,index) in navList" :key="index">
                <router-link :to="'/mainListChild/' +value.href"><img :src="'http://image.jswl.cc/' + value.imgUrl"></router-link>
            </mt-swipe-item>
            </mt-swipe> -->
          <div class="nav_banner_r">
              <router-link :to="{path:'exchange'}">
              <div class="divT">
                  <ul>
                    <li>
                        <img src="../../images/jifen.png"><i>{{score}}</i>
                    </li>
                    <li>
                        <span>我可兑换</span>
                    </li>
                  </ul>
              </div>
              </router-link>
              <router-link :to="{ name: 'order-list', query: { type: 'orderIng' } }">
              <div class="divB"><img src="../../images/cart.png"><span>兑换记录</span></div>
              </router-link>
          </div>         
      </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import '../../plugins/swiper.min.js'
import {setStore} from '../../config/utils'
// import { Swipe, SwipeItem } from 'mint-ui'
export default {
  data () {
      return {
        navList: {},
        score: '',
        tokenStrs: '',
      }
  },
  created () {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS){
        // this.tokenStrs = "Bearer " + this.GetRequest()
        // this.tokenStrs = "Bearer 6f1d3f2e5fc36662850dbf55e1f8490d032724cb"
        this.tokenStrs = this.GetRequest()
        // this.tokenStrs = "bacc1e8ad38fd7917922aba64d9ede56631c4b7b"
        setStore("tokenStrs", this.tokenStrs)
    }else {
        this.tokenStrs = this.returnToken()
    }
  },
  mounted () {
    let _this = this;
        _this.$http.get('http://xtan4.xtan.cc/v3.3.3/api/score/mall/slide')
            .then(function(res){
                _this.navList = res.body.backdata
                _this.$nextTick(function () {
                _this.init()
                })
            })
        // _this.$http.get('http://118.190.45.84/xtan4/public/api/user/assets',{headers:{Authorization:  _this.tokenStrs ,"X-Requested-With": 'XMLHttpRequest'}}).then(function(res){
        // _this.score = res.body.backdata.score
        // setStore('score', _this.score)
        // })
        _this.$http.get("http://xtan4.xtan.cc/v3.3.3/api/user/assets?access_token="+_this.tokenStrs).then(function(res){
        _this.score = res.body.backdata.score
        setStore('score', _this.score)
        },function(err){
            MessageBox.confirm('',{
                    title: '维护通知',
                    message: '正在维护,请您稍后再试...',
                    showCancelButton: false,
                    confirmButtonText: "先去赚取积分吧",
                    // cancelButtonText: "好的"
                  })
                  .then(action => {
                    if(action == "confirm") {
                      _this.isgo_()
                    }
                  })
        })
  },
  beforeMount () {
  },
  updated () {
    // this.init()   
  },
  methods: {
      isgo_(){
            var _this = this;
            var u = navigator.userAgent;
            // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isiOS){
                // params = "any"
                this.setupWebViewJavascriptBridge(function(bridge){
                // bridge.callHandler('isgo_ios', params, function(res){})
                bridge.callHandler('ishome_ios', null)
                })
            }else {
                window.android.ishome_android()
            }
        },
      GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            if (url.indexOf("?") != -1) {  //判断是否有参数
                var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
                var strs = str.split("=");  //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
                this.tokenStrs = strs[1]
                //alert(strs[1]);     //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
            }
            return this.tokenStrs
        },
      init() {//定义滑动
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay: 1500,
                autoplayDisableOnInteraction : false,
                observer:true,
                observeParents:true,
                onSlideChangeEnd: function(swiper){ 
		            swiper.update() 
	            },
      });
      },
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/px2rem.scss';
@import '../../style/swiper.min.css';
// .mint-swipe-items-wrap {
//     -webkit-transform: translate3d(0,0,0);
// }
// .swipe {
//   -webkit-transform: translate3d(0,0,0);
//   width: px2rem(450);
//   height: px2rem(300);
//   box-sizing: border-box;
//   img {
//     vertical-align: bottom;
//     width: px2rem(450);
//     height: px2rem(300);
//   }
// }
.swiper-container * {
    -webkit-transform: translate3d(0,0,0)
}
.nav_banner {
    display: flex;
    padding: 15px;
    .swiper-container {
        -webkit-transform: translate3d(0,0,0);
        width: px2rem(450);
        height: px2rem(300);
        .swiper-wrapper{
            img {
                vertical-align: bottom;
                width: px2rem(450);
                height: px2rem(300);
            }
        }
    }
    .nav_banner_r {
        font-size: px2rem(40);
        margin-left: px2rem(20);
        div {
            background: #7ACCC8;
            color: #FFF;
            height: px2rem(180);
            width: px2rem(220);
            text-align: center;
            // padding-top: 23px;
            margin-bottom: px2rem(20);
            padding-top: 18px;
            img {
                height: 19px;
                vertical-align: middle;
            }
            i {
                font-size: 20px;
                color: #FFF;
            }
            span {
                color: #FFF;
                font-size: 14px;
            }
            
        }
        .divB {
            height: px2rem(100);
            margin-bottom: 0;
            padding-top: 0;
            line-height: px2rem(100);
            img {
                // -webkit-transform: translate3d(0,0,0);
                // transform: translate3d(0,0,0);
                position: relative;
                top: -2px;
                left: 0;
            }
        }
    }
}
</style>



