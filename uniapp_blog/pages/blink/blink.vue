<template>
	<view>
		<view class="blink">
			<view class="perMess">
				<view class="img">
					<image :src="blink.img" style="width: 100upx;height: 100upx;"></image>
				</view>
				<view class="name">{{blink.name}}</view>
			</view>
			<view class="text">{{blink.text}}</view>
			<view class="photo">
				<image :src="blink.photo" style="width: 300upx;height: 250upx;"></image>
			</view>
			<view class="tag">
				<span class="tag-item">
					{{blink.tag}}
				</span>
			</view>
			<view class="interact"></view>
		</view>
		
		<view class="blink" v-for="(item,index) in blinks" :key="index">
			<view class="perMess">
				<view class="img">
					<image :src="blink.img" style="width: 100upx;height: 100upx;"></image>
				</view>
				<view class="name">{{blink.name}}</view>
			</view>
			<view class="text">{{item.text}}</view>
			<view class="photo" v-show="item.photo">
				<image :src="item.photo" style="width: 300upx;height: 250upx;"></image>
			</view>
			<view class="tag" v-show="item.tag">
				<span class="tag-item">
					{{item.tag}}
				</span>
			</view>
			<view class="interact"></view>
		</view>
		
		<view class="publish" @click="goToPage()">
			<image src="../../static/添加.png" style="width: 65px; height:65px" ></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				blinks:[],
				blink:{
					img:'/static/blinkfill.png',
					name:'Blink',
					text:'接口调用结束的回调函数（调用成功、失败都会执行）',
					photo:'/static/liu.jpg',
					tag:'今天学到了',
				}
			}
		},
		onLoad() {
			uni.request({
				url:this.server_url+'/blink/find',
				method:"POST",
				success: (res) => {
					this.blinks = res.data.data
					console.log(this.blinks)
				}
			})
		},
		methods: {
			goToPage(){
				uni.navigateTo({
					url:'./components/publish'
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.blink{
		width: 95%;
		margin: 20upx auto;
		border-bottom: 2upx solid #F2F2F2;
		padding-bottom: 20upx;
		.perMess{
			// width: 100%;
			height: 130upx;
			display: flex;
			.img{
				width: 20%;
				image{
					margin: 10upx 0 0 10upx;
				}
			}
			.name{
				flex: 1;
				line-height: 130upx;
				font-size: 40upx;
			}
		}
		.text{
			margin-bottom: 25upx;
		}
		.tag{
			width: 100%;
			height: 100upx;
			.tag-item{
				line-height: 100upx;
				padding: 8upx 15upx;
				border-radius: 30upx;
				color: #D81E06;
				border: 2upx solid #D81E06;
			}
		}
	}
	.publish{
		position: fixed;
		right: 20px;
		bottom: 80px;
		width: 65px;
		height: 65px;
		border-radius: 50px;
	}
</style>
