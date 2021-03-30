<template>
	<view class="loginPage">
		<view class="topImage">
			<image
				src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3100338932,2256022770&fm=26&gp=0.jpg"
				style="width: 150upx;height: 150upx;">
			</image>
		</view>
		<input :value="userInfo.account" placeholder="输入帐号"  @input="accountInput"/>
		<input :value="userInfo.password" password="true" placeholder="输入密码" @input="passwordInput"/>
		<button @click="login">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account:'',
				password:'',
				userInfo:{}
			}
		},
		onLoad() {
			uni.request({
				url:this.server_url+"/users/find",
				method:"POST",
				success: (res) => {
					this.userInfo = res.data.data[0]
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods: {
			accountInput(e){
				this.account = e.target.value
			},
			passwordInput(e){
				this.password = e.target.value
			},
			login(){
				uni.switchTab({
				 	url:'../home/home'
				})
				// if(this.account == this.userInfo.account && this.password == this.userInfo.password){
				// 	uni.switchTab({
				// 		url:'../home/home'
				// 	})
				// }else if(this.account != this.userInfo.account || this.password != this.userInfo.password){
				// 	uni.showToast({
				// 		title:"帐号或密码错误!",
				// 		icon:'none'
				// 	})
				// }
			}
		}
	}
</script>

<style scoped>
.loginPage{
	width: 100%;
	height: 100%;
	position: fixed;
	/* background-color: #272636; */
}
.topImage{
	text-align: center;
	margin-top: 300upx;
}
input{
	width: 85%;
	height: 100upx;
	padding-left: 30upx;
	border-radius: 50upx;
	margin: 40upx auto;
	border: 1px solid #272636;
}
button{
	width: 30%;
	height: 90upx;
	border-radius: 50upx;
	margin: 0 auto;
	background: none;
	color: #272636;
	border: 1px solid #272636;
}
</style>
