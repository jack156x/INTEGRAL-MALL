<template>
  <div>
      <nav-top></nav-top>
      <main-list :typeList="typeList"></main-list>
      <div style="height: 34px;background:#FFF;" v-if="this.iphoneX()"></div>
  </div>
</template>
<script>
import navTop from '../home/nav'
import mainList from '../home/mainList'
export default {
  components:{
      navTop,
      mainList,
  },
  data () {
    return {
      navList: {},
      typeList: {},
    }
  },
  created(){
    let _this = this;
    _this.$http.get('http://xtan4.xtan.cc/v3.3.3/api/score/goods/cat').then(function(res){
    _this.typeList = res.body.backdata
    })
    this.AppTitle("积分商城")
  },
  mounted () {
    this.scrollTop();
  },
  beforeMount () {
  },
  updated () {
  },
  methods: {
    AppTitle(params){
          this.Title(params)
    },
    iphoneX(){
        return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    },
    scrollTop(){
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
  }
}
</script>
<style lang="scss">
</style>


