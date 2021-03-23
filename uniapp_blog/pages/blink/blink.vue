<template>
	<view>
		<view class="blink" v-for="(item,index) in blinks" :key="index">
			<view class="perMess">
				<view class="img">
					<image :src="img" style="width: 100upx;height: 100upx;"></image>
				</view>
				<view class="name">{{name}}</view>
				<view class="deleteBtn">
					<span class="deleteBlink" @tap="deleteBlink(item.id)">删除</span>
				</view>
			</view>
			<view class="text">{{item.text}}</view>
			<view class="photo" v-show="item.photo">
				<image 
					:src="item.photo"  
					@tap="lookMe"
					:data-index="index"
					mode="widthFix"></image>
			</view>
			<view class="tag" v-show="item.tag">
				<span class="tag-item">
					{{item.tag}}
				</span>
			</view>
			<view class="operation">
				<view class="good" :data-index="index"  @click="praiseMe">
					<image class="goodIcon" src="../../static/blink/good.png"></image>
					<!-- <span>点赞</span> -->
					<view :animation="animationArr[index]" class="praise-me animation-opacity">
						+1
					</view>
				</view>
				<view class="comment">
					<image class="commentIcon" src="../../static/blink/comment.png"></image>
					<!-- <span>评论</span> -->
				</view>
				
			</view>
			
			
		</view>
		<view class="end">{{status}}</view>
		
		<view class="publish" @click="goToPage()">
			<image src="../../static/添加.png" style="width: 65px; height:65px" ></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:'/static/blinkfill.png',
				name:'Lecoce',
				blinks:[],
				status:'没有更多了',
				animationData:{},
				animationArr:[]
			}
		},
		onLoad() {
			this.getBlinks()
			this.animation = uni.createAnimation()
		},
		onUnload() {
			// 页面卸载时清除动画数据
			this.animationData = {}
			this.animationArr = []
		},
		methods: {			
			lookMe(e){
				// urls一定是数组形式
				var imgIndex = e.currentTarget.dataset.index
				let imgArr = []
				imgArr[0] = this.blinks[imgIndex].photo
				uni.previewImage({
					urls:imgArr
				})
			},
			async getBlinks(){
				uni.request({
					url:this.server_url+'/blink/find',
					method:"POST",
					success: (res) => {
						this.blinks = res.data.data
						this.animationArr = res.data.data
						console.log(this.blinks)
					}
				})
			},
			goToPage(){
				uni.navigateTo({
					url:'./components/publish'
				})
			},
			// 下拉刷新   要在pages.json的当前页面里开启下拉
			onPullDownRefresh(){
				setTimeout(() => {
					this.status="没有更多内容了"
					this.blinks=[];   // 刷新，要把整个界面的数据清空
					this.getBlinks();   // 获取当前tab的数据
					uni.stopPullDownRefresh();
				},2000)
			},
			deleteBlink(params){
				console.log(params)
				uni.showModal({
					title:"提示",
					content:"确定要删除吗?",
					success: (e) => {
						if(e.confirm){
							uni.request({
								url:this.server_url+"/blink/remove",
								method:"POST",
								data:{
									blinkId:params
								},
								success: (res) => {
									code:200,
									uni.showToast({
										title:"已删除",
										icon:"success"
									})
									this.getBlinks()
								},
								fail: (err) => {
									uni.showToast({
										title:"删除失败",
										icon:"none"
									})
								}
							})
						}else if(e.cancel){
							uni.showToast({
								title:"取消删除",
								icon:"success"
							})
						}
					}
				})
			},
			praiseMe(e){
				// 课程中提到dataset下面的值都是小写，经测试表明dataset下面的值要与绑定的值一致
				var index = e.currentTarget.dataset.index;
				// console.log(e.currentTarget.dataset)
				// console.log(gIndex)
				// 此动画向上偏移60px 透明度调整为1 step() 表示一组动画的完成
				this.animation.translateY(-80).opacity(1).step({
					duration:400
				})
				// 导出动画数据  实现组件的动画效果
				this.animationData = this.animation;
				// this.animationDataArr[gIndex] = this.animationData.export();
				// H5不支持此动画,用$set()的方式
				this.$set(this.animationArr, index, this.animationData.export())
				
				// 还原动画
				setTimeout(function(){
					this.animation.translateY(0).opacity(0).step({
						duration:0
					})
					this.animationData = this.animation;
					// this.animationDataArr[gIndex] = this.animationData.export();
					this.$set(this.animationArr, index, this.animationData.export())
				}.bind(this),500)
			}
		}
	}
</script>

<style scoped lang="less">
	.blink{
		width: 95%;
		margin: 20upx auto;
		border-bottom: 20upx solid #F2F2F2;
		padding-bottom: 20upx;
		position: relative;
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
			.deleteBtn{
				width: 10%;
				font-size: 12px;
				color: #575A6C;
				line-height: 130upx;
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
		.moreOper{
			position: absolute;
			bottom: 40upx;
			right: 20upx;
		}
		.operation{
			width: 100%;
			height: 100upx;
			border-top: 1px solid #ebebeb;
			line-height: 100upx;
			display: flex;
			flex-direction: row;
			view{
				flex: 1;
				text-align: center;
				image{
					width: 55upx;
					height: 55upx;
					margin-bottom: -13upx;
				}
				.praise-me{
					font-size: 14px;
					color: #feab2a;
					align-self: center;
				}
				.animation-opacity{
					font-weight: bold;
					opacity: 0;
				}
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
	.end{
		text-align: center;
		color: #D8D8D8;
		margin-top: 5px;
		margin-bottom: 10px;
	}
</style>
