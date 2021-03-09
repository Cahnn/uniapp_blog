<template>
	<view>
		<view class="headerbg">
			
		</view>
		<view class="personMess">
			<view class="info">
				<view class="topImg">
					<view class="img" @tap="toConcern()"></view>
				</view>
				<view class="name">
					<h2>Lecoce</h2>
				</view>
			</view>
			<view class="mess">
				<h2>人生格言：知足常乐</h2>
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
	height: 450upx;
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
	height: 200upx;
	border-bottom: 1upx #555555 solid;
	display: flex;
}
.topImg{
	width: 30%;
}
.img{
	width: 70%;
	height: 130upx;
	background-color: #2C405A;
	border-radius: 50%;
	margin-top: 30upx;
	margin-left: 10px;
}
.name{
	width: 40%;
	height: 100px;
	line-height: 90px;
}
.mess{
	margin-top: 40px;
	margin-left: 25px;
}
</style>
