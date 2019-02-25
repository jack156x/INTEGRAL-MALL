<template>
  <div>
      <section class="bgc">
            <div class="contant">
                    <div>
                        <span>兑换成功</span>
                        <i>订单号: {{orderId}}</i>
                    </div>
                    <div class="smImg">
                        <img v-lazy="'http://image.jswl.cc/' + `${img}`">
                        <div>
                            <p>{{title}}</p>
                            <i>消耗积分: {{score}}积分</i>
                        </div>
                    </div>
            </div>
        </section>
        <section class="bgc">
            <div class="order">
                    <h3>收货信息:</h3>
                    <p>游戏兑换码: <i ref="copy" v-if="exchangInfo.giftCode">{{exchangInfo.giftCode}}</i> <span @click="copy(exchangInfo.giftCode)">复制</span></p>
                    <div>兑换时间: <span>{{time}}</span></div>
            </div>
        </section>
  </div>
</template>
<script>
import {getStore,setStore,token} from '../../../config/utils'
export default {
  props: ["title", "img", "orderId", "score", "time", "exchangInfo"],
  data () {
      return {
      }
  },
  mounted () {
  },
  methods: {
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
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/px2rem.scss';
.bgc {
    background: #F0F0F0;
    padding-top: px2rem(30);
    div.contant {
        padding: px2rem(30);
        background: #FFF;
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
            margin-top: px2rem(30);
            img {
                width: px2rem(330);
                height: px2rem(220);
                margin-bottom: px2rem(30);
                vertical-align: bottom;
            }
            div {
                p {
                        font-size: px2rem(30);
                    }
                i {
                    font-size: px2rem(24);
                    color: #999;
                }
            }
            
        }
    }
    div.order {
        padding: px2rem(30);
        background: #FFF;
        h3 {
            font-size: px2rem(30);
        }
        p {
            font-size: px2rem(30);
            color: #999;
            margin-top: px2rem(15);
            position: relative;
            i {
                color: #999;
            }
            span {
                background: #7ACCC8;
                color: #FFF;
                font-size: px2rem(26);
                padding: px2rem(15) px2rem(36);
                border-radius: 5px;
                position: absolute;
                top: -5px;
                right: 0;
                
            }
        }
        div {
            margin-top: px2rem(30);
            font-size: px2rem(30);
            span {
                color: #999;
            }
        }
    }
}
</style>


 