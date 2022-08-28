//点赞，取消点赞 
//mixin有vue的所有生命周期
let todoLoveMixin = {
	methods:{
		//点赞时，需要确认是否处于登录状态
		clickLove(item){
			//判断是否处于登录状态
			//此处的this 是引用这个mixins的上下文
			console.log('this.loginState',this.loginState)
			if(!this.loginState){
				// console.log('进入到此方法了')
				console.log('获取到login对象',this.$refs.login)
				this.$refs.login.openLogin()    
				
				//这个方法是login组件的方法，如果要调用这个方法，使用该mixin的组件需要
				//需要使用login 这个组件，在pages/index.vue中使用了这个组件，可直接使用
				return 
			}
			
			//动态点赞，或取消点赞
			if(item.has_like){
				--item.like_count   //点赞数-1
				item.has_like = false  //取消点赞
				console.log('取消点赞')
				
				// await xxxx  //调用取消点赞接口，进行取消点赞
				
				uni.showToast({
					title:'取消点赞',
					icon:'success',
					duration:1000
				})
			}else{
				++item.like_count   //点赞数 +1
				item.has_like = true  //点赞
				console.log('点赞成功')
				
				// await xxxx  //调用点赞接口，进行取消点赞
				
				uni.showToast({
					title:'点赞成功',
					icon:'success',
					duration:1000
				})
				
			}
		}
		
	}
}

export default todoLoveMixin