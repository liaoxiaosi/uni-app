### 从零到一构建【社区论坛类】客户端应用项目，输出相关web H5、微信小程序、安卓APP、IOS APP多客户端应用。

项目构建
    1.使用hbuilderx uni-app默认模板 ,选择uni-app

	2.在manifest.json中配置微信小程序相关信息
	   获取appId ,在微信公众号和创建小程序，获取appid
	   
	3.构建项目基础结构
	  common            公用插件，比如api统一配置
	  components        自定义组件
	  mixins            mixins复用数据方法
	  node_modules      npm安装依赖，比如 vViewUi
	  pages             页面
	  static            静态资源，比如：图片，测试的json文件
	  store             vuex 状态管理
	  subpages          分包页面
	  tools             工具方法
	  unpackage         打包输出
	  App.vue           顶层app组件
	  main.js           main.js全局配置
	  manifest.json     应用配置
	  package.json      页面配置，比如：路由，tabBar
	  uni.scss          基础css 自动引入
	
    4.pages.json 初始化基础页面及配置 pages路由
	  有三个tab 
    5.使用npm引入uView ui插件库
	  1.使用hbuilderx 导入插件uviewui 或者使用npm 安装相关依赖 （推荐使用npm）
		  npm init -y
		  npm install uview-ui
		  npm update uview-ui
	   2.main.js 引入uview库
	    import uView from 'uView-ui'
		Vue.use(uView)
	   3.编辑器安装相关依赖 工具-插件安装 - scss 编译支持
	
	实现：
	   安装uView ,打开编辑器终端 ，npm install uview-ui
	   main.js引入框架
	   
	   uni.scss 中引入uView的主题文件 theme.scss:
	   @import 'uview-ui/theme.scss';
	   
	   App.vue引入基础样式
	    @import 'uview-ui/index.scss';
	   
	   如果编辑器没有安装scss会报错，安装
	   
	   按需引入
	      pages.json中配置
		  "easycom":{
			  //下载安装的方式需要签名的@/ ,npm安装不需要
			  "^u-(.*)":"uview-ui/components/u-$1.vue"
		  }
### 首页功能实现
    
    1.首页header广告位轮播图功能实现
	    
		关键技术点：
		    1.swiper轮播图组件的使用
			2.使用this.$u.get/post异步请求数据
			3.使用v-for循环遍历渲染轮播内容
			

        点击跳转到对应网站，需要用到webview
		    创建文件夹webview,创建webview.vue页面
			webview.js 中只需要放<web-view src></web-view> 组件
			调用地址是通过路由传过来的参数:
			<navigator open-type='navigate' url='`/pages/webview/webview?url=`+encodeURI("http://baidu.com")'></navigator>
			或者
			uni.navitateTo({
				url:'/pages/webview/webview?url=http://baidu.com'
			})
			
			webview.js中通过onLoad获取参数：参数即为要跳转的外网地址
			onLoad(options){
				this.url = decodeURI(options.url)
			}
			
			但是一般需要对参数进行转码和解码的工作
			在开发者工具里，详情，本地设置那里，开发过程中，勾选，不校验合法域名
			
			点击事件：@tap='xxxx'
			
### 网络http请求拦截 及API集中管理
	    创建common 文件，用来存放公用插件，api统一配置文件等
		创建js，request.js 用于对数据请求进行响应，拦截处理
			
		api集中管理，建一个api文件夹	
		
		main.js引入
		在onLoad或者onShow中使用
		如过要异步 async onLoad() await xxx()

### 首页 [推荐，资讯]，平滑切换实现
###     关键技术点：  
#3     1.使用轮播其，不自动播放，来构建一个左右滑动切换页面的效果
#3     2.需要注意的是，轮播其的高度要设置一个固定值
		
		
2. 首页推荐 使用瀑布流布局效果
	3. 瀑布流布局，核心是基于一个网格的布局，而且每行宝航的项目列表高度是随机的
	4. （随着自身内容动态变化高度）。同时每个项目列表呈现堆栈姓氏列表，最为关键的是，堆栈之间彼此没有多余的间距差存大
	5. 实现瀑布流的解决方案，可以使用css3布局来实现，也可以使用js脚本实现，使用css3实现的代码如下
	6.  //这里的关键属性是column-count,设置列数为2，然后是break-inside:avoid,为了控制文本块分解成单独的列
	7.  以免项目列表内容跨列，破坏整体布局，这样就是心啊了瀑布流布局
	 
	.waterfall{
		width:88%;
		margin:0 auto;
		瀑布流容器内元素的间距
		column-gap:10px;
		瀑布流容器内排列的列数
		column-count:2;
		...
	}
	.item{
		padding:10px;
		margin-bottom:10px;
		avoid避免在主题库中插入任何中断
		break-inside:avoid;
	}
	
## 使用css3实现瀑布流布局，性能高于js，缺点是用户体验差，比如：移除数据，更新数据会造成整个页面结构的复杂变化，
## 让用户突然失去焦点的感觉非常不友好，所以用js实现，又是也是比骄傲明显的，这里使用uViewUI的瀑布流插件来实现
#   注意:uView2.x版本已经将waterfall去掉了
   <u-waterfall v-model=flowList" ref="uWaterfall">
       <template v-slot:left = "{leftList}">
			<view v-for="(item,index) in leftList" :key='index'>
				这里写的是自定义内容，item为传递给v-model的数组元素
			</view>
	   </template> 
	   <template v-slot:left = "{rightList}">
			<view v-for="(item,index) in rightList" :key='index'>
				这里写的是自定义内容，item为传递给v-model的数组元素
			</view>
	   </template> 
	<u-waterfall>
	methods:{
		remove(id){
			this.$refs.uWaterfall.remove(id)
			
		},
		clear(){
			this.$refs.uWaterfall.clear()
		}
	}
	//文件获取： GET /files/:file
	  这里的 :file虽然叫文件，实际是系统中的file_with标识，例如上传返回的都是file_with 标识
	//图片文件地址，由于都有统一的信息，在main.js统一设置
	//设置文件访问基础地址信息,地址是服务器地址，这里是假的，全局注册，这样哪里都能获取
	Vue.prototype.BaseFileURL = 'http://47.115.83.135/api/v2/files'
### 资讯动态相关页面功能实现
   ### 技术关键点
	   ### 动态请求数据，并对数据进行加工处理
	   ### grid栅格化布局
	   ### 滚动置底请求数据
	   ### 请求状态控制器
	   分析：
	       布局分为两个模块，第一张是大图
		   1.6张图
		          2
			    1 3
			  6	5 4
			2.大图的位置变成右边
			  1 
			  2  6
			  3  4  5
	    所以，应该是一个二维数组，数组中，每个数组5个为一个数组
		
		
### 资讯详情页面 富文本解析功能实现
  ##  技术要点：1.顶部毛玻璃插件的引入及使用 
     //引入毛玻璃组件
	 import picBlur from '@/components/pic-blur/pic-blur.vue'
	 
	 components:{
		 picBlur
	 }
	 //顶部毛不利背景图 可选值 xs s m l xl
	 
	 <pic-blur :params="{
		 width:'750rpx',
		 height:'520rpx',
		 image:newInfo.caver,
		 blur:'xs'
	 }"></pic-blur>
   ##  2.资讯详情内容 富文本内容 深度解析  需要安装相关插件
		import htmlPares from '@/components/html-parse/html-parse.vue'
		
		<view class='info-content'>
		     <html-parse :content='newInfo.content' />
		</view>
		
		async onLoad(option){
			//分享
			wx.showShareMenu({
				withShareTicket:true,
				menus:['shareAppMessage','shareTimeline']
			})
			
			let res = await this.getNewInfo(optinos)  //调用获取详情接口
			
			res=res.data
		}
		
### 在详情页 展示评论，以及评论功能	
		创建 comment组件
		在两个详情页设置分享共功能
		//设置分享 该功能旨在微信平台有，所以要类型断言
		// #ifdef MP-WEIXIN
		wx.showShareMenu({
			withShareTicket:true,
			menus:['shareAppMessage','shareTimeline']
		})
		// #endif

### 用户登录，注册功能组件实现以及触发显示
  ##  关键技术 
  ##   1.获取当前微信用户的 昵称，头像信息 
  ##   2用u-form实现登录，手机注册，邮箱注册基础逻辑
  ##   
  #   由于该组件多处都需要使用，在main.js中引入
  #   
  #   使用功 vuex + storage 实现登录状态管理
       1.创建目录：store
	   2.main.js 引入store
	   
### 使用mixins实现动态点赞，取消功能的实现
### @tap.stop :阻止事件冒泡
   该业务性操作多个地方使用，所以使用mixins

### 发布一条动态，或者资讯 ，做成一个公用组件
    gotoShare
##  在main.js中引入该公用组件
##  
##  share中，
##  选择并上传图片
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
	
### 多端打包发布
## 此项目是基于小程序开发的，所以，应该兼容安卓或app，或ios ,在这里进行查看

# 第一个问题：在login组件中，使用了微信小程序的 '一键登录'，所以应该对其进行终端判断
#      解决，使用类型断言，编译器判断 //#ifdef //#endef
#      <!-- #ifdef MP-WEIXIN--> 
##     <button>一键登录</button>
#      <!-- #endif -->

# 第二个问题，在login组件中，获取用户信息，只能在微信小程序平台获取，所以该标签也要进行类型判断
# 	//如果是在微信小程序平台，那就获取用户信息
	// #ifdef MP-WEIXIN
	getUserInfoTag:true, // 是否获取用户信息
	// #endif
	
	//除了微信小程序平台，都不获取用户信息
	// #ifndef MP-WEIXIN 
	getUserInfoTag:false,
	// #endif
# 3.login组件的created 生命周期中，使用了微信小程序的api wx.getSetting,进行判断用户是否授权
	
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
### h5中，（比如在浏览器查看）出现接口都是404的情况下，就是微信端和非微信端使用的服务器不是同一个时
### ，在manifest.json中配置相关信息
### 在源码视图中配置 代理服务器，配置完后重启（重新运行）才能生效
 "h5":{
 	"devServer": {
 		"port": 8080, //端口号
 		"disableHostCheck":true,
 		"proxy":{
 			//使用代理
 			"/api":{
 				"target":"http://47.115.83.135/api:v2",
 				"changeOrigin":true,
 				"pathRewrite":{
 					"^/api":""
 				}
 			}
 		}
 	}
 }
 
 # 同时在request.js中，baseURL就要相应的修改
	/* config 为默认全局配置*/
		// #ifdef H5
			config.baseURL = '/api'; /* 请求代理域名 */
		// #endif
		
	// #ifndef H5
		config.baseURL = 'http//47.115.83.135/api/v2/'; /* 域名 */
		// #endif

# 如果要模拟app ，在手机上模拟，可以 发行 -> 原生APP本地打包，会有一个app的安装文件 apk

# 或者时原生app云打包，
# 注意：使用公共测试证书，  打包时会出现错误，要去manifest.js文件中配置app图标




