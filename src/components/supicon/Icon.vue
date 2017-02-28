<template>
  <span class="icon" :class="iconClass"></span>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      type: Number,
      size: Number
    },
    computed: {
      iconClass () {
        return ['icon-' + this.size, this.classMap[this.type]];
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/common/stylus/mixin.styl"
  .icon
    display inline-block
    vertical-align top
    &.icon-16
      width 16px
      height 16px
      margin-right 6px
      background-size 16px 16px
      &.decrease
        bg-image('./images/decrease_2')
      &.discount
        bg-image('./images/discount_2')
      &.guarantee
        bg-image('./images/guarantee_2')
      &.special
        bg-image('./images/special_2')
      &.invoice
        bg-image('./images/invoice_2')
    &.icon-12
      width 12px
      height 12px
      margin-right 4px
      background-size 12px 12px
      &.decrease
        bg-image('./images/decrease_1')
      &.discount
        bg-image('./images/discount_1')
      &.guarantee
        bg-image('./images/guarantee_1')
      &.special
        bg-image('./images/special_1')
      &.invoice
        bg-image('./images/invoice_1')
    &.icon-122
      width 12px
      height 12px
      margin-right 2px
      background-size 12px 12px
      &.decrease
        bg-image('./images/decrease_3')
      &.discount
        bg-image('./images/discount_3')
      &.guarantee
        bg-image('./images/guarantee_3')
      &.special
        bg-image('./images/special_3')
      &.invoice
        bg-image('./images/invoice_3')
</style>
