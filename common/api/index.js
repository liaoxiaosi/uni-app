const http = uni.$u.http

// post请求，获取菜单
// export const postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
// export const getMenu = (data) => http.get('/ebapi/public_api/index', data)
 
  //获取文件 
 export const advertising = (data) => http.get('/advertisingspace/advertising?space=1,,2,3')

//文件上传操作
 export const uploadFile = async file=>{
	 let rfile=file
	 //兼容处理，如果是微信小程序
	 // #ifdef MP-WEIXIN 
	 rfile = uni.getFileSystemManager().readFileSync(file.path)
	 // #endif
	 
	 //将文件写入后台系统
	 let ufile = await uni.uploadFile({
		 url:http.config.baseURL + '/files',
		 header:{
			 AbortController:"Bearer" + uni.getStorageSync('token',)
		 },
		 name:'file',
		 file:rfile,
		 filePath:file.path
	 })
	 
	 console.log('文件上传',JSON.parse(ufile[1].data))
	 return JSON.parse(ufile[1].data)
 }