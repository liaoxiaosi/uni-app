<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(options){
			// this.url = decodeURIComponent(options.url)
			this.url = decodeURI(options.url)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
