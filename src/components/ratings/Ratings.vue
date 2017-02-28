<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="deliver-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings"
                    @ratingtypeselected="_setSelectType" @contenttoogle="_setOnlyContent"></ratingselect>
      <div class="rating-wrapper" ref="rating-list">
        <ul>
          <li class="rating-item bdr-1px" v-for="rating in ratings">
            <div class="avatar">
              <img :src="rating.avatar" height="28" width="28" alt="">
            </div>
            <div class="content">
              <div class="name">{{rating.username}}</div>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>

            </div>
            <div class="time">{{rating.rateTime | formatDate}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import split from 'components/split/Split';
  import ratingSelect from 'components/ratingselect/Ratingselect';
  import {formatDate} from '../../assets/common/js/date';
  import BetterScroll from 'better-scroll';
  const ERR_OK = 0;
  const ALL = 2;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    created () {
      this.$http.get('/api/ratings').then((res) => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.ratings = res.data;
          this.$nextTick(() => {
            this.scroll = new BetterScroll(this.$refs['rating-list'], {
              click: true
            });
          });
        }
      });
    },
    methods: {
      _setSelectType (type) {
        this.selectType = type;
      },
      _setOnlyContent (type) {
        this.onlyContent = type;
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star: star,
      split: split,
      ratingselect: ratingSelect
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/common/stylus/mixin.styl"
  .ratings
    position: absolute
    top 174px
    bottom 0
    width 100%
    left 0
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        border-right 1px solid rgba(7, 17, 27, 0.1)
        text-align center
        padding-botttom 6px
        @media only screen and (max-width 320px)
          flex 0 0 110px
          width 110px
        .score
          font-size 24px
          line-height 28px
          color rgb(255, 153, 0)
        .title
          font-size 12px
          line-height 12px
          color rgb(7, 17, 27)
          margin 6px auto 8px auto
        .rank
          font-size 10px
          line-height 10px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width 320px)
          padding-left 6px
        .score-wrapper
          margin-bottom 8px
          font-size 0
          line-height 18px
          .title
            display inline-block
            vertical-align top
            margin-right 12px
            font-size 12px
            color rgb(7, 17, 27)
          .star
            display: inline-block
            vertical-align top
            font-size 12px
          .score
            display inline-block
            margin-left 12px
            vertical-align top
            font-size 12px
            color rgb(255, 153, 0)
        .deliver-wrapper
          font-size 0
          .title
            display inline-block
            vertical-align top
            margin-right 12px
            font-size 12px
            color rgb(7, 17, 27)
          .time
            display inline-block
            vertical-align: top
            font-size 12px
            line-height 12px
            color rgb(147, 153, 159)

    .rating-wrapper
      display block
      padding 0 18px
      .rating-item
        display: flex
        border-1px(rgba(7, 17, 27, 0.1))
        padding 18px 0
        .avatar
          flex 0 0 28px
          width 28px
          border-radius 50%
          margin-right 12px
        .content
          flex 1
          position relative
          .name
            font-size 10px
            line-height 12px
            margin-bottom 4px
          .star-wrapper
            margin-bottom 6px
            .star
              display: inline-block
            .delivery
              display inline-block
              padding-right 6px
              font-size 10px
              line-height 12px
              color rgb(147, 153, 159)
              font-weight 200
          .text
            font-size 12px
            line-height 18px
            color rgb(7, 17, 27)
            maring-bottom 8px
          .recommend
            line-height 16px
            .icon-thumb_up, .item
              margin 0 8px 4px 0
              vertical-align top
              display inline-block
            .icon-thumb_up
              font-size 12px
              color rgb(0, 160, 220)
              line-height 16px
            .item
              padding 0 6px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 1px
              font-size 9px
              color: rgb(147, 153, 159)
              background-color: rgb(255, 255, 255)
        .time
          position absolute
          right 18px
          display: block
          font-size 10px
          font-weight 200
          color rgb(147, 153, 159)
          line-height 12px
</style>
