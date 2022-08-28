<template>
	<view>
		<!-- 评论列表 -->
		<view class="comments">
			<!-- <view class="title">最新评论</view> -->
			<view class="total">评论 {{total}}</view>
			<view class="no-comment" v-if='commentList.length===0'>
				<view>暂无评论</view>
			</view>
			<!-- 一级评论 -->
			<view class="one-comment" v-for='(item,index) in commentList' :key='index'>
				<view class="commenter">
					<view class="left">
						<u-avatar size='50' :src="!!item.user.avatar?itemuser.avatar:'/static/cute.jpg'" class="avatar"></u-avatar>
					</view>
					<view class="info">
						<view class="name">{{item.user.name}}</view>
						<view class="content">{{item.body}}</view>
						<view class="uptime">{{item.created_at }} 评论</view>
						
					</view>
					
				</view>
			</view>
			
		</view>
		<!-- 底部内容 -->
		<view class="comments-bottom">
			<view class="cmt-input">
				<input class='ipt' type="text" placeholder="发表神评妙论...">
				<button class='send'>发表</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"comment",
		props:{
			commentList:{
				type:Array
			},
			total:{
				type:Number
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
.comments{
	min-height: 200rpx;
	border-top: 30rpx solid #e5e5e5;
	background-color: #fff;
	padding: 30rpx 20rpx;
	.total{
		padding: 20rpx 0;
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
	}
	.no-comment{
		>view{
			margin: 60rpx auto;
		}
	}
}
.one-comment{
	margin-bottom: 30rpx;
	.commenter{
		position: relative;
		padding-left: 120rpx;
		
	}
	.left{
		position: absolute;
		top: 0;
		left: 10rpx;
		
	}
	.info{
		.name{
			padding-bottom:20rpx;
			font-size: 28rpx;
			color: #333;
		}
		.content{
			padding: 20rpx 0;
			font-size: 28rpx;
			color: #555;
		}
		.uptime{
			font-size: 24rpx;
			color: #999;
		}
	}
}


.comments-bottom{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 120rpx;
	border-top: 1px solid #e5e5e5;
	.cmt-input{
		padding: 16rpx 30rpx 60rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.ipt{
		display: block;
		width: 80%;
		height: 52rpx;
		line-height: 52rpx;
		outline: none;
		border: none;
		background: #e6e6e6;
		border-radius: 30rpx;
		padding: 0 18rpx;
	}
	.send{
		width: 120rpx;
		font-size: 28rpx;
		margin-left: 18rpx;
		outline: none;
		color: #fff;
		background: paleturquoise;
	}
}
</style>