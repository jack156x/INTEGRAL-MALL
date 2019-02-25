<template>
  <div v-vuet-scroll.window="{ path: 'topic-list' }">
      <!-- <div class="head headh" :style="{height:heightIOS}" >
          <router-link to="/" slot="left">
        <i class="head-goback iconfont icon-jiantou7" :style="head_gobackIOS">
        </i></router-link>
        <section class="title-head ellipsis" :style="title_headIOS">
            <span class="title_text">{{type=='1'?'精选好物':type=='2'?'游戏礼包':type=='3'?'话费礼券' : '我可兑换'}}</span>
        </section>
        <router-link :to="{path:'integralRecord'}" :style="title_headIOS_right" class="title_headIOS_right" v-if="!type">
                <section>积分记录</section>
        </router-link>
    </div> -->
    <div class="body">
    <div v-if="!list.anyData">
      <section style="text-align: center;margin-top:120px">
        <img src="../../images/blankhtml.png" style="height:150px;">
        <p style="font-size:15px; color: #999;">OMG，您的积分不够</p>
      </section>
    </div>
      <div>
      <ul class="loadUl" v-if="list.anyData">
       <li class="loadLi" v-for="(value, index) in list.data" :key="index"> <!-- v-if="item.tab == 'job'" -->
          <router-link :to="{ name: 'topic-detail', params: { id: value.goodsId } }">
              <img v-lazy="'http://image.jswl.cc/' + value.imgUrl">
              <h4>{{ value.goodsName }}</h4>
              <p>{{ value.score }} 积分</p>
          </router-link>
      </li>
    </ul>
    </div>
    <loading :done="list.done" :loading="list.loading" @seeing="$vuet.fetch('topic-list')"  v-if="list.anyData"></loading>
    <div style="height: 34px;background:#FFF;" v-if="this.iphoneX()"></div>
    </div>
  </div>
</template>
<script>
import loading from '../../components/common/loading.vue'
import { mapRules, mapModules } from 'vuet'
export default {
    components: {
        loading
    },
     mixins: [
      // 设置模块的更新规则
      mapRules({
        route: 'topic-list'
      }),
      // 连接模块的状态
      mapModules({
        list: 'topic-list'
      })
    ],
  data() {
    return {
      type: "",
    };
  },
  created () {
    this.AppTitle(this.$route.query.catId=='1'?'精选好物':this.$route.query.catId=='2'?'游戏礼包':this.$route.query.catId=='3'?'话费礼券' : '我可兑换')
  },
  updated () {
  },
  methods: {
    AppTitle(params){
      // params = this.type=='1'?'精选好物':this.type=='2'?'游戏礼包':this.type=='3'?'话费礼券' : '我可兑换'
          this.Title(params)
    },
    iphoneX(){
      return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    },
    fix(){
      $('.body').css('height', $(window).height());
    },
  },
  mounted () {
    this.fix();
  }
};
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
@import '../../style/px2rem.scss';
.page-infinite-loading {
    margin: 0 auto;
}
.loadUl {
    padding:15px;
    display: flex;
    flex-wrap: wrap;
    .loadLi {
        width: 47.5%;
        margin-top: px2rem(50);
        img {
            width: 100%;
            height: px2rem(220);
            vertical-align: bottom;
        }
        h4 {
            font-size: px2rem(30);
            margin-top: px2rem(30);
        }
        p {
            font-size: 15px;
            color: #7ACCC8;
            margin: px2rem(15) 0 0 0;
        }
        &:nth-child(odd){
          margin-right: px2rem(30);
        }
    }
}
</style>


