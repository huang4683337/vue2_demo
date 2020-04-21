<template>
  <div class="navbottom">
  	<p class="navbottom-p1">Copyright © XXXXXX, All Rights Reserved.</p>
	<p>Email : XXXXXXX  QQ: XXXXXX</p>
  </div>
</template>

<script>
import store from 'store';
export default {
	name: 'navBottom',
	data() {
		return {
		}
	},
	methods:{
	}

}
</script>

<style lang="less" scoped>

.navbottom{
	margin-bottom: 0px;
	margin: 0 auto;
	height:88px;
	width: 100%;
	line-height:10px;
	font-size: 14px;
	background: #F0F0F0;
	text-align: center;
	.navbottom-p1{
		padding-top: 30px;
	}
}
</style>
