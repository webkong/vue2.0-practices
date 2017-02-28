<template>
  <div id="app">
    <s-header :seller="seller"></s-header>
    <div class="tab bdr-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" charset="utf-8">
  import header from 'components/header/Header';
  const ERR_OK = 0;

  export default {
    name: 'app',
    data () {
      return {
        seller: {}
      };
    },
    created () {
      this.$http.get('/api/seller').then((res) => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.seller = res.data;
        }
      });
    },
    components: {
      's-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "assets/common/stylus/mixin.styl"
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      border-1px(rgba(7, 17, 27, 0.2))
      .tab-item
        flex 1
        text-align center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 86, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
