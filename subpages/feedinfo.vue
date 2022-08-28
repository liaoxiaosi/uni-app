<template>
	<view>
		<view class='detailbox'>
			<view class="feed-user">
				<u-avatar size='60' class='avatar' :src='feedInfo.avatar'></u-avatar>
				<view class="info">
					<text>{{feedInfo.name}}</text>
				</view>
			</view>
			<!-- 分享转发： 转发次数统计 -->
			<!-- #ifdef MP-WEIXIN -->
			<button onpen-type='share'>
				分享
			</button>
			<!-- #endif -->
			<!-- 分享转发： 转发次数统计 -->
			
			<view class="feed-info">
				<view class="title" v-if='!!feedInfo.feed_content'>{{feedInfo.feed_content}}</view>
				<view class="other">
					<text>{{feedInfo.created_at}} 发布</text>
					<text>{{feedInfo.feed_view_count}} 阅读 {{feedInfo.feed_like_count}} 点赞</text>
				</view>
			</view>
			
			
		</view>
		<!-- 评论 -->
		<comment :total='total' :commentList="commentList"></comment>
	</view>
	
</template>

<script>
	// 引入评论组件
	import comment from '@/components/comment.vue'
	export default {
		data() {
			return {
				feedInfo:{
					feed_view_count:10,
					feed_like_count:8,
					avatar:'/static/cute.jpg',
					created_at:'2020-2-02-25 12:00',
					name:'爱吃鲱鱼罐头的小仙女',
					feed_content:'女人，你逃不出我的手掌心的，你别痴心妄想了...'
				},
				commentList:[{
					body:'这是世界上最时髦的评论',
					created_at:'2022-08-09 :12:00',
					user:{
						name:'二狗子它傻了',
						avatar:'',
					}
					},
					{
						body:'hah哈哈哈哈，太好笑了',
						created_at:'2022-08-09 :12:00',
						user:{
							name:'欧阳土根',
							avatar:'',
						},
						}
				
				],
			}
		},
		components:{
			comment
		},
		onLoad(options){
			console.log('???获取到参数，',options)
			//根据拿到的id 获取对应的数据，这里不实行，直接假数据
			//设置分享
			// #ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket:true,
				menus:['shareAppMessage','shareTimeline']
			})
			// #endif
		
		},
		methods: {
			
		}
	}
</script>

<style scoped> 
.detailbox{
	padding: 20rpx;
}
.title{
	padding: 40rpx 0;
	font-size: 32rpx;
}
.other{
	font-size: 24rpx;
}
</style>
