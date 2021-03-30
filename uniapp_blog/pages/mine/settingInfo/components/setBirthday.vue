<template>
	<view class="page page-fill">
		<form @submit="formSubmitBirthday">
			<view class="page-block" style="margin-top: 20upx;">
				<picker mode="date" @change="dataChange">
					<view class="birthday">
						{{birthday}}
					</view>
				</picker>
			</view>
			
			<button type="primary" form-type="submit" class="submitBtn">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				birthday:'',
				userInfo:{}
			}
		},
		onLoad() {
			uni.request({
				url:this.server_url+"/users/find",
				method:"POST",
				success: (res) => {
					this.userInfo = res.data.data[0]
					this.birthday = res.data.data[0].birthday
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods: {
			dataChange(e){
				this.birthday = e.detail.value
			},
			formSubmitBirthday(){
				var me = this
				var birthday = me.birthday
				uni.request({
					url:me.server_url+"/users/modifyBirthday",
					method:"POST",
					data:{
						"id":me.userInfo.id,
						"birthday":birthday
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

.birth-input {
	background-color: white;
	height: 80upx;
	line-height: 40upx;
	padding-left: 20upx;
}

.birthday {
	background-color: white;
	height: 80upx;
	padding-left: 20upx;
	padding-top: 30upx;
}

.submitBtn {
	width: 95%;
	margin-top: 40upx;
}
</style>
