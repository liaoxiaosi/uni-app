<template>
	<!-- 登录状态才能发布 -->
	<view class="goto-share" v-if='loginState'>
		<!-- 个人分享，选择器,应为一个图片作为点击的对象，，为了省事，直接文字了 -->
		<view class="share-img" @tap.stop='gotoShare'>分享</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name:"gotoShare",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState(['loginState'])
		},
		methods:{
			//底部个人分享，弹窗相关操作
			gotoShare(){
				uni.navigateTo({
					url:'/subpages/share'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.goto-share{
	position: fixed;
	bottom: 120rpx;
	right: 60rpx;
	text-align: center;
    color: #fff;
	font-size: 32rpx;
	width: 100rpx;
	height: 100rpx;
	line-height: 100rpx;
	border-radius: 50%;
	background-color: cadetblue;
}
</style>