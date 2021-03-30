<template>
	<view class="page page-fill">
		<form @submit="formSubmitNickName">
			<view class="page-block" style="margin-top: 20upx;">
				<input 
					type="text" 
					name="nickname" 
					:value="userInfo.nickname" 
					class="input" 
					placeholder="请输入昵称"
					placeholder-class="graywords"
					maxlength="20">
			</view>
			
			<button type="primary" form-type="submit" class="submitBtn">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			formSubmitNickName(e){
				// 通过e获取昵称
				var me = this
				var nickname = e.detail.value.nickname
				console.log("修改昵称")
				uni.request({
					url:me.server_url+"/users/modifyNickname",
					method:"POST",
					data:{
						"id":me.userInfo.id,
						"nickname":nickname
					},
					success(res){
						uni.navigateBack({
							// 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
							delta:1
						})
					}
				})
			}
		}
	}
</script>

<style>
/* 页面铺满屏幕 */
.page-fill {
	width:100%;
	height: 100%;
	position: absolute;
}

.graywords {
	color: #EAEAEA;
}

.input {
	height: 80upx;
	line-height: 80upx;
	width: 500upx;
	margin-left: 40upx;
}

.submitBtn {
	width: 95%;
	margin-top: 40upx;
}
</style>
