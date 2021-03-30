<template>
	<view>
		<textarea :value="text" v-model="text" @input="textInput" placeholder="此刻的想法...(最多只能输入100个字符)" maxlength="100"></textarea>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="demo" @click="chooseImage">
				<!-- <block> -->
					<!-- <image  v-if="imageSrc" :src="imageSrc" name="photo" class="image" mode="widthFix"></image> -->
					<img v-if="imageSrc" :src="imageSrc" alt="" class="image" mode="widthFix">
					<view  v-else class="uni-hello-addfile">+ 选择图片</view>
				<!-- </block> -->
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
						photo:this.imageSrc,
						tag:this.tag
					},
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
				setTimeout(() => {
					uni.switchTab({
						url: "../blink",
					});
					}, 1000);
			},
			chooseImage: function() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						// console.log('chooseImage success, temp path is', res.tempFilePaths[0])
						var imageSrc = res.tempFilePaths[0]
						console.log(imageSrc)
						uni.showLoading({
							// 是否显示透明蒙层，防止触摸穿透
							mask:true,
							title:"上传中，请稍后"
						})
						uni.uploadFile({
							url: this.server_url+"/blink/addImg",
							filePath: imageSrc,
							fileType: 'image',
							name: 'data',
							success: (res) => {
								console.log('uploadImage success, res is:', res)
								this.imageSrc = res.data
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
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
					},
					complete(){
						uni.hideLoading()
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
			height: 110upx;
			line-height: 120upx;
			font-size: 20px;
			background-color: #D81E06;
			color: #FFFFFF;
		}
	}
</style>
