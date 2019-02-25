<template>
  <div>
    <div class="body">
    <section v-if="type ==1">
      <img v-lazy="'http://image.jswl.cc/' + item.imgUrl" v-for="(item, index) in this.$route.params.img" :key="index" v-if="`${item.imgType}` == '1'">    
      <p>{{this.$route.params.title}}</p>
      <i>消耗积分: {{this.$route.params.score}}积分</i>
    </section>
    <section v-if="type ==3" class="tel">
      <div>联系/邮箱:
        <input type="text" placeholder="请输入您的电话/邮箱" v-model="userList.tel" name="tel" :value="userList.tel">
        <span>
        <img v-lazy="'http://image.jswl.cc/' + item.imgUrl" v-for="(item, index) in this.$route.params.img" :key="index" v-if="`${item.imgType}` == '1'">
        </span>    
      <p>{{this.$route.params.title}}</p>
      <i>消耗积分: {{this.$route.params.score}}积分</i>
      </div>
    </section>
    <section v-if="type ==2">
      <form class="form">
        <div>
        <label for="name">姓名:</label>
        <input type="text" id="name" v-model="userList.name" name="name">
        </div>
        <div>
        <label for="name">联系电话:</label>
        <input type="tel" id="tel" v-model="userList.tel" name="tel">
        </div>
        <div>
        <label for="name">所在地址:</label>
        <input type="text" id="Province" v-model="Province" @click="show" readonly name="Province">
        <!-- <i class="iconfont icon-jiantou-copy"></i> -->
        </div>
        <div>
        <label for="name">详细地址:</label>
        <input type="text" id="detailedAddress" v-model="userList.detailedAddress" name="detailedAddress">
        </div>
      </form>
      <div>
          <arr-city v-if="showChose"></arr-city>
      </div>
      <img v-lazy="'http://image.jswl.cc/' + item.imgUrl" v-for="(item, index) in this.$route.params.img" :key="index" v-if="`${item.imgType}` == '1'">    
      <p>{{this.$route.params.title}}</p>
      <i>消耗积分: {{this.$route.params.score}}积分</i>
    </section>
    </div>
    <div class="footer" @click="alertY(type)" v-if="ok" id="footer">
        <div class="footer-f">兑换</div>
        <div style="height: 34px;background:#FFF;" v-if="this.iphoneX()"></div>
    </div>
    <div v-if="!ok">
      <div class="footer-un" id="footer">积分不足,去赚取</div>
    </div>
  </div>
</template>
<script>
import { MessageBox, Indicator, Toast } from 'mint-ui';
import { mapRules, mapModules } from 'vuet'
import arrCity from '../mainListChild/arrCity.vue'
import { setStore, getStore } from '../../config/utils'
export default {
  components:{
      arrCity,
  },
  mixins: [
      // 设置模块的更新规则
      mapRules({
        route: 'topic-detail'
      }),
      // 连接模块的状态
      mapModules({
        detail: 'topic-detail'
      })
    ],
  data () {
    return {
      money: 111,
      ok: Boolean,
      type: null,
      userList: {
        tel: "",
        name: "",
        detailedAddress: ""
      },
    }
  },
  watch: {
  },
  created () {
    this.AppTitle('兑换商品')
  },
    mounted () {
    this.$store.state.Province = getStore('userProvince')
    this.init();
    this.none();
    this.fix()
    this.type = this.$route.params.type;
    this.userList.tel = getStore("userTel")
    this.Province = getStore("userProvince")
    this.userList.name = getStore("userName")
    this.userList.detailedAddress = getStore("userDAddress")
  },
  computed: {
    showChose () {
	    return this.$store.state.showChose
    },
    Province : {
      set: function(val){
      },
      get: function(){
        return this.$store.state.Province
      }
    }
  },
  methods: {
    AppTitle(params){
          this.Title(params)
      },
    fix(){
      $('.body').css('height', $(window).height());
    },
    back(){
      this.$router.go(-1)
    },
    showfalse(){
        this.$store.commit('changefalse')
    },
    show(){
        this.$store.commit('change')
    },
    none(){
      var h=$(window).height();
      $(window).resize(function() {
        if($(window).height()<h){
          $('.footer').hide();
        }
        if($(window).height()>=h){
        $('.footer').show();
            }
    });
    },
    init(){
      if(1){
        this.ok = true;
      }else{
        this.ok =false;
      }
    },
    iphoneX(){
        return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    },
    copy(code) {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isiOS){
        this.setupWebViewJavascriptBridge(function(bridge){
                // bridge.callHandler('isgo_ios', params, function(res){})
                bridge.callHandler('isCopy_ios', code)
                })
        }else {
            window.android.isCopy_android(code)
        }
    },
    alertY(type) {
      var tokenStrs = '';
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if(isiOS){
          tokenStrs = getStore("tokenStrs");
      }else {
          tokenStrs = this.returnToken()
      }
      let vt = this.type;
    if(vt == 1){
     let vm = this.value;
     MessageBox.confirm('确定执行此操作?',{
        title: '提示',
        showCancelButton: true
     }).then(action => {
          if (action == 'confirm') {
              Indicator.open();
              let _this = this;
              _this.$http.post('http://xtan4.xtan.cc/v3.3.3/api/score/exchange?access_token='+ tokenStrs,{'platformId':1,'goodsId':this.$route.params.id},{emulateJSON:true})
              // _this.$http({
              //   method:'POST',
              //   url:'http://118.190.45.84/xtan4/public/api/score/exchange?access_token='+ tokenStrs,
              //   params:{'platformId':1,'goodsId':this.$route.params.id},
              //   headers: {"Authorization": tokenStrs},
              //   emulateJSON: true
              // })
              .then(function(res){
                vm = res.body.backdata.giftCode;
                Indicator.close(
                 MessageBox.confirm('',{
                    title: '兑换成功',
                    message: '恭喜您获得游戏礼包码 '+ vm + ' 您可在我的兑换中查看使用',
                    showCancelButton: true,
                    confirmButtonText: "复制",
                    cancelButtonText: "好的"
                  }).then(action => {
                    if(action == "confirm") {
                      // document.execCommand(vm);
                      this.copy(vm)
                      window.history.go(-1)
                    }
                  })
                )
              },function (err){
                Indicator.close(
                  Toast(err.body.backmsg)
                )
              })
          }}).catch(err => {
          if (err == 'cancel') {
              console.log('123');
          }});
    }else if(vt == 3){
      if(this.userList.tel == '' || this.userList.tel == null){
        Toast({
          message: '请填写用户信息',
          duration: 500
        })
      }else{
      MessageBox.confirm('兑换将消耗'+ this.$route.params.score +'积分,确定兑换吗?',{
        title: '兑换商品',
        showCancelButton: true
      }).then(action => {
          if (action == 'confirm') {
              setStore("userTel", this.userList.tel)
              Indicator.open();
              let _this = this;
              _this.$http.post('http://xtan4.xtan.cc/v3.3.3/api/score/exchange?access_token=' + tokenStrs,{'platformId':1,'goodsId':this.$route.params.id, 'phone': _this.userList.tel},{emulateJSON:true})
              // _this.$http({
              //   method:'POST',
              //   url:'http://118.190.45.84/xtan4/public/api/score/exchange?access_token=' + tokenStrs,
              //   params:{'platformId':1,'goodsId':this.$route.params.id, 'phone': _this.userList.tel},
              //   headers: {"Authorization": tokenStrs},
              //   emulateJSON: true,
              //   _timeout:3000,
                // onTimeout: (request) => {
                //     alert("请求超时");
                // }
              // })
              .then(function(res){
                Indicator.close(
                 Toast('恭喜您兑换成功,可在我的兑换中查看进度')
                )
                window.history.go(-1)
              },function(err){
                if(err.status == 408){
                    Indicator.close(
                   Toast('请求超时')
                 )
                }else {
                  Indicator.close(
                   Toast(err.body.backmsg)
                  )
                }
              }) 
          }}).catch(err => {
            if (err == 'cancel') {
              console.log('333');
          }});
      }
    }else if(vt == 2){
      if(this.userList.tel == '' || this.userList.tel == null || this.userList.name == ''  || this.userList.name == null || this.Province == '' || this.Province == null || this.userList.detailedAddress == '' || this.userList.detailedAddress == null){
        Toast({
          message: '请填写用户信息',
          duration: 500
        })
      }else {
      MessageBox.confirm('兑换将消耗'+ this.$route.params.score +'积分,确定兑换吗?',{
        title: '兑换商品',
        showCancelButton: true
     }).then(action => {
          if (action == 'confirm') {
              setStore("userTel", this.userList.tel)
              setStore("userName", this.userList.name)
              setStore("userDAddress", this.userList.detailedAddress)
              Indicator.open();
              let _this = this;
              _this.$http.post('http://xtan4.xtan.cc/v3.3.3/api/score/exchange?access_token=' + tokenStrs,{'platformId':1,'goodsId':this.$route.params.id, 'phone': _this.userList.tel, 'person': _this.userList.name, 'address': _this.Province, 'addrDetail': _this.userList.detailedAddress},{emulateJSON:true})
              // _this.$http({
              //   method:'POST',
              //   url:'http://118.190.45.84/xtan4/public/api/score/exchange?access_token=' + tokenStrs,
              //   params:{'platformId':1,'goodsId':this.$route.params.id, 'phone': _this.userList.tel, 'person': _this.userList.name, 'address': _this.Province, 'addrDetail': _this.userList.detailedAddress},
                // headers: {"Authorization": tokenStrs},
              //   emulateJSON: true
              // })
              .then(function(res){
                Indicator.close(
                 Toast('恭喜您兑换成功,可在我的兑换中查看进度')
                )
                window.history.go(-1)
              },function(err){
                Indicator.close(
                 Toast('兑换失败')
                )
              })
          }}).catch(err => {
          if (err == 'cancel') {
              console.log('123');
          }});
    }
    }
  }}
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
@import '../../style/px2rem.scss';
.form {
  div {
    border-bottom: 1px solid #eee;
    padding: px2rem(30) 0;
    position: relative;
  }
  label {
    font-size: px2rem(30);
  }
  input {
    // border: 1px solid #DDD;
    text-align: right;
    font-size: px2rem(30);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
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
  background: #DDD;
  color: #000;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: px2rem(100);
  font-size: px2rem(34);
  line-height: px2rem(100);
}
section {
  padding: px2rem(0) px2rem(30) 0 px2rem(30);
  img {
    width: 150px;
    height:100px;
    margin-top: px2rem(30);
    vertical-align: bottom;
  }
  p {
    font-size: px2rem(30);
    margin-top: px2rem(40);
  }
  i {
    font-size: px2rem(40);
    margin-top: px2rem(30);
  }
}
.tel {
  span {
    display: block;
  }
  div {
    font-size: 15px;
    margin-top: px2rem(30);
    // input[type='tel'] {
    //   float: right;
    //   text-align: right;
    // }
    input {
      font-size: 15px;
      float: right;
      text-align: right;
    }
  }
}

</style>

