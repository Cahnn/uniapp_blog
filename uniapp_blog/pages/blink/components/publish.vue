<template>
	<view>
		<textarea :value="text" v-model="text" @input="textInput" placeholder="此刻的想法...(最多只能输入100个字符)" maxlength="100"></textarea>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="demo">
				<block v-if="imageSrc">
					<image :src="imageSrc" name="photo" class="image" mode="widthFix"></image>
				</block>
				<block v-else>
					<view class="uni-hello-addfile" @click="chooseImage">+ 选择图片</view>
				</block>
			</view>
		</view>
		<view class="tag">
			<input :value="tag" v-model="tag" @input="tagInput" placeholder="输入标签..." />
		</view>
		<view class="publish">
			<button @tap="public">发布Blink</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					imageSrc: '',
					text:'',
					tag:''
			}
		},
		onUnload() {
			this.imageSrc = '';
		},
		methods: {
			textInput(e){
				this.text = e.target.value
			},
			tagInput(e){
				this.tag = e.target.value
			},
			public(){
				uni.request({
					url:this.server_url+'/blink/add',
					method:"POST",
					header:{
						// 固定格式
						'content-type':'application/x-www-form-urlencoded'
					},
					data:{
						text:this.text,
						tag:this.tag
					},
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
				uni.request({
					url:this.server_url+'/blink/addImg',
					method:"POST",
					header:{
						// 固定格式
						'content-type':'application/x-www-form-urlencoded'
					},
					data:{
						// 获取id
						id:'',
						photo:this.imageSrc
					},
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			chooseImage: function() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						console.log('chooseImage success, temp path is', res.tempFilePaths[0])
						var imageSrc = res.tempFilePaths[0]
						uni.uploadFile({
							url: 'https://unidemo.dcloud.net.cn/upload',
							filePath: imageSrc,
							fileType: 'image',
							name: 'data',
							success: (res) => {
								console.log('uploadImage success, res is:', res)
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								this.imageSrc = imageSrc
							},
							fail: (err) => {
								console.log('uploadImage fail', err);
								uni.showModal({
									content: err.errMsg,
									showCancel: false
								});
							}
						});
					},
					fail: (err) => {
						console.log('chooseImage fail', err)
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	textarea{
		width: 100%;
		padding: 20upx;
	}
	.image {
		width: 100%;
	}
	
	.demo {
		width: 300upx;
		height: 300upx;
		margin: 10upx 20upx;
		background: #ededed;
		color: #939393;
		line-height: 300upx;
		text-align: center;
	}
	input{
		width: 200upx;
		height: 70upx;
		border-radius: 40upx;
		padding-left: 10upx;
		margin: 30upx 0 0 20upx;
		border: 2upx solid #D81E06;
	}
	.publish{
		width: 100%;
		height: 150upx;
		position: fixed;
		bottom: 0;
		button{
			float: right;
			margin-right: 20upx;
			width: 250upx;
			height: 120upx;
			line-height: 120upx;
			font-size: 40upx;
			background-color: #D81E06;
			color: #FFFFFF;
		}
	}
</style>
