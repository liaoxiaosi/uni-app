<template>
	<view class='login' :class="{show:show}">
		<vie class="mask" @tap='closeLogin'></vie>
		<view class="container" v-if='!getUserInfoTag'>
			<view>如果当前平台不是微信，那就让它显示这里，这个模块可以是登录，或者注册</view>
		</view>
		<view class="container" v-if='getUserInfoTag'>
		<!-- <view class="container" v-if='show'> -->
			<view class="close" @tap='closeLogin'>x</view>
			<view class="p-name" >
				hahha,欢迎你
			</view>
			<!-- 该按钮只在微信小程序显示 -->
			<!-- #ifdef MP-WEIXIN-->
			<button type='primary' v-if='show' open-type="getUserInfo" @getuserinfo='getWechUserInfo'>
				一间获取微信信息
			</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import { mapActions } from "vuex"
	export default {
		name:"login",
		data() {
			return {
				show:true, //是否显示该组件
				//如果是在微信小程序平台，那句获取用户信息
				// #ifdef MP-WEIXIN
				getUserInfoTag:true, // 是否获取用户信息
				// #endif
				
				//除了微信小程序平台，都不获取用户信息
				// #ifndef MP-WEIXIN 
				getUserInfoTag:false,
				// #endif
				
			};
		},
		created(){
			// wx.getSetting 授权检测
			// 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
			// 该方法只在微信平台生效
			
		// #ifdef MP-WEIXIN
		
			wx.getSetting({
				success:res=>{
					uni.getUserInfo({
						success:res=>{
							this.getUserInfoTag = false
							console.log('用户已授权')
						},fail:()=>{
							console.log('用户未授权')
						}
					})
					
				}
			})
			
			// #endif
		},
		methods:{
			...mapActions(['userLoginAction']),
			//关闭弹窗
			closeLogin(){
				console.log('???')
				this.show = false
			},
			//关闭弹窗
			openLogin(){
				this.show = true
			},
			//跳转到 H5 页面
			gotWeb(url){
				wx.navigateTo({
					url:'/pages/webview/webview?url=' + encodeURI(url)
				})
			},
			//登录完成后，将vuex数据 状态进行修改
			loginAfter(){
				//在storage 中保存token
				// uni.setStorageSync('token','xxxxx')
				//修改vuex 中状态  调用方法 userLoginAction
				
				//按理说，应该是通过输入框输入进行登录，然后获取输入框中的姓名等，存起来
				let userInfo={
					name:'啊哈哈哈哈',
					commented:123
				}
				this.userLoginAction(userInfo)
				
			},
			//微信授权
			getWechUserInfo(){
				uni.getUserInfo({
					success:res=>{
						//进行下一步操作
						this.getUserInfoTag = false
						this.show = false
						
						// 更改状态
						// uni.setStorageSync('token','xxxx')
						this.userLoginAction({name:'我是小可爱啊',commented:0})
						
						console.log('用户已授权')
					},
					fail:()=>{
						//用户未授权
						console.log('用户未授权')
					}
				})
			}
		}
		
	}
</script>

<style scoped lang="scss">
	
.login{
	display: none;
	&.show{
		display: block;
	}
	.container{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 410rpx;
		width: 100%;
		background: #fff;
		z-index: 100;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		box-shadow:  4px -2px 15px rgba(0, 0, 0, 0.2);
		.close{
			position: relative;
			font-size: 40rpx;
			padding: 20rpx 40rpx;
			height: 60rpx;
			text-align: center;
			line-height: 60rpx;
			text-align: right;
			z-index: 100;
			
		}
	}
}
.mask{
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 99;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.6);
}
</style>