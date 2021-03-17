<template>
	<view>
		<view class="headerbg"></view>
		<view class="personMess">
			<view class="info">
				<view class="topImg">
					<view class="img">
						<image src="../../static/blinkfill.png" style="width: 100%;height: 100%;"></image>
					</view>
				</view>
				<view class="name">
					<h2>Lecoce</h2>
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
				fans:0
			}
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
	width: 40%;
	height: 200upx;
	line-height: 180upx;
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
