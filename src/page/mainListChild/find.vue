<template>
  <div>
          <!-- <div class="head headh" :style="{height:heightIOS}">
        <i class="head-goback iconfont icon-jiantou7" :style="head_gobackIOS" @click="back()">
        </i>
        <section class="title-head ellipsis" :style="title_headIOS">
            <span class="title_text">{{detail.data.goodsName}}</span>
        </section>
    </div> -->
    <div class="body">
    <div v-vuet-scroll.window="{ path: 'topic-detail' }">
      <!-- <div class="swiper-container" :style="{paddingTop:paddingTop}">
        <div class="swiper-wrapper" >
          <img class="swiper-slide" v-for="(item,index) in detail.data.photos" :key="index" v-lazy="'http://image.jswl.cc/' + item.imgUrl">
        </div>
      </div> -->
      <mt-swipe :auto="0" :show-indicators="false" class="swipe">
        <mt-swipe-item v-for="(item,index) in detail.data.photos" :key="index"><img v-lazy="'http://image.jswl.cc/' + item.imgUrl"></mt-swipe-item>
      </mt-swipe>
      <div class="contant">
        <h3>{{detail.data.goodsName}}</h3>
        <p>消耗: <span>{{detail.data.score}}积分</span></p>
        <div class="text">
          <p>商品详情</p>
          <h4 v-html="detail.data.detail"></h4>
          <p>规则说明</p>
          <p v-html="detail.data.exchangeRules"></p>
          <p>兑换流程</p>
          <p v-html="detail.data.exchangeStep"></p>
        </div>
      </div>
    </div>  
    
    <div v-if="ok">
      <router-link :to="{ name: 'exchangeChild', params: { id: detail.data.goodsId, type:detail.data.exchangeType, img: detail.data.photos, score: detail.data.score, title: detail.data.goodsName } }">
        <div class="footer">
        <div class="footer-f">兑换</div>
        <div style="height: 34px;background:#FFF;" v-if="this.iphoneX()"></div>
        </div>
      </router-link>
    </div>
    <div v-if="!ok">
      <div class="footer-un">
        <div @click="isgo_()" class="footer-unf">积分不足,去赚取</div>
        <div style="height: 34px;" v-if="this.iphoneX()"></div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import '../../style/font/iconfont.css'
import { mapRules, mapModules } from 'vuet'
// import '../../plugins/swiper.min.js'
import { getStore } from '../../config/utils'
import { Swipe, SwipeItem } from 'mint-ui';
export default {
  mixins: [
      // 设置模块的更新规则
      mapRules({
        route: 'topic-detail'
      }),
      // 连接模块的状态
      mapModules({
        detail: 'topic-detail',
        list: 'topic-list'
      })
    ],
  data () {
    return {
      ok: Boolean,
    }
  },
  mounted () {
    this.fix()
  },
  created () {
  },
  updated () {
    this.init();
    this.AppTitle(this.detail.data.goodsName)
  },
  methods: {
    AppTitle(params){
          this.Title(params)
      },
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
    fix(){
      $('.body').css('height', $(window).height());
    },
    back() {
      this.$router.go(-1)
    },
    scrollTop(){
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    init(){
      var score = getStore('score')
      if(score>=Number(this.detail.data.score)){
        this.ok = true
      }else{
        this.ok = false
      }
    },
    iphoneX(){
        return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
@import '../../style/px2rem.scss';
.swipe {
  height: 250px;
  width: 100%;
  box-sizing: border-box;
}
img {
  width: 100%;
  height: 100%;
}
.contant {
  padding: px2rem(30);
  h3 {
    font-size: 18px;
    color: #111;
  }
  p {
    margin: px2rem(40) 0;
    font-size: px2rem(30);
    span {
      font-size: px2rem(40);
    }
  }
  div.text {
    &:last-child{
      margin-bottom: px2rem(150);
    }
    h4 {
      font-size: px2rem(30);
    }
    p {
      font-size: 18px;
      color: #111;
    }
  }
}
.footer {
  position: fixed;
  transform: translate3d(0, 0, 0);
  bottom: 0;
  width: 100%;
  background: #7ACCC8;
  text-align: center;
  font-size: px2rem(34);
  line-height: px2rem(100);
  .footer-f{
    color: #FFF;
    height: px2rem(100);
  }
}
.footer-un {
  background: #fff;
  color: #000;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  //height: px2rem(100);
  font-size: px2rem(34);
  line-height: px2rem(100);
  .footer-unf {
    background: #ddd;
    height: px2rem(100);
  }
}
</style>


