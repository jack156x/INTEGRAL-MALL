<template>
  <div class="container">
      <div >
        <h4 class="mainTitle" v-for="(item,index) in typeList" v-if="`${item.catName}` == '精选好物'" :key="index">{{item.catName}}</h4>
        <div class="main">
          <div class="main-ul">
            <router-link :to="{ name: 'topic-detail', params: { id: item.goodsId }}" class="mainListrouter" v-for="(item, index) in shopList" v-if="index < 4" :key="index">
                <section class="mainList">
                    <div>
                      <img v-lazy="'http://image.jswl.cc/' + item.imgUrl">
                      <p>{{item.goodsName}}</p>
                      <i>{{item.score}}积分</i>
                    </div>
                </section>
            </router-link>
            <router-link v-for="(item,index) in typeList" v-if="`${item.catName}` == '精选好物'" :key="index" :to="{ name: 'topic-list', query: { catId: item.catId } }" class="mainmore">
                <section class="mainListF" v-if="`${shopList.length}` > '4'">
                    <div>查看更多</div>
                </section>
            </router-link>
          </div>
        </div>
        <h4 class="mainTitle" v-for="(item,index) in typeList" v-if="`${item.catName}` == '话费礼券'" :key="index">{{item.catName}}</h4>
        <div class="main">
          <div class="main-ul">
            <router-link :to="{ name: 'topic-detail', params: { id: item.goodsId } }" class="mainListrouter" v-for="(item, index) in telList" v-if="index < 4" :key="index">
                <section class="mainList">
                     <div>
                      <img v-lazy="'http://image.jswl.cc/' + item.imgUrl">
                      <p>{{item.goodsName}}</p>
                      <i>{{item.score}}积分</i>
                     </div>
                </section>
            </router-link>
            <router-link v-for="(item,index) in typeList"  v-if="`${item.catName}` == '话费礼券'" :key="index" :to="{ name: 'topic-list', query: { catId: item.catId } }" class="mainmore">
                <section class="mainListF" v-if="`${telList.length}` > '4'">
                    <div>查看更多</div>
                </section>
            </router-link>
            </div>
        </div>
        <h4 class="mainTitle" v-for="(item,index) in typeList" v-if="`${item.catName}` == '游戏礼包'" :key="index">{{item.catName}}</h4>
        <div class="main">
          <div class="main-ul-last">
            <router-link :to="{ name: 'topic-detail', params: { id: item.goodsId } }" class="mainListrouter" v-for="(item, index) in gameList" v-if="index < 4" :key="index">
                <section class="mainList">
                  <div>
                    <img v-lazy="'http://image.jswl.cc/' + item.imgUrl">
                    <p>{{item.goodsName}}</p>
                    <i>{{item.score}}积分</i>
                  </div>
                </section>
            </router-link>
            <router-link v-for="(item,index) in typeList" v-if="`${item.catName}` == '游戏礼包'" :key="index" :to="{ name: 'topic-list', query: { catId: item.catId } }" class="mainmore">
                <section class="mainListF" v-if="`${gameList.length}` > '4'">
                    <div>查看更多</div>
                </section>
            </router-link>
        </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  props: ["typeList"],
  data() {
    return {
      shopList: {},
      telList: {},
      gameList: {}
    };
  },
  created() {
  },
  mounted() {
    let _this = this;
    _this.$http
      .get("http://xtan4.xtan.cc/v3.3.3/api/score/mall/goods/home", {
        params: { platformId: "1", catId: "1" }
      })
      .then(function(res) {
        _this.shopList = res.body.backdata;
      });
    _this.$http
      .get("http://xtan4.xtan.cc/v3.3.3/api/score/mall/goods/home", {
        params: { platformId: "1", catId: "3" }
      })
      .then(function(res) {
        _this.telList = res.body.backdata;
      });
    _this.$http
      .get("http://xtan4.xtan.cc/v3.3.3/api/score/mall/goods/home", {
        params: { platformId: "1", catId: "2" }
      })
      .then(function(res) {
        _this.gameList = res.body.backdata;
      });
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/px2rem.scss";
.mainTitle {
  margin-bottom: px2rem(30);
  font-size: px2rem(34);
}
.container {
  margin: 0 px2rem(30);
  padding-bottom: 15px;
  
}
.main {
    // display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
    // display: -moz-box; /* Firefox 17- */
    // display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
    // display: -moz-flex; /* Firefox 18+ */
    // display: -ms-flexbox; /* IE 10 */
    // display: flex;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-transform: translate3d(0,0,0);
    margin-bottom: px2rem(40);
    .main-ul{
      overflow-x: scroll;
      overflow-y: hidden;
      width: px2rem(1600);
    }
    .main-ul-last{
      overflow-x: scroll;
      overflow-y: hidden;
      width: px2rem(1310);
    }
    .mainmore{
      float:left;
    }
}
.mainList{
  div{
    width: px2rem(300);
    float: left;
    margin-right:10px;
    img {
        width:100%;
        height: px2rem(200);
    }
    p {
        font-size: px2rem(30);
    }
    i {
        color: #7accc8;
        font-size: px2rem(30);
    }
  }  
}
.mainListF {
    div {
        color: #FFF;
        background: #7ACCC8;
        width: px2rem(300);
        height: px2rem(200);
        font-size: px2rem(30);
        text-align: center;
        line-height: px2rem(200);
    }
}
.mainListrouter{
  display:block;
  margin-right: 10px;
}
</style>


