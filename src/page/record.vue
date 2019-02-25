<template>
  <div v-vuet-scroll.window="{ path: 'order-list' }">
    <div class="body">
    <section>
    <ul >
      <li v-for="(item, index) in list.type" :key="index" @click="hover($event)">
        <router-link :to="{ name: 'order-list', query: { type: item.value } }" class="boom" :class="{hover: type==item.value}" :data="`${item.value}`">{{ item.label }}</router-link>
      </li>
    </ul>
    </section>
    <div v-if="!list.anyData">
      <section style="text-align: center;margin-top:120px">
        <img src="../images/blankhtml.png" style="height:150px;">
        <p style="font-size:15px; color: #999;">OMG，还没有兑换记录</p>
      </section>
    </div>
    <transition name="fold" mode="in-out" v-if="list.anyData">
        <div>
        <section class="bgc" v-for="(item, index) in list.data" :key="index">
            <div class="contant">
              <router-link :to="{ name: 'order-detail', params: { id: item.orderId }}">
                <div>
                    <span v-if="`${item.status}` == '1'">兑换中</span>
                    <span v-else-if="`${item.status}` == '2'">兑换成功</span>
                    <span v-else>兑换失败</span>
                    <i>订单号: {{ item.orderId }}</i>
                </div>
                <div class="smImg">
                    <img v-lazy="'http://image.jswl.cc/'+item.imgUrl">
                    <div>
                        <p>{{ item.goodsName }}</p>
                        <i>消耗积分: {{ item.score }}积分</i>
                    </div>
                </div>
              </router-link>
            </div>
        </section>
    </div>        
    </transition>
    <loading :done="list.done" :loading="list.loading" @seeing="$vuet.fetch('order-list')" v-if="list.anyData"></loading>
    <div style="height: 34px;background:#FFF;" v-if="this.iphoneX()"></div>
    </div>
  </div>
</template>
<script>
import loading from "../components/common/loading.vue";
import { mapRules, mapModules } from "vuet";
export default {
  mixins: [
    // 设置模块的更新规则
    mapRules({
      route: "order-list"
    }),
    // 连接模块的状态
    mapModules({
      list: "order-list"
    })
  ],
  data() {
    return {
      type: 'orderIng',
    };
  },
  created () {
    this.AppTitle("兑换记录")
  },
  components: {
    loading
  },
  methods: {
    fix(){
      $('.body').css('height', $(window).height());
    },
    AppTitle(params){
          this.Title(params)
      },
    hover(event) {
      this.type = event.target.getAttribute("data");
    },
    iphoneX(){
        return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    },
  },
  mounted() {
    this.fix();
    this.type = this.$route.query.type
  },
};
</script>
<style lang="scss" scoped>
@import '../style/mixin.scss';
@import "../style/px2rem.scss";
ul {
  display: flex;
  font-size: 0.64rem;
  flex-wrap: nowrap;
  justify-content: space-around; // border-bottom: 1px solid #DDD;
  li {
    color: #333; // font-weight: bold;
    padding: px2rem(23) 0;
    position: relative;
    top: 1px;
    width: 50%;
    text-align: center;
    .boom {
      padding: px2rem(20) px2rem(100);
    }
  }
}
.hover {
  border-bottom: 2px solid #7ACCC8;
}
.fold-enter-active {
  animation-name: fold-in;
  animation-duration: 0.5s;
}
.fold-leave-active {
  animation-name: fold-out;
  animation-duration: 0.5s;
}
@keyframes fold-in {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fold-out {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
.bgc {
  background: #f0f0f0;
  padding-top: px2rem(30);
  div.contant {
    padding: px2rem(30);
    background: #fff;
    div {
      span {
        font-size: px2rem(30);
        float: right;
        line-height: px2rem(70);
      }
      i {
        font-size: px2rem(30);
      }
    }
    div.smImg {
      display: flex;
      margin-top: px2rem(30);
      img {
        width: px2rem(150);
        height: px2rem(100);
        vertical-align: bottom;
      }
      div {
        margin-left: px2rem(20);
        p {
          font-size: px2rem(30);
        }
        i {
          font-size: px2rem(24);
          color: #ccc;
        }
      }
    }
  }
}
</style>


