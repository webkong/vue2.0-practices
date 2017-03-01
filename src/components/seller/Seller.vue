<template>
  <div class="seller">
    <div class="seller-content" ref="seller">
      <div>
        <div class="overview">
          <div class="title">{{seller.name}}</div>
          <div class="star-wrapper bdr-1px">
            <star :size="36" :score="seller.score"></star>
            <span class="rating-count">({{ratings.length}})</span>
            <span class="sell-count">月销售{{seller.sellCount}}单</span>
          </div>
          <div class="favorite">
            <div class="f" @click="setFavorite($event)">
              <i class="icon-favorite" :class="{'active': favorite}"></i>
            </div>
            <span class="favorite-text">{{favoriteText}}</span>
          </div>
          <div class="seller-detail">
            <div class="item">
              <span class="subtitle">起送价</span>
              <div class="text">
                <p class="number">{{seller.minPrice}}</p>
                <span class="sub">元</span>
              </div>
            </div>
            <div class="item">
              <span class="subtitle">商家配送</span>
              <div class="text">
                <p class="number">{{seller.deliveryPrice}}</p>
                <span class="sub">元</span>
              </div>
            </div>
            <div class="item">
              <span class="subtitle">平均配送时间</span>
              <div class="text">
                <p class="number">{{seller.deliveryTime}}</p>
                <span class="sub">分钟</span>
              </div>
            </div>
          </div>
        </div>
        <split></split>
        <div class="bulletin" v-if="seller.bulletin && seller.supports">
          <h2 class="title">公告与活动</h2>
          <div class="content">{{seller.bulletin}}</div>
          <div class="supports">
            <ul>
              <li v-for="item in seller.supports" class="support-item">
                <icon :size="16" :type="item.type"></icon>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
          </div>
        </div>
        <split v-if="seller.pics && seller.pics.length"></split>
        <div class="pics" v-if="seller.pics && seller.pics.length">
          <div class="title">商家实景</div>
          <div class="pics-content" ref="pics">
            <ul class="pic-list" :style="{width:picWidth + 'px'}">
              <li v-for="pic in seller.pics" class="item">
                <img :src="pic" width="120" height="90" alt="">
              </li>
            </ul>
          </div>
        </div>
        <split v-if="seller.infos && seller.infos.length"></split>
        <div class="infos" v-if="seller.infos && seller.infos.length">
          <div class="title">商家信息</div>
          <div class="info-list">
            <ul>
              <li class="item" v-for="info in seller.infos">
                <p>{{info}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import split from 'components/split/Split';
  import icon from 'components/supicon/Icon';
  import BetterScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from '../../assets/common/js/sotre';
  const ERROR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏';
      },
      picWidth () {
        let w = 120;
        let m = 6;
        let width = (w + m) * this.seller.pics.length - m || 0;
        return width;
      }
    },
    created () {
      this.$http.get('/api/ratings').then((res) => {
        res = res.body;
        if (res.errno === ERROR_OK) {
          this.ratings = res.data;
          this.$nextTick(() => {
            this.scroll = new BetterScroll(this.$refs.seller, {
              click: true
            });
            if (this.seller.pics) {
              this.scrollPic = new BetterScroll(this.$refs.pics, {
                click: true,
                scrollY: false,
                scrollX: true
              });
            }
          });
        }
      });
    },
    methods: {
      setFavorite (event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    },
    components: {
      star: star,
      split: split,
      icon: icon
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/common/stylus/mixin.styl";
  .seller-content
    position absolute
    top 174px
    width 100%
    bottom 0
    left 0
    overflow hidden
    .title
      font-size 14px
      line-height 14px
      color rgb(7, 17, 27)
    .overview
      display block
      padding 0 18px
      .title
        padding-top 18px
      .star-wrapper
        display inline-block
        margin-top 8px
        padding-bottom 18px
        width 100%
        border-1px(rgba(7, 17, 27, 0.1))
        .star
          display inline-block
        .rating-count
          padding 0 12px 0 8px
          vertical-align top
          font-size 10px
          line-height 18px
          color rgb(77, 85, 93)
        .sell-count
          vertical-align top
          font-size 10px
          line-height 18px
          color rgb(77, 85, 93)
      .seller-detail
        display flex
        padding-bottom 18px
        .item
          flex 1
          margin-top 18px
          text-align center
          border-right 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-right none
          .subtitle
            font-size 10px
            color rgb(147, 153, 159)
            line-height 10px
            margin-bottom 4px
          .text
            font-size 0
            .number
              display inline-block
              font-size 24px
              font-weight 200
              color rgb(7, 17, 27)
              line-height 24px
            .sub
              display inline-block
              font-size 10px
      .favorite
        position: absolute
        top 18px
        right 11px
        text-align center
        width 41px
        .icon-favorite
          font-size 24px
          color #d4d6d9
          line-height 24px
          margin-bottom 4px
          &.active
            color rgb(240, 20, 20)
        .favorite-text

          text-align center
          font-size 10px
          color rgb(77, 85, 93)
          line-height 10px
    .bulletin
      padding 0 18px
      .title
        padding 18px 0 8px 0
      .content
        padding 0 12px 16px 12px
        font-size 12px
        line-height 24px
        color rgb(240, 20, 20)
        font-weight 200
      .supports
        width 100%
        .support-item
          padding 16px 12px
          border-top 1px solid rgba(7, 17, 27, 0.1)
          .text
            font-size 12px
            font-weight 200
            color rgb(7, 17, 27)
            line-height 16px
            vertical-align top
    .pics
      padding-left 18px
      .title
        padding 18px 0 12px 0
      .pics-content
        width 100%
        overflow hidden
        white-space nowrap
        padding-bottom 18px
        .pic-list
          font-size 0
        .item
          display inline-block
          width 120px
          height 90px
          margin-right 6px
          &.last-child
            margin-right 0
    .infos
      padding 0 18px
      .title
        padding 18px 0 12px 12px
      .info-list
        .item
          padding 16px 12px
          font-size 12px
          font-weight 200
          line-height 16px
          color rgb(7, 17, 27)
          border-top 1px solid rgba(7, 17, 27, 0.1)
</style>
