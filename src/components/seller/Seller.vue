<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <div class="title"></div>
        <star :size="36" :score=""></star>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star';
  const ERROR_OK = 0;
	export default {
		data () {
			return {
				seller:{}
      };
    },
    created () {
			this.$http.get('/api/seller').then((res) => {
				res = res.body;
				if (res.errno === ERROR_OK){
					this.seller = res.data;
        }
      });
    },
		components:{
			star: star
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
