<template>
  <div class="ratingselect">
    <div class="rating-type bdr-1px">
      <span class="block all" :class="{'active':selectTypeC=== 2}" @click="selected(2,$event)">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span class="block positive"
            :class="{'active':selectTypeC===0}" @click="selected(0,$event)">{{desc.positive}}<span
        class="count">{{positive.length}}</span></span>
      <span class="block negative"
            :class="{'active':selectTypeC===1}" @click="selected(1,$event)">{{desc.negative}}<span
        class="count">{{negative.length}}</span></span>
    </div>
    <div class="switch" :class="{'active':onlyContentC}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    data () {
      return {
        onlyContentC: this.onlyContent,
        selectTypeC: this.selectType
      };
    },
    computed: {
      positive () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negative () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      selected (type, event) {
        if (!event._constructed) {
          return;
        }
        console.log(type);
        this.selectTypeC = type;
        this.$emit('ratingtypeselected', type);
      },
      toggleContent (event) {
        console.log(this.onlyContentC);
        if (!event._constructed) {
          return;
        }
        this.onlyContentC = !this.onlyContentC;
        console.log(this.onlyContentC);
        this.$emit('contenttoogle', this.onlyContentC);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/common/stylus/mixin.styl";
  .ratingselect
    .rating-type
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, 0.2))
      font-size 0
      .block
        display: inline-block
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        color rgb(77, 85, 93)
        font-size 12px
        &.active
          color #fff
        .count
          font-size 8px
          line-height 16px
          margin-left 2px
        &.positive
          background rgba(0, 160, 220, 0.2)
          &.active
            background rgba(0, 160, 220, 1)
        &.negative
          background rgba(77, 83, 92, 0.2)
          &.active
            background rgb(77, 83, 92)
        &.all
          background rgba(0, 160, 220, 0.2)
          &.active
            background rgba(0, 160, 220, 1)
    .switch
      padding 12px 18px
      line-height 24px
      border-1px(rgba(7, 17, 27, 0.2))
      font-size 0
      color rgb(147, 153, 159)
      &.active
        .icon-check_circle
          color #00c850
      .icon-check_circle
        margin-right 4px
        font-size 24px
        line-height 24px
        display inline-block
        vertical-align top
      .text
        font-size 12px
        display inline-block
        vertical-align top

</style>
