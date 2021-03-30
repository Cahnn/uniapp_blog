<template>
	<view>
		<form @submit="formSubmitSex">
			<view class="page-block" style="margin-top: 20upx;">
				<radio-group class="radio-sex" @change="sexChange">
					<label class="radio-single">
						<radio value="男" :checked="sex == '男'">男</radio>
					</label>
					<label class="radio-single">
						<radio value="女" :checked="sex == '女'">女</radio>
					</label>
				</radio-group>
			</view>
			<button type="primary" form-type="submit" class="submitBtn">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				sex:"未选择"
			}
		},
		onLoad() {
			uni.request({
				url:this.server_url+"/users/find",
				method:"POST",
				success: (res) => {
					this.userInfo = res.data.data[0]
					this.sex = res.data.data[0].sex
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods: {
			sexChange(e){
				this.sex = e.detail.value
			},
			formSubmitSex(){
				var me = this
				var sex = me.sex
				uni.request({
					url:me.server_url+"/users/modifySex",
					method:"POST",
					data:{
						"id":me.userInfo.id,
						"sex":sex
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

.radio-sex {
	display: flex;
	flex-direction: column;
}

.radio-single {
	padding: 20upx 20upx;
}

.submitBtn {
	width: 95%;
	margin-top: 40upx;
}
</style>
