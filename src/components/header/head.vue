<template>
    <!-- <div class="head">
        <section class="head-goback iconfont icon-jiantou7" @click="goBack()">
        </section>
        <section class="title-head ellipsis">
            <span class="title_text">{{title}}</span>
        </section> -->
        <!-- <section>
            <span class="title_text_r">{{title||headTextR}}</span>
        </section> -->
    <!-- </div> -->
    <div class="head headh" :style="{height:heightIOS}">
        <i class="head-goback iconfont icon-jiantou7" :style="head_gobackIOS" @click="isgo_()">
        </i>
        <section class="title-head ellipsis" :style="title_headIOS">
            <span class="title_text">{{title}}</span>
        </section>
    </div>
    <!-- <div>
        <div class="head">
            <section class="head-goback iconfont icon-jiantou7" @click="isgo_()">
            </section>
                <section class="title-head">
                <span class="title_text">{{title}}</span>
            </section>
        </div>
    </div> -->
</template>
<script>
export default{
    props: ["headText"],
    data () {
        return {
            title: "积分商城",
            head_gobackIOS:'',
            heightIOS:'',
            title_headIOS:''
        }
    },
    mounted () {
        this.HEAD_IOS()
    },
    methods: {
        HEAD_IOS(){
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isiOS){
                this.head_gobackIOS={
                    height:"64px",
                    lineHeight:"85px"
                }
               this.heightIOS="64px"
               this.title_headIOS={
                   "transform": "translate(-50%,-12%)",
                   "-webkit-transform":"translate(-50%,-12%)"
               }
            }
        },
        isgo_(){
            var _this = this;
            var u = navigator.userAgent;
            // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isiOS){
                // params = "any"
                this.setupWebViewJavascriptBridge(function(bridge){
                // bridge.callHandler('isgo_ios', params, function(res){})
                bridge.callHandler('isgo_ios', null)
                })
            }else {
                window.android.isgo_android()
            }
        }
        // goBack() {
        //     this.$router.go(-1);
        //     console.log(1)
        // },
    }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
@import '../../style/px2rem.scss';
.title-head {
    @include center;
    width: 50%;
    text-align: center;
    .title_text {
        text-align: center;
        font-size: 20px;
    }
}

.head {
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    background: #FFF;
    width: 100%;
    position:fixed;
    z-index: 100;
    left: 0;
    top: 0;
    height: 44px;
}
.head-goback {
    @include wh(30px, 30px);
    line-height: 44px;
    margin-left: 15px;
    font-size: 20px;
    padding:10px 10px 10px 0;
}
</style>
