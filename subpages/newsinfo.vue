<template>
	<view>
		<!-- 顶部毛玻璃背景图 -->
		
		<pic-blur :params = "{
			width:'750rpx',
			height:'520rpx',
			image:newInfo.cover,
			blur:'xs'
		}"></pic-blur>
		<!-- 资讯详情 -->
		<view class="content">
			<view class="info-content">
				{{newInfo.content}}
			</view>
			<!-- 作者信息 -->
			<vie class="info-header">
				<text class="publish">{{newInfo.created_at}} 发布</text>
				<text>{{newInfo.views_count}} 阅读</text>
			</vie>
		</view>
		
		
		<!-- 评论 -->
		<comment :total='total' :commentList="commentList"></comment>
	</view>
</template>

<script>
	//引入毛玻璃组件
	import picBlur from '@/components/pic-blur.vue'
	
	// 引入评论组件
	import comment from '@/components/comment.vue'
	export default {
		data() {
			return {
				//当前按资讯详情
				newInfo:{
					content:'价格空间啊发动机ask放假啊发安居房打卡解放军阿娥姐啊空间大',
					title:'这个是测试标题',
					views_count:100,
					created_at:'2022-08-25',
					cover:'/static/cover.jpg'
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
				total:2,
				
			}
		},
		components:{
			picBlur,comment
		},
		onLoad(options){
			//options.id
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
.content{
	padding: 10px 30rpx 60rpx 30rpx;
}
</style>
