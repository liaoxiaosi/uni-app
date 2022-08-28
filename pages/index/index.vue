<template>
	<view class="indexwrap">
		<!-- 页面header相关部分 -->
		<!-- <navigator class='routena' open-type='navigate' :url='`/webview/webview?url=`+encodeURI("http://baidu.com")'>
					这是下一张
		</navigator> -->
		<view class="header-box">
			<!-- 顶部广告位轮播图 -->
			<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="2000" :duration="500">
				<swiper-item  v-for="item in swiperlist" :key='item.id' @tap="jumpto(item.url)">
					<image class='swimage' :src="item.imgurl" mode="aspectFill"></image>
					<view class="routena">
						{{item.title}}
					</view>
				 </swiper-item>
			</swiper>
		</view>
		
		<!-- 两个选项按钮 -->
		<view class="card-header">
			<view class="box">
				<view class="card-one card-left"  @tap="gotoTab('/pages/feeds/feeds')">
					<!-- <image class="img" mode="aspectFill"></image> -->
					<view class="right">
						<view class="title">精彩动态</view>
					</view>
				</view>
				<view class="card-one card-right" @tap="gotoTab('/pages/me/me')">
					<!-- <image class="img" mode="aspectFill"></image> -->
					<view class="right">
						<view class="title">个人中心</view>
					</view>
				</view>
			</view>
			
		</view>
		<!-- Tab选项卡 -->
		<view class="tabs-box">
			<view class="one-nav " :class="currentSwiperIndex===0?'nav-active':''" @tap="swiperChange(0)">推荐</view>
			<view class="one-nav" :class="currentSwiperIndex===1?'nav-active':''" @tap="swiperChange(1)">资讯</view>
		</view>
	
		<swiper  class="swiper-box" :style="'height:' + swiperHeight"  @change='change' :current="currentSwiperIndex" >
		
			<swiper-item class="swiper-item sns-now"  >
				<!-- ...动态页面瀑布流展示 -->
				<scroll-view class="feeds-box" scroll-y="true" ref='feedsRef' v-if='feedsList.length>=1'>
					<view class="feed-one" v-for='(item,index) in feedsList' :key="index">
						<navigator open-type="navigate" :url="'/subpages/feedinfo?id='+item.id">
							<image class="feed-img" :src='item.cover' mode="aspectFill" lazy-load="true"></image>
							<view class="u-line-2 feed-title" v-if='!!item.feed_content'>{{item.feed_content}}</view>
							<view class="feed-info">
								<view class="iview">
									<image :src="item.avatar" mode="aspectFill"></image>
									<text class="name">{{item.name}}</text>
								</view>
								<view class="iview">
									<view class="ilike" @tap.stop='clickLove(item)'>
										<image class="micon" v-if='item.has_like' src='@/static/lover.png'></image>
										<image class="micon" v-else src='@/static/love.png'></image>
										<text class="love-count" v-if="item.like_count>0">
											{{item.like_count}}
										</text>
									</view>
								</view>
							</view>
						</navigator>
					</view>
				</scroll-view>
				<view v-else class="nothing" style="text-align: center;margin-top: 80rpx; color:#999;">
					-----------暂无数据----------
				</view>
			</swiper-item>
		
			<swiper-item class="swiper-item sns-news" >
			<!-- 	...资讯页面列表展示 -->
				 <scroll-view class='new-box' scroll-y="true">
					<navigator open-type="navigate" :url="'/subpages/newsinfo?id='+item.id" class="one-new" v-for='(item,index) in newsList' :key='index' >
						<view class="left">
							<view class="title ">{{item.title}}</view>
							<view class="uinfo">
								<view class="iview">
									<text class="name">{{item.author}}</text>
								</view>
								<text class="uptime">{{item.created_at}} 发布</text>
							</view>
						</view>
						<view class="right">
							<!-- <image class="pic" mode="aspectFill" :src="item.cover"></image> -->
							<image class="pic" mode="aspectFill" src="/static/cute.jpg"></image>
						</view>
					</navigator>
				</scroll-view>
				<view v-if='feedsList.length==0' class="nothing" style="text-align: center;margin-top: 80rpx; color:#999;">
					-----------暂无数据----------
				</view>
			</swiper-item>
		</swiper>
		<!-- 分享按钮组件 -->
		<goto-share></goto-share>
		
		<!-- 未登录状态显示 -->
		<login ref='login'  v-if= '!loginState'/>
	</view>
</template>

<script>
	import { advertising } from '@/common/api/index.js'
	
	import { mapState } from "vuex"
	
	import todoLoveMixin from "@/mixins/todoLove.js"
	export default {
		mixins:[todoLoveMixin], //引入后，可以直接使用mixins中的方法 clickLove
		data() {
			return {
				title: 'Hello',
				swiperlist:[],
				//当前 推荐，资讯 滑动位置
				currentSwiperIndex:0,
				//动态列表数据
				feedsList:[],
				newsList:[],
				swiperHeight:'1000px',  //轮播器高度，要动态获取，否则会导致后增加的数据无法显示
			}
		},
		computed:{
				...mapState(['loginState','userInfo']) 
		},
		created(){
			console.log('???救命啊！！！！')
			console.log('???loginState---',this.loginState)
		},
		// async onLoad() { //aync 异步请求
		onLoad() { 
			// console.log('???获取到请求方法',advertising)
			
		
			// let advers = await advertising()  //获取到广告列表
			// 由于没有接口,此处将写死数据
			this.swiperlist=[{
					id:1,
					title:'天下武功，唯快不破！',
					url:'http://www.baidu.com',
					type:'text'
				},
				{
					id:2,
					title:'hhh，在线来一个皮卡丘~',
					type:'image',
					url:'http://www.baidu.com',
					imgurl:'https://www.baidu.com/link?url=RwQLjPU0OLLqYfq82gmnOWIkAftjDygCMqIybwdi5cbSs9Jl8D3CMP-L7R1oIask7PMhOOXW_iV96XNEhIU0mW1KgnaG0VtwNawCWtAW85BOVoj0DF20iNes1vKzed4aDabmOEpZa5sACsbbWEvkBbWyyaSpHXjTOwHhM1tHYNfnAbqePMSkC3ecsdyRRcO-tPT95OLyfeMKXo2Ar6BWKGIEQGSIXrtvu-mHKgvoFkHNdaZ9Ugl9eKys9rTgWvCDZ4t_11h2MWhmootew2TlC_UDGRuynT0WV6C5kGnOeo39jA2CcrPFoqhH4J5VLpwwdWm2uarBTQL4s8BNQVrHPjZ0UM7vM6Xriqt5exmWTZrSLWrOYsAaeIUNEOQPMCBAc2INABGhzIZVN3VGHDWYK6EcoSQ5O6zYQsLL25_0WAa1kNP8kCzjpIm_Cg9IqC9vx9aRJXeh7anQhEvPq5BhLIwUejKu0NCDc2AZ7lpKPbmcQn_r-yBF3R_wJlWWX8LAijXRCslW8RqlOCGP7XZYIu_-LmItCruGWuCDCmKhAlFPmhT8OF8xTWSpfoPicHRMDd7NMzSLnEBhgndt2Z4QwRZYbH7knvrZQYaHxGMOLkcquvHkQCDk-7SYIxRhwjgv0yNo_HEHK49VsUjrwBrKCS82xjRqxfbivM1wQryfXO4NjWAqF9hzGsygj0gfhQX3&wd=&eqid=e505ec370001e77a000000066304fb66'
				},
			]
			
			//初始化获取动态信息
			this.getFeeds()
			//获取资讯列表
			this.getNews()
			
			//用户发布新动态后，触发的行为 更新数据
			
			uni.$on('update',()=>{
				this.currentSwiperIndex=0
				this.feedsList = []
				this.getFeeds() //重新获取数据
			})
			
		},
		//动态,资讯部分，监听用户下拉动作,重新请求数据
		onPullDownRefresh(){
			
			if(this.currentSwiperIndex === 0){
				this.getFeeds()
			}else{
				this.getNews()
			}
			
		},
		/**
		 * 页面下拉触底事件的处理函数
		 */
		onReachBottom: function () {
		  
		  if(this.currentSwiperIndex === 0){
		  	this.getFeeds()
		  }else{
		  	this.getNews()
		  }
		 
		},
		methods: {
			//获取动态信息 异步
			// async getFeeds(){
			getFeeds(){
				// let feeds = await feedsList()  //获取到动态信息列表
				// 这里将数据写死
				let feedsList = [{
					id:1,feed_content:'发布动态测试',
					like_content:0,feed_view_content:20,
					has_like:false,
					user:{name:'小邋遢'},
					images:[{file:133,
						mime:"image/jpeg",
						size:500*313
					}]
				},
				{
					id:2,feed_content:'发布了，大人！',
					like_content:12,feed_view_content:20,
					has_like:true,
					user:{name:'如果我有超能力'},
					images:[{file:132,
						mime:"image/jpeg",
						size:500*313
					}]
				},
				{
					id:3,feed_content:'哎呀那就模拟！',
					like_content:12,feed_view_content:20,
					has_like:true,
					user:{name:'大坏蛋'},
					images:[{file:132,
						mime:"image/jpeg",
						size:500*313
					}]
				},
				{
					id:4,feed_content:'不不不，总裁不可以！',
					like_content:12,feed_view_content:20,
					has_like:true,
					user:{name:'小瓶盖'},
					images:[{file:132,
						mime:"image/jpeg",
						size:500*313
					}]
				}
				]
				
				
				console.log('数据啥情况----999',feedsList)
				//将图片列表进行加工,如果用户没有头像，那就使用默认头像
				//BaseFileURL：
				feedsList = feedsList.map(item=>{
					return{
						...item,
						cover:this.BaseFileURL + item.images[0].file,
						avatar:!!item.user.avatar ? item.user.avatar.url : '/static/cute.jpg',
						name:item.user.name
					}
				})
				this.feedsList = [...this.feedsList,...feedsList] //将后获取的数据添加到原来数据后面,用于分页时
			
				this.swiperHeight = this.feedsList.length *  110 + 'px' //大概是三百一个的高度
			
			},
			//获取 资讯列表 异步
			getNews(){
				// console.log('???这是咋啦')
				// let feeds = await newsList()  //获取到动态信息列表
				// 这里将数据写死
				let newsList = [{
					id:1,title:'千万不要这么做，我怕你会美哭',
					created_at:'2022-12-06 12:00',
					author:'女人，你别想逃',
					images:[{id:133,
						mime:"image/jpeg",
						size:500*313
					}]
				},
				{
					id:2,title:'女人，要学会穿衣服，来魔法世家',
					created_at:'2022-12-06 12:00',
					author:'哦,这该死的魅力！！',
					images:[{id:134,
						mime:"image/jpeg",
						size:500*313
					}]
				},
				{
					id:3,title:'女人，你逃不掉的',
					created_at:'2022-12-06 12:00',
					author:'哦,这该死的魅力！！',
					images:[{id:134,
						mime:"image/jpeg",
						size:500*313
					}]
				},
				{
					id:4,title:'给你一个小时，我要这个男人的全部资料',
					created_at:'2022-12-06 12:00',
					author:'哦,这该死的魅力！！',
					images:[{id:134,
						mime:"image/jpeg",
						size:500*313
					}]
				},
				{
					id:5,title:'给你一个小时，我要这个男人的全部资料',
					created_at:'2022-12-06 12:00',
					author:'哦,这该死的魅力！！',
					images:[{id:134,
						mime:"image/jpeg",
						size:500*313
					}]
				},
				{
					id:6,title:'给你一个小时，我要这个男人的全部资料',
					created_at:'2022-12-06 12:00',
					author:'哦,这该死的魅力！！',
					images:[{id:134,
						mime:"image/jpeg",
						size:500*313
					}]
				},
				{
					id:7,title:'给你一个小时，我要这个男人的全部资料',
					created_at:'2022-12-06 12:00',
					author:'哦,这该死的魅力！！',
					images:[{id:134,
						mime:"image/jpeg",
						size:500*313
					}]
				}]
				
				newsList = newsList.map(item=>{
					return{
						...item,
						cover:this.BaseFileURL + item.images.id
					}
				})
				this.newsList = [...this.newsList,...newsList]
			
				this.swiperHeight = this.newsList.length *  80 + 'px' //大概是三百一个的高度
			
			},
			
			jumpto(url){
				uni.navigateTo({
					// url:'/webview/webview?url='+encodeURI("http://www.baidu.com")
					url:'/webview/webview?url='+encodeURI(url)
				})
			},
			gotoTab(url){
				console.log('跳转啊',url)
				uni.switchTab({
					url:url
				})
			},
			//推荐，资讯 切换
			swiperChange(index){
				console.log('切换',index)
	
				//将滚动条置顶
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300,
					selector:'.indexwrap'
				});
				
				console.log('currentSwiperIndex',this.currentSwiperIndex)
				if(index==0){
					
					this.swiperHeight =  this.feedsList.length *  110 + 'px'
					this.swiperSnsHeight =  this.feedsList.length *  110 + 'px'
					this.currentSwiperIndex = index
				}else{
					this.swiperHeight = this.newsList.length *  80 + 'px'
					this.swiperNewsHeight = this.newsList.length *  80 + 'px'
					this.currentSwiperIndex = index
				}
				
			},
			change(item){
				// console.log(item)
				console.log('切换',item.detail.current)
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300,
					selector:'.indexwrap'
				});
				
				if(item.detail.current==0){
					this.getFeeds()
					this.currentSwiperIndex = item.detail.current
				}else{
					this.getNews()
					this.currentSwiperIndex = item.detail.current
				}
				
			},
			
			
		}
	}
</script>

<style scoped lang='scss'>
	
	.one-new{
		padding: 20rpx 30rpx 20rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #e5e5e5;
		
		.uinfo{
			display: flex;
			justify-content: space-between;
			align-items: baseline;
		}
		.left{
			flex: 8;
		}
		.right{
			flex: 2;
			text-align: right;
		}
		
		.title{
			padding-bottom: 30rpx;
			display: block;
			line-height: 50rpx;
			font-size: 32rpx;
			white-space: nowrap;
		}
		.pic{
			width: 100rpx;
			height: 100rpx;
			border-radius: 20rpx;
		}
		.name{
			font-size: 24rpx;
			color: #666;
			
		}
		.uptime{
			font-size: 20rpx;
			color: #999;
		}
	}
	.sns-now{
		/* padding: 0 15rpx; */
		width: 88%;
		margin: 0 auto;
		column-gap:10px;
		column-count:2;
		
		.feed-one{
			padding: 10rpx;
			padding-bottom: 30rpx;
			break-inside:avoid;
			margin-bottom: 10rpx;
			/* width: 50%; */
			/* width: 92%; */
			min-height: 300rpx;
			background: #fff;
			border-radius: 4rpx;
			
		}
		.feed-img{
			width:100%;
			min-height: 220rpx;
			height: auto;
			background-color: #dddddd;
		}
		.feed-title{
			padding: 20rpx 10rpx;
			font-size: 32rpx;
			
		}
		.feed-info{
			display: flex;
			justify-content: space-between;
			align-items: center;
			
		}
		.iview{
			padding: 0 15rpx ;
			image{
				margin-right: 9rpx;
				display: inline-block;
				width: 30rpx;
				height: 30rpx;
				border-radius: 50%;
				vertical-align: bottom;
			}
			.name{
				display: inline-block;
				color: #333;
				font-size: 24rpx;
				
			}
		}
	}
	
	.indexwrap{
		background: #e6e6e6;
	}
	.swiper-box{
		margin-top: 20rpx;
		.sns-news{
			background: #fff;
		}
	}
	.swiper{
		position: relative;
		background-color: cadetblue;
		
		.routena{
			position: absolute;
			top: 50%;
			left: 3%;
			font-size: 30rpx;
		}
		
		
		.swimage{
			display: block;
			height: 100%;
			width: 100%;
		}
	}
	
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	/* 推荐,资讯,按钮样式 */
	.tabs-box{
		position: relative;
		margin-top: -18rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 750upx;
	
		.one-nav{
			width: 120upx;
			color: #999;
			font-size: 32rpx;
			&.nav-active{
				color: $uni-color-primary;
			}
		}
	}
	.card-header{
		position: relative;
		padding: 20rpx 0 50rpx  0;
		width: 750upx;
		background: #e6e6e6;
		/* box-shadow: 0rpx 4rpx 12rpx lightblue; */
		.box{
			position: absolute;
			top: -50rpx;
			left: 0;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			width: 750upx;
		}
		
		.card-one{
		
			text-align: center;
			width: 250rpx;
			height:80rpx;
			line-height: 80rpx;
			border-radius: 50rpx;
			border: 1px solid #e5e5e5;
			background-color: #fff;
			box-shadow: 0rpx 4rpx 12rpx lightblue;
			
			&.card-right{
				left: 400rpx;
			}
			
			
		}
	}
</style>
