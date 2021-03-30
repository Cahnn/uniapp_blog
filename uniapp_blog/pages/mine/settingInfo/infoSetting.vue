<template>
	<view class="page">
		<uni-list class="list">
			<uni-list-item
				showArrow
				clickable  
				@click="operator">
				<text slot="body" class="slot-box slot-text">头像</text>
				<template slot="footer">
					<image class="slot-image face" :src="userInfo.topImage" mode="widthFix"></image>
				</template>
			</uni-list-item>
			<uni-list-item
				title="帐号" 
				:rightText="userInfo.account" />
			<uni-list-item
				title="昵称"  
				showArrow
				link="navigateTo"
				to="/pages/mine/settingInfo/components/setNickname"
				:rightText="userInfo.nickname" />
			<uni-list-item
				title="生日" 
				showArrow
				link="navigateTo"
				to="/pages/mine/settingInfo/components/setBirthday"
				:rightText="userInfo.birthday" />
			<uni-list-item
				title="性别" 
				showArrow
				link="navigateTo"
				to="/pages/mine/settingInfo/components/setSex"
				v-if="userInfo.sex"
				:rightText="userInfo.sex" />
			<uni-list-item
				title="性别" 
				showArrow
				link="navigateTo"
				to="/pages/mine/settingInfo/components/setSex"
				v-else
				rightText="未选择" />
		</uni-list>
		<view class="footer-wapper">
			<view class="footer-words" style="margin-top: 10upx;" @click="logout">
				退出登录
			</view>
		</view>
	</view>
</template>
 
<script>
	import uniList from '../../../uni_modules/uni-list/components/uni-list/uni-list.vue'
	import uniListItem from '../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue'
	import uniListChat from '../../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.vue'
	
	export default {
		components: {uniList,uniListItem,uniListChat},
		data() {
			return {
				userInfo:{}
			};
		},
		onShow() {
			this.getUserInfo()
		},
		onLoad() {
			this.getUserInfo()
		},
		methods:{
			async getUserInfo(){
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
			logout(){
				uni.navigateTo({
					url:'../../login/login'
				})
			},
			operator(){
				var me = this;
				var faceImage = me.userInfo.topImage;
				uni.showActionSheet({
					itemList: ["查看我的头像", "从相册选择上传"],
					success(res) {
						var index = res.tapIndex;
						if (index == 0) {
							// 预览头像
							var faceArr = [];
							faceArr.push(faceImage);
							uni.previewImage({
								urls: faceArr,
								current: faceArr[0]
							})
						} else if (index == 1) {
							// 选择上传头像
							uni.chooseImage({
								count: 1,
								// 压缩图
								sizeType: ["compressed"],
								// 图片来源：album 相册
								sourceType: ["album"],
								success(res) {
									// res获得临时路径
									var tempFilePath = res.tempFilePaths[0];
									// #ifdef H5
									uni.navigateTo({
										url: "./components/setFace?tempFilePath=" + tempFilePath
									})
									// #endif
									// 在小程序下使用图片剪裁实现
									// #ifndef H5
									uni.navigateTo({
										url: "../faceCrop/faceCrop?tempFilePath=" + tempFilePath
									})
									// #endif
								}
							})
							
						}
					}
				})
			}
		}
	};
</script>

<style scoped>
	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}
	.item-wapper {
		display: flex;
		/* margin-top: 20upx; */
		flex-direction: row;
		justify-content: flex-start;
	}
	
	.face-line-upbottom {
		margin-top: 20upx;
		/* margin-bottom: 20upx; */
		padding-top: 20upx;
		padding-bottom: 20upx;
	}
	.info-words {
		color: #333333;
		font-size: 16px;
		width: 25%;
		line-height: 80upx;
		/* font-weight: bold; */
	}
	.right-wapper {
		width: 80%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	.face {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}
	.arrow-block {
		margin-left: 10upx;
		line-height: 86upx;
	}
	
	.arrow-ico {
		width: 30upx;
		height: 30upx;
	}
	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}
	
	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		width: 30px;
		height: 30px;
	}
	
	.slot-text {
		flex: 1;
		font-size: 14px;
		margin-right: 10px;
	}
	/* 底部操作 start */
	.footer-wapper {
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.footer-words {
		text-align: center;
		background-color: white;
		padding: 20upx;
		
		color: #333333;
		font-size: 16px;
	}
	/* 底部操作 end */
</style>