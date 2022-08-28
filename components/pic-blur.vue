<template>
	<view>
		<!-- 毛玻璃组件 -->
		
		<view class="container" :style="css.size">
		
			<image :src='css.img' :class="css.blur" mode="aspectFill" v-if='css.img'></image>
			<view :class="css.blur" v-else></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"pic-blur",
		props:{
			params:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		computed:{
			
			css(){
				console.log('??啥情况！！！！')
				console.log('??啥情况',this.params)
				let w = this.params.width || 0;
				let h = this.params.height || 0;
				let blur = this.params.blur || 'm';
				let img = this.params.image || 0;
				return {
					size:`width:${w};height:${h}`,
					blur,
					img
				}
			}
		},
		data() {
			return {
				
			};
		},
		
	}
</script>

<style lang="scss" scoped>
.container{
	overflow: hidden;
	position: relative;
	
	> view{
		background-color: rgba(255,255,255,0.6);
	}
	
	> image, > view{
		position: absolute;
		z-index: 1;
		box-sizing: content-box;
		&.xs{
			padding: 10px;
			left: 50%;
			transform: translateX(-50%);
			top: -10rpx;
			filter: blur(5rpx);
		}
		&.s{
			padding: 15rpx;
			left: 50%;
			transform: translateX(-50%);
			top: -15rpx;
			filter: blur(10rpx);
		}
		&.m{
			padding: 20rpx;
			left: 50%;
			transform: translateX(-50%);
			top: -20rpx;
			filter: blur(15rpx);
		}
		&.l{
			padding: 30prx;
			left: 50%;
			transform: translateX(-50%);
			top: -30rpx;
			filter: blur(25rpx);
		}
	}
}
</style>