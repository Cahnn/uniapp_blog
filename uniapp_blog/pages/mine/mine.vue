<template>
	<view>
		<view class="headerbg"></view>
		<view class="personMess">
			<view class="info">
				<view class="topImg">
					<view class="img">
						<image :src="userInfo.topImage" style="width: 100%;height: 100%;border-radius: 50%;"></image>
					</view>
				</view>
				<view class="name">
					<h3>{{userInfo.nickname}}</h3>
					<p style="margin-top: 10upx;">{{userInfo.account}}</p>
				</view>
				<view class="goInfo" @click="goInfo()">
					<image src="../../static/mine/goInfo.png" style="width: 60upx;height: 60upx;"></image>
				</view>
			</view>
			<view class="mess">
				<view class="edit" @tap="manageCategory()">
					<view><image src="../../static/mine/manage.png" style="width: 80upx;height: 80upx;"></image></view>
					<view class="word">分类管理</view>
				</view>
				<view class="good" @tap="toConcern()">
					<view><image src="../../static/mine/collections.png" style="width: 110upx;height: 80upx;"></image></view>
					<view class="word">收藏集</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				attention:0,
				fans:0,
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
			manageCategory(){
				uni.navigateTo({
					url:'./components/manageCategory'
				})
			},
			toConcern() {
				uni.navigateTo({
					url:'components/concern'
				})
			},
			goInfo(){
				console.log("2222")
				uni.navigateTo({
					url:'./settingInfo/infoSetting'
				})
			}
		}
	}
</script>

<style>
.headerbg{
	background-color: #D81E06;
	width: 100%;
	height: 250upx;
	border-radius: 0 0 20upx 20upx;
}
.personMess{
	width: 90%;
	margin: 0 auto;
	height: 390upx;
	-webkit-box-shadow: #F2F2F2 0px 0px 10px;
	-moz-box-shadow: #F2F2F2 0px 0px 10px;
	box-shadow: #F2F2F2 0px 0px 10px;
	border-radius: 20upx;
	margin-top: -100upx;
	background-color: #FFFFFF;
}
.info{
	width: 95%;
	margin: 0 auto;
	height: 190upx;
	border-bottom: 1upx #ababab solid;
	display: flex;
}
.topImg{
	width: 30%;
}
.img{
	width: 70%;
	height: 130upx;
	border-radius: 50%;
	margin-top: 30upx;
	margin-left: 20upx;
}
.name{
	flex: 1;
	height: 200upx;
	margin-top: 35upx;
}
.goInfo{
	width: 10%;
	display: flex;
	align-items: center;
}
.mess{
	width: 100%;
	text-align: center;
	background-color: #FFFFFF;
	margin-top: 28upx;
}
.edit, .good{
	display: inline-block;
	width: 50%;
	text-align: center; 
	font-size: 13px;
}
.word{
	font-size: 15px;
	margin-top: 10upx;
}
</style>
