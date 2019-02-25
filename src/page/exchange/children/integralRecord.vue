<template>
  <div>
      <div>
            <!-- <div class="head headh" :style="{height:heightIOS}" >
            <router-link to="/exchange">
            <i class="head-goback iconfont icon-jiantou7" :style="head_gobackIOS">
            </i></router-link>
            <section class="title-head ellipsis" :style="title_headIOS">
                <span class="title_text">积分记录</span>
            </section>
            <router-link to="/rule"  :style="title_headIOS_right" class="title_headIOS_right">
                <section>规则</section>
            </router-link>
            </div> -->
        <section class="nav">
            <h3><i class="iconfont icon-jinbi">{{score}}</i></h3>
        </section>
        <section class="bgc"></section>
        <section>
            <ul>
                <li v-for="(item, index) in list.data" :key="index" class="recordLi">
                    <span>{{item.score}}</span>
                    <div class="text">
                        <p>{{item.scoreName}}</p><i>{{item.dateCreate}}</i>
                    </div>
                </li>
            </ul>
        </section>
    </div>
    <loading :done="list.done" :loading="list.loading" @seeing="$vuet.fetch('new-list')"></loading>
    <div style="height: 34px;background:#FFF;" v-if="this.iphoneX()"></div>
  </div>
</template>
<script>
import { getStore } from "../../../config/utils";
import { mapRules, mapModules } from "vuet";
import loading from "../../../components/common/loading.vue";
export default {
  components: {
    loading
  },
  mixins: [
    // 设置模块的更新规则
    mapRules({
      route: "new-list"
    }),
    // 连接模块的状态
    mapModules({
      list: "new-list"
    })
  ],
  data() {
    return {
      score: "",
    }
  },
  created() {
    this.score = getStore("score");
    this.AppTitle('积分记录')
  },
  methods: {
      AppTitle(params){
          this.Title(params)
      },
    iphoneX(){
        return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    },
  }
};
</script>
<style lang="scss" scoped>
@import '../../../style/mixin.scss';
@import "../../../style/px2rem.scss";
.nav {
  text-align: center;

  h3 {
    height: px2rem(120);
    line-height: px2rem(120);
    .icon-jinbi {
      font-size: px2rem(50);
    }
  }
}
.bgc {
  background: #f0f0f0;
  height: px2rem(30);
}
.recordLi {
  height: 60px;
  margin: 0 15px;
  border-bottom: 1px solid #EEE;
  span {
    float: right;
    color: #999;
    font-size: 15px;
    line-height: 60px;
  }
  div {
    padding: 12px 0;
    font-size:0;
    p {
      color: #999;
      font-size: 15px;
      display: inline;
    }
    i {
      font-size: 12px;
      color: #999;
      display: block;
    }
  }
}

</style>


