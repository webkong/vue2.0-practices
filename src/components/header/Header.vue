<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand" alt=""></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <Icon :type="seller.supports[0].type" :size="12"></Icon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count" @click="showDetail">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!--公告-->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-icon"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-if="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="name">{{seller.name}}</div>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="detail-supports">
              <li class="support-item" v-for="(item, index) in seller.supports">
                <Icon :type="index" :size="16"></Icon>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="seller-bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>

  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import Icon from 'components/supicon/Icon';
  export default{
    props: {
      seller: {
        type: Object // props验证
      }
    },
    data () {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      },
      hideDetail () {
        this.detailShow = false;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star: star,
      Icon: Icon
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/common/stylus/mixin.styl"
  .header
    position relative
    overflow hidden
    color #fff
    background rgba(7, 17, 27, 0.5)
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      font-size 0
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        margin-left 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display inline-block
            width: 30px
            height 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
            vertical-align top
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight blod
        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .supports
          .text
            line-height 12px
            font-size 10px

      .support-count
        position absolute
        bottom 18px
        right 12px
        padding 0px 8px
        height 24px
        line-height 24px
        border-radius 14px
        background rgba(0, 0, 0, 0.2)
        text-align center
        .count
          font-size 10px
          margin-right 2px
          vertical-align top
        .icon-keyboard_arrow_right
          line-height 24px
          font-size 10px
    .bulletin-wrapper
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      color rgb(255, 255, 255)
      position relative
      .bulletin-icon
        display: inline-block
        width 22px
        height 12px
        bg-image('bulletin')
        background-repeat no-repeat
        background-size 22px 12px
        vertical-align top
        margin-top 9px
      .bulletin-text
        margin 0 4px
        font-size 10px
      .icon-keyboard_arrow_right
        position absolute
        font-size 10px
        right 12px
        top 10px

    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      z-index 100
      width 100%
      height 100%
      top 0
      left 0
      overflow auto
      backdrop-filter blur(10px)
      transition all .5s
      background rgba(7, 17, 27, 0.8)
      transition all .5s
      &.fade-enter-active, &.fade-leave-active
        opacity 1
        background rgba(7, 17, 27, 0.8)
      &.fade-enter, &.fade-leave-active
        opacity 0
        background rgba(7, 17, 27, 0)
      .detail-wrapper
        min-height 100%
        width 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            font-size 16px
            line-height 16px
            text-align center
          .star-wrapper
            margin 18px auto
            padding 2px 0
            text-align center
          .title
            display flex
            width 80%
            margin 28px auto 24px auto
            .line
              position relative
              top -6px
              flex 1
              border-bottom 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding 0 12px
              font-weight 700
          .detail-supports
            width 80%
            margin 0 auto
            .support-item
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .text
                line-height 16px
                font-size 12px
          .seller-bulletin
            width 80%
            margin 0 auto
            .content
              font-size 12px
              line-height 24px
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
</style>
