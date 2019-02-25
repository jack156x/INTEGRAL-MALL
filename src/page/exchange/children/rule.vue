<template>
  <div>
      <div>
        <section class="content">
            <section v-for="(item, index) in html " :key="index" class="main">
                <h4 v-html="item.question"></h4>
                <div v-html="item.answer"></div>
            </section>
        </section>
    </div>
    <div style="height: 34px;background:#FFF;" v-if="this.iphoneX()"></div>
  </div>
</template>
<script>
export default {
  data () {
        return {
            html: [],
        }
  },
  created () {
      this.AppTitle('积分规则')
    let _this = this;
    _this.$http.get('http://xtan4.xtan.cc/v3.3.3/api/question?questionType=3')
        .then(function(res){
            _this.html = res.body.backdata
        })
  },
  methods: {
       AppTitle(params){
          this.Title(params)
      },
        iphoneX(){
        return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin.scss';
@import '../../../style/px2rem.scss';
.content {
    .main {
        font-size: 16px;
        margin: 15px 0;
        border-top: 1px solid #EEE;
        padding: 0 15px;
        margin-bottom: 10px;
        &:first-child {
            border: 0;
        }
        h4 {
            font-size: 16px;
            margin: 15px 0;
        }
    }
}
</style>


