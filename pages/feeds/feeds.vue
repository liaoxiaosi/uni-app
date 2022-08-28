<template>
	<view class='refeeds'>
		<view class="one-feeds-box">
			<view class="one-feed"  v-for="(list,i) in showArrList" :key='i'>
				<!-- <navigator> -->
				<!-- 大图有可能 ：左。右 -->
				<!-- k%6 === 0 说明是第一张照片，否则就要 -->
				<!-- i%2 === 0 ->等于0，表示是2的倍数，即 2，4，6，8 那就是大图是第二张-->
				<view v-for='(item,k) in list'
				 class='feedItems'
					:class='k%6 === 0  ? (i%2 === 0 ? "feed-big-left": "feed-big-right") :""'
				 :key="k"
				 >
					<navigator class="feed-content" :url="'/subpages/feedinfo?id='+item.id">
						<view >{{item.id}}</view>
					<!-- <image :src="item.cover" lazy-load="true" class="feed-content" mode="aspectFill"></image> -->
					</navigator>
				</view>
					
				<!-- </navigator> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feedsList:[],  //一维数组，作为数据源
				showArrList:[], //要展示的二维数组
			}
		},
		onLoad(){
			this.getData()
		},
		//动态,资讯部分，监听用户下拉动作,重新请求数据
		onPullDownRefresh(){
			//将之前的数据清空
			this.feedsList=[],  //一维数组，作为数据源
			this.showArrList=[], //要展示的二维数组
			
			this.getData()
			
		},
		/**
		 * 页面下拉触底事件的处理函数
		 */
		onReachBottom: function () {
		  
		  this.getData()
		 
		},
		methods: {
			getData(){
				//模拟数据，将图片写死
				// cover:this.BaseFileURL + xxx
				let feeds = []
				for(let i=0;i<18;i++){
					let obj = {
							id:i,
							cover:'/static/cute.jpg'
						}
					feeds.push(obj)
				}
				// this.feedsList = feeds  
				this.feedsList = [...this.feedsList,...feeds]  //分页的时候
				
				let showArrList = []
				//六条数据作为一个二维数组
				for(let i=0;i<this.feedsList.length;i++){
					// i%6===0 表示没有余数，即是六个，刚好是6的倍数
					//!!this.feedsList[i+5] => 表示，第六个数值要存在
					if(i%6  === 0 && !!this.feedsList[i+5]){
						//slice返回新数组，不改变原数组
						showArrList.push(this.feedsList.slice(i,i+6))  //截取六个数据
						
					}
				}
				console.log('????showArrList',showArrList)
				// this.showArrList = showArrList
				this.showArrList =[...this.showArrList,...showArrList]  //追加分页内容
				
			}
		}
	}
</script>

<style lang="scss">
	.refeeds{
		background-color: #fff;
		padding-bottom: 20upx;
	}
.one-feeds-box{
	width: 704upx;
	margin:4upx 22upx 0 22upx;
	
	// //定义栅格布局
	// display: grid;
	// //定义栅格每一列的宽度
	// grid-template-columns: 232upx 232upx 232upx;
	// //定义栅格，每一行的高度
	// grid-template-rows: 232upx  232upx 232upx;
	
	// //grid-row-gap 属性设置行与行之间的距离  grid-column-gap设置列与列之间的距离
	// grid-row-gap: 4upx;
	// grid-column-gap: 4upx;
	// background-color: #dadada;
	
	
	.one-feed{
		position: relative;
		background-color: #dadada;
		
		//定义栅格布局
		display: grid;
		//定义栅格每一列的宽度
		grid-template-columns: 232upx 232upx 232upx;
		//定义栅格，每一行的高度
		grid-template-rows: 232upx  232upx 232upx;
	
		//grid-row-gap 属性设置行与行之间的距离  grid-column-gap设置列与列之间的距离
		grid-row-gap: 4upx;
		grid-column-gap: 4upx;
		background-color: #dadada;
		.feedItems{
			.feed-content{
					width: 100%;
					height: 100%;
					border: 1px solid #eee;
				}
				
			
			&.feed-big-left{
				/* //网格开始的位置 */
				grid-column-start: 1;
				/* 纵向网格结束的位置 */
				grid-column-end: 3;
				 /* //水平网格开始的位置 */
				grid-row-start: 1; 
				grid-row-end: 3;
				// background-color: #dadada;
				background-color: darkcyan;
				
			}
			&.feed-big-right{
				grid-column-start: 2;
				grid-column-end: 4;
				grid-row-start: 1;
				grid-row-end: 3;
				// background-color: #dadada;
				background-color: darkseagreen;
			}
			
		}
		
			
		
	}
	
}
</style>
