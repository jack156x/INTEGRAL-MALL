<template>
  <div class="loading-box">
    <div :class="!done ? 'loading-start' : 'msg'">
      {{ done ? '没有更多了' : '加载中...' }}
    </div>
  </div>
</template>
<script>
  import isSeeing from '../../config/is-seeing'

  export default {
    props: {
      done: { // 是否加载完成
        type: Boolean,
        default: false
      },
      loading: { // 是否在请求中
        type: Boolean,
        default: false
      }
    },
    mounted () {
      this.timer = setInterval(() => {
        if (isSeeing(this.$el) && !this.loading) {
          this.$emit('seeing')
        }
      }, 300)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }

</script>
<style lang="scss" scoped>
@import '../../style/px2rem.scss';
  .loading-box {
    .msg {
      line-height: 70px;
      text-align: center;
      font-size:px2rem(30);
      color: #999;
    }
  }


  .loading-start {
    line-height: 70px;
    text-align: center;
    font-size:px2rem(30);
    color: #999;
    // margin: 20px auto 20px auto;
    // position: relative;
    // animation: rotate-forever 1s infinite linear;
    // height: 30px;
    // width: 30px;
    // border: 4px solid #1d92e8;
    // border-right-color: transparent;
    // border-radius: 50%;
    .msg {
      display: none;
    }
  }

  // @keyframes rotate-forever {
  //   0% {
  //     transform: rotate(0deg)
  //   }
  //   100% {
  //     transform: rotate(360deg)
  //   }
  // }
</style>
