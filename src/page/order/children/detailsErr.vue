<template>
  <div>
      <section class="bgc">
            <div class="contant">
                    <div>
                        <span>兑换失败</span>
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
                <p v-if="exchangInfo.person">{{exchangInfo.person}}</p>
                <p v-if="exchangInfo.phone">{{exchangInfo.phone}}</p>
                <p v-if="exchangInfo.address">{{exchangInfo.address}}{{exchangInfo.addrDetail}}</p>
                <div>兑换时间: <span>{{time}}</span></div>
            </div>
        </section>
        <section class="bgc">
            <div class="order">
                    <h3>失败原因:</h3>
                    <p>电话号有误</p>
            </div>
        </section>
  </div>
</template>
<script>
export default {
  props: ["title", "img", "orderId", "score", "time", "exchangInfo"],
  data () {
      return {
      }
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


