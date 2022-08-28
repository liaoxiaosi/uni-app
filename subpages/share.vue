<template>
	<view class="share">
		<!-- 内容输入框 -->
		<view class="uni-textarea">
			<textarea placeholder-style="color:'#aaa'" placeholder="添加描述..." @input="bindTextAreaInput"></textarea>
		</view>
		
		<!-- 内容发布 -->
		<view class="pics">
			<view class="medias" v-for='(image,index) in uploadPicsList' :key='index'>
				<image
					class='img'
					:src="image.path"
					:data-src='image'
					@tap='previewImage(index)'
					mode='aspectFill'
				></image>
				<view class='iclose'>
					<u-icon  name='close' color='#eee' size='20' @tap='removeImg(index)'></u-icon>
					
				</view>
			</view>
		</view>
	
		<!-- 选择照片按钮 -->
		<view class="uploadBtn" @tap="chosePicAndUpload" v-if='uploadPicsList.length < 9'>
			<u-icon name='plus' size='60' color='#aaa'></u-icon>
		</view>
			<view class="text">选择照片</view>
		
		<!-- 发布按钮 -->
		<view class="btns">
			<button type='primary' size='default' @click='sendFeed' :disabled='uploadStatus'>发布</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feedInfo:'',
				uploadPicsList:[],  //预置图片的上传列表
				// 发布状态控制器 即是否可以发布
				uploadStatus:false
			}
		},
		methods: {
			bindTextAreaInput(e){
				// console.log('???e',e)
				let value = e.detail.value
				this.feedInfo = value
				if(value === ''){
					this.uploadStatus = false
				}
			},
			//选择并上传图片
			chosePicAndUpload(){
				let count = 9 - this.uploadPicsList.length  //最多只能十张，判断还能上传多少张
				if(this.uploadPicsList.length>=9){
					uni.showToast({
						title:'最多选择9张照片',
						icon:'success',
						duration:1000
					})
					count = 0
					return false
				}
				
				//如果还没有够9张，可以继续上传
				uni.chooseImage({
					count,  //代表最多选择几张
					sizeType:['compressed'],  //可以指定是原图还是压缩图，默认二者都有
					sourceType:['album','camera'],  //可以拍照，也可以从相册选择
					success:res=>{
						// 上传成功后,将该图片存入到图片数组中
						this.uploadPicsList = [...this.uploadPicsList, ...res.tempFiles]
						//如果大于9张，将图片截取前面九张
						if(this.uploadPicsList.length>9 ){
							this.uploadPicsList = this.uploadPicsList.slice(0,9)
						}
					}
				})
			},
			// 图片预览
			previewImage(index){
				console.log('index 预览',index)
				//获取到要预览图片的地址
				let current =this.uploadPicsList[index].path
				
				let urls = []  //要预览的列表，可进行左右滑动查看图片
				this.uploadPicsList.map(item=>{
					urls.push(item.path)
				})
				uni.previewImage({
					current:current,  //当前要预览的图片
					urls,
				})
			},
			// 图片删除
			removeImg(index){
				this.uploadPicsList = this.uploadPicsList.slice(index,1)
			},
			//发布动态
			async sendFeed(){
				//如果描述为空，不仅女性发布
				if(this.feedInfo === ''){
					uni.showToast({
						title:'描述不能为空',
						icon:'loading',
						duration:1000
					})
					this.uploadStatus = false
					return
				}
				
				//必须选择一张图片
				if(this.uploadPicsList.length==0){
					uni.showToast({
						title:'请选择图片',
						icon:'loading',
						duration:1000
					})
					this.uploadStatus = false
					return
				}
				
				// 如果有表述,也有图片,那就要将图片发给后台,需要循环遍历发送
				// 时间会比较长,加个动态发布中提示,且要加个异步事件promise all
				uni.showToast({
					title:'动态发布中',
					icon:'loading',
					duration:6000
				})
				
				let upStatusArr = []
				//遍历上传多图
				this.uploadPicsList.map(file=>{
					// upStatusArr.push(xxxxx(file))   //目前没有接口，注释掉
					//xxxxx(file) 调用后台接口进行上传，得到返回的id ，或者是啥凭证
				})
				
				let images = []  //这是要传给后台的图片id 数组
				// 加个异步事件Promise.all 所有异步事件都成功后才会执行它
				(await Promise.all(upStatusArr).map(item=>{
					images.push({id:item.id})
				}))
				
				//图片上传成功后，将图片id 和描述，传给后台，发布动态
				//没有接口，注释掉
				// let pres = await this.xxx({
				// 	feed_content:this.feedInfo,  //描述内容
				// 	images  //图片id数组
				// })
				// 假设发布成功,后台返回结果是 '发布成功' ，pres 就是后台返回的结果
				//  if(pres.message=='发布成功'){
				// 	 uni.hideToast() ;  //先清掉toast 避免之前的toast还在
				// 	 uni.showToast({
				// 	 	title:'动态发布成功',
				// 	 	icon:'success',
				// 	 	duration:1000,
				// 		success:()=>{  //toast消失后，将发布页的数据重置，并跳回上一页
				// 			this.feedInfo = ''
				// 			this.uploadStatus = false
							
				// 			//发布成功后，手动触发首页事件，更新首页动态列表
				// 			//可以使用emit方法 告诉父组件 ，父组件用 $on进行订阅
				// 			uni.$emit('update')
				// 			uni.navigateBack({
				// 				delta: 1
				// 			})
							
				// 		}
				// 	 })
				//  }else{
				// 	 // 失败,还
				// 	 uni.hideToast() ;  //先清掉toast 避免之前的toast还在
				// 	 uni.showToast({
				// 	 	title:'动态发布失败',
				// 	 	content:pres.data.message,
				// 		complete:()=>{  //是否返回上一页，看需求
				// 			uni.navigateBack({
				// 				delta: 1
				// 			})
				// 		}
				// 	 })
					 
				// 	 this.uploadStatus = false
				//  }
				
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.share{
		padding: 30rpx;
	}
.uni-textarea{
	margin: 0 10rpx;
	padding: 10px;
	border: 1px solid #e5e5e5;
	
}
.btns{
	position: fixed;
	bottom: 30rpx;
	left: 0;
	right: 0;
	
	margin: 0 30rpx;
}
.pics{
	margin: 30rpx 0;
	display: flex;
	justify-content: flex-start;
	.medias{
		position: relative;
		padding: 10rpx;
		border: 1px solid #e6e6e6;
		image{
			width: 100rpx;
			height: 100rpx;
		}
		.iclose{
			position: absolute;
			top: 0;
			right: 0;
		}
	}
}

.uploadBtn{
	padding: 10rpx;
	width: 120rpx;
	height: auto;
	border: 1px solid #e5e5e5;
}
</style>
