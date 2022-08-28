import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
	state:{
		loginState:uni.getStorageSync('loginState')==='ok'?true:false,  //登录状态
		// userInfo:{
		// 	name:'未知用户',
		// 	commented:0
		// }
		userInfo:!!uni.getStorageSync('userInfo')?JSON.parse(uni.getStorageSync('userInfo')):{
			name:'未知用户',
			commented:0
		}
	},
	
	// getters:{  //购物车等需要用到此 获取
		
	// },
	mutations:{  //同步改变状态 方法
		userLogin(state,userInfo){ 
			state.loginState = true
			state.userInfo = userInfo  //更改状态
			// 由于刷新后会被重置，所以，将登录状态存入到storage中
			uni.setStorageSync('loginState','ok')
			uni.setStorageSync('userInfo',JSON.stringify(userInfo))
		},
		userLogout(state){  //退出登录
			state.loginState = true
			state.userInfo={
				name:'未知用户',
				commented:0
			}
		}
	},
	actions:{  //异步改变状态  通过调用mutations的方法
		userLoginAction(context,userInfo){
			context.commit('userLogin',userInfo)
		},
		userLogoutAction(contenxt){
			context.commit('userLogout')
			uni.clearStorageSync('loginState')
			uni.clearStorageSync('userInfo')
			uni.clearStorageSync('token')
		}
	}
})

export default store
