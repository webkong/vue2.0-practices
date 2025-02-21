<template>
  <transition name="fade">
    <div class="fooddetail" v-show="showFlag" ref="fooddetail">
      <ul>
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span v-if="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartControl @cartadd="_drop" :food="food"></cartControl>
          </div>
          <transition name="move">
            <div class="buy" @click.stop.prevent="addFirst(food, $event)" v-show="!food.count || food.count===0">加入购物车
            </div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"
                        @ratingtypeselected="_setSelectType" @contenttoogle="_setOnlyContent"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"
                  class="rating-item bdr-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" class="avatar" width="12" height="12" alt="">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <div class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </ul>
    </div>
  </transition>

</template>
<script type="text/ecmascript-6">
  import BetterScroll from 'better-scroll';
  import Vue from 'vue';
  import cartControl from 'components/cartcontrol/CartControl';
  import split from 'components/split/Split';
  import ratingselect from 'components/ratingselect/Ratingselect';
  import {formatDate} from '../../assets/common/js/date';

  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      _setSelectType (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      _setOnlyContent (type) {
        this.onlyContent = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      show () {
        this.selectType = ALL;
        this.onlyContent = true;
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            console.log(this.$refs.fooddetail);
            this.scroll = new BetterScroll(this.$refs.fooddetail, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide () {
        this.showFlag = false;
      },
      _drop (target) {
        this.$nextTick(() => {
          this.$emit('cartadd', event.target);
        });
      },
      addFirst (food, event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('cartadd', event.target);
        Vue.set(this.food, 'count', 1);
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return this.selectType === type;
        }
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartControl: cartControl,
      split: split,
      ratingselect: ratingselect
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/common/stylus/mixin.styl"
  .fooddetail
    position: fixed;
    top 0
    left 0
    right 0
    bottom 48px
    z-index: 30
    width 100%
    background #fff
    transform translate3d(0, 0, 0)
    transition all 0.2s linear
    &.fade-enter-active, &fade-leave
      transform translate3d(100%, 0, 0)
    &.fade-leave-active, &.fade-enter
      transform translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height 0
      padding-top 100%
      img
        position absolute
        width 100%
        height 100%
        top 0
      .back
        position: absolute;
        top 10px
        left: 0
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #fff
    .content
      padding 18px
      position: relative
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
      .detail
        margin-bottom 18px
        line-height 10px
        font-size 0
        height 10px
        .sell-count, .rating
          font-size 10px
          color rgb(147, 153, 159)
        .sell-count
          margin-right 12px
      .price
        line-height 24px
        font-weight 700
        .now
          margin-right 8px
          font-size 14px
          color rgb(240, 20, 20)
        .old
          font-size 10px
          color rgb(147, 153, 159)
          text-decoration line-through

      .cartcontrol-wrapper
        position absolute
        right 12px
        bottom 12px
      .buy
        position: absolute
        right 18px
        bottom 20px
        padding 0 12px
        z-index 10
        height 24px
        line-height 24px
        box-sizing border-box
        font-size 10px
        border-radius 12px
        color #fff
        background rgb(0, 160, 220)
        opacity 1
        transition all 0.2s linear
        &.move-enter-active, &.move-leave
          opacity 0
        &.move-enter, &.move-leave-active
          opacity 0
    .info
      padding 18px
      .title
        line-height 14px
        margin-bottom 6px
        font-size 14px
        color rgb(7, 17, 27)
      .text
        line-height 24px
        padding 0 8px
        font-size 12px
        color rgb(77, 85, 93)
    .rating
      padding-top 18px
      .title
        line-height 14px
        margin-left 18px
        font-size 14px
        color rgb(7, 17, 27)
      .rating-wrapper
        padding 0 18px
        margin-bottom 10px
        .rating-item
          position: relative
          padding-bottom 16px
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute;
            right: 0
            top 16px
            font-size 0
            line-height 12px
            .name
              display inline-block
              vertical-align top
              font-size 10px
              margin-right 6px
              color rgb(147, 153, 159)
            .avatar
              border-radius 50%
          .time
            margin-bottom 6px
            padding-top 16px
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
          .text
            font-size 12px
            line-height 16px
            color rgb(7, 17, 27)
            .icon-thumb_down, .icon-thumb_up
              margin-right 4px
              line-height 16px
              font-size 12px
            .icon-thumb_up
              color rgb(0, 160, 220)
            .icon-thumb_down
              color rgb(147, 153, 159)
</style>
