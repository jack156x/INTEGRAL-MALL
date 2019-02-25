<template>
  <div v-vuet-scroll.window="{ path: 'order-detail' }">
      <!-- <div class="head headh" :style="{height:heightIOS}">
              <router-link :to="{ name: 'order-list', query: { type: detail.data.status == 1? 'orderIng': 'complete' } }">
            <i class="head-goback iconfont icon-jiantou7" :style="head_gobackIOS">
            </i>
            </router-link>
        <section class="title-head ellipsis" :style="title_headIOS">
            <span class="title_text">订单详情</span>
        </section>
        </div> -->
    <section class="headBot">
        <div v-if="'1' == `${item.status}` && '1' != `${item.exchangeType}`" v-for="(item, index) in detail" :key="index">
            <details-ing :title="`${item.goodsName}`" :orderId="`${item.orderId}`" :img="`${item.imgUrl}`" :score="`${item.score}`" :time="`${item.dateCreate}`" :exchangInfo="item.exchangInfo"></details-ing>
        </div>
        <div v-if="'2' == `${item.status}` && '2' == `${item.exchangeType}`" v-for="(item, index) in detail" :key="index">
            <details-shoping :title="`${item.goodsName}`" :orderId="`${item.orderId}`" :img="`${item.imgUrl}`" :score="`${item.score}`" :time="`${item.dateCreate}`" :exchangInfo="item.exchangInfo" :service="item.serviceReply"></details-shoping>
        </div>
        <div v-if="'2' == `${item.status}` && '3' == `${item.exchangeType}`" v-for="(item, index) in detail" :key="index">
            <details-shoping :title="`${item.goodsName}`" :orderId="`${item.orderId}`" :img="`${item.imgUrl}`" :score="`${item.score}`" :time="`${item.dateCreate}`" :exchangInfo="item.exchangInfo"></details-shoping>
        </div>
        <div v-if="'2' == `${item.status}` && '1' == `${item.exchangeType}`" v-for="(item, index) in detail" :key="index">
            <details-game :title="`${item.goodsName}`" :orderId="`${item.orderId}`" :img="`${item.imgUrl}`" :score="`${item.score}`" :time="`${item.dateCreate}`" :exchangInfo="item.exchangInfo"></details-game>
        </div>
        <div v-if="'3' == `${item.status}` && '1' != `${item.exchangeType}`" v-for="(item, index) in detail" :key="index">
            <details-err :title="`${item.goodsName}`" :orderId="`${item.orderId}`" :img="`${item.imgUrl}`" :score="`${item.score}`" :time="`${item.dateCreate}`" :exchangInfo="item.exchangInfo"></details-err>
        </div>
    </section>
    <div style="height: 34px;background:#FFF;" v-if="this.iphoneX()"></div>
  </div>
</template>
<script>
import detailsIng from '../order/children/detailsIng.vue'
import detailsErr from '../order/children/detailsErr.vue'
import detailsShoping from '../order/children/detailsShoping.vue'
import detailsGame from '../order/children/detailsGame.vue'
import { mapRules, mapModules } from 'vuet'
export default {
    mixins: [
    // 设置模块的更新规则
    mapRules({
      route: "order-detail"
    }),
    // 连接模块的状态
    mapModules({
      detail: "order-detail"
    })
  ],
  created () {
        this.AppTitle('订单详情')
  },
    data () {
        return {
            ok: true,
        }
    },
    components: {
        detailsIng,
        detailsErr,
        detailsShoping,
        detailsGame
    },
    methods: {
         AppTitle(params){
          this.Title(params)
      },
    back() {
      this.$router.go(-1)
    },
    iphoneX(){
        return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    },
    }
}
</script>
<style lang="scss" scoped>
</style>


