<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item menu-list-hook" :class="{current: index == currentIndex}"
            @click="selectMenu(index, $event)">
          <span class="text bdr-1px">
            <span v-if="item.type>0">
              <Icon :type="item.type" :size="122"></Icon>
            </span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="food">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">
            <span class="text">{{item.name}}</span>
          </h1>
          <ul>
            <li v-for="food in item.foods" @click="selectFood(food,$event)" class="food-item bdr-1px">
              <div class="icon">
                <img :src="food.icon" width="100%" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span v-if="food.oldPrice"
                                                                class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cartControl @cartadd="_drop" :food="food"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
              ref="shopcart"></shopCart>
    <food :food="selectedFood" @cartadd="_drop" ref="fooddetail"></food>
  </div>
</template>
<script type="text/ecmascript-6">
  import Icon from 'components/supicon/Icon';
  import shopCart from 'components/shopcart/Shopcart';
  import cartControl from 'components/cartcontrol/CartControl';
  import food from 'components/food/Food';
  import BetterScroll from 'better-scroll';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      // 计算当前滚动的位置索引
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created () {
      this.$http.get('/api/goods').then((res) => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.goods = res.data;
          // 渲染之后执行
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods: {
      selectMenu (index, event) {
        if (!event._constructed) {
          // 根据浏览器没有这个原生事件来取消pc浏览器的多余点击
          return;
        }
        let foodList = this.$el.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      _drop (target) {
// 体验优化，异步执行
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      // 初始化滚动函数
      _initScroll () {
        this.menuScroll = new BetterScroll(this.$refs.menu, {
          click: true
        });
        this.foodsScroll = new BetterScroll(this.$refs.food, {
          click: true,
          probeType: 3 // 监听实时滚动的位置
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight () {
        let foodList = this.$el.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.fooddetail.show();
      }
    },
    components: {
      Icon: Icon,
      shopCart: shopCart,
      cartControl: cartControl,
      food: food
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/common/stylus/mixin.styl"

  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          font-weight 700
          .text
            border-none()
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size 12px

  .foods-wrapper
    flex 1
    .food-list
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left solid 2px #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none
          margin-bottom 0
        .icon
          flex: 0 0 57px
          margin-right 10px
        .content
          flex: 1
        .name
          margin-top 2px
          font-size 14px
          height 14px
          line-height 14px
          color rgb(7, 17, 27)
        .desc
          margin 8px 0
          font-size 10px
          line-height 10px
          color rgb(147, 153, 159)
        .extra
          display block
          font-size 10px
          line-height 10px
          color rgb(147, 153, 159)
          .rating
            margin-left 12px
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
        .cart-control-wrapper
          position absolute
          right 0
          bottom 12px
</style>
