<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight:totalCount>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-if="totalCount">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight:totalPrice>0}">
          ￥{{totalPrice}}
        </div>
        <div class="desc" :class="{highlight:payDesc.type===2}">另需配送费￥{{deliveryPrice}}</div>
      </div>
      <div class="content-right" @click.stop="pay">
        <div class="pay" :class="{highlight:payDesc.type===2}">
          {{payDesc.desc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div v-for="ball in balls" :key="ball" v-if="ball.show" class="ball">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-if="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="list-content">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartControl :food="food"></cartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="list-mask" @click="toggleList" v-if="listShow"></div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import cartControl from 'components/cartcontrol/CartControl';
  import BetterScroll from 'better-scroll';
  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [{
            price: 10,
            count: 5
          }];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          }, {
            show: false
          }, {
            show: false
          }, {
            show: false
          }, {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return {
            desc: `￥${this.minPrice}元起送`,
            type: 0
          };
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return {
            desc: `还差￥${diff}元起送`,
            type: 1
          };
        } else {
          return {
            desc: `结算`,
            type: 2
          };
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              console.log(this.$refs['list-content']);
              this.scroll = new BetterScroll(this.$refs['list-content'], {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      // 初始化滚动
      _scroll () {
        if (!this.scroll) {
          console.log(this.$refs['list-content']);
          this.scroll = new BetterScroll(this.$refs['list-content'], {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      // drop动画
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enter (el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; // 触发浏览器重构
        this.$nextTick(() => {
          el.style.webkitTransform = `translate3d(0, 0, 0)`;
          el.style.transform = `translate3d(0, 0, 0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(0, 0, 0)`;
          inner.style.transform = `translate3d(0, 0, 0)`;
        });
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      // 切换购物车详情页
      toggleList () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert('需要支付xxyuan ');
      }
    },
    components: {
      cartControl: cartControl
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/common/stylus/mixin.styl"
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index: 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      height 100%
      font-size 0
      z-index 40
      position relative
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            color #80858a
            &.highlight
              background #0094CB
              color #fff
            .icon-shopping_cart
              line-height 44px
              font-size 24px
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #fff
            background rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          line-height 24px
          margin-top 12px
          padding-right 12px
          font-size 16px
          font-weight 700
          color rgba(255, 255, 255, 0.4)
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 10px
          color rgba(255, 255, 255, 0.4)
          &.highlight
            color rgba(255, 255, 255, 0.8)
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          font-size 12px
          color rgba(255, 255, 255, 0.4)
          font-weight 700
          text-align center
          background #2B333B
          &.highlight
            background #00b43c
            color rgb(255, 255, 255)
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 32px
        z-index 2000
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background rgb(0, 160, 220)
          transition all 0.4s
    .shopcart-list
      position absolute
      left 0
      top auto
      height 300px
      bottom 0px
      width 100%
      z-index 30
      transition all 0.5s
      &.fold-enter, &.fold-leave-active
        bottom -300px
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 2px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)
      .list-content
        padding 0 18px
        min-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          display block
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 6px
    .list-mask
      position fixed
      height 100%
      width 100%
      z-index -2
      left 0
      top 0
      bottom 48px
      opacity 1
      background rgba(7, 17, 27, 0.6)
      transition all 0.5s
      &.mask-enter, &.mask-leave-active
        opacity 0
        background rgba(7, 17, 27, 0)
</style>
