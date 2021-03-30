<template>
	<view class="concern">
		<!-- <block
			v-for="(item,index) in collectionBlogsList" 
			:key="index" 
			:class="index===collectionBlogsList.length"
			>
			<view class="cancelConcern" @tap="cancelCol(index)">
				<image src="../../../static/mine/cancel.png" style="width: 150upx;height: 150upx;margin-top: 50upx;"></image>
			</view>
			<view class="colBlogItem"
				@touchstart="moveStart(index,$event)"
				@touchmove="moving(index,$event)"
				@touched="mouveend(index,$event)"
				@click="goBlogInfo(item)" 
				:class="[theIndex==index?'open':oldIndex==index?'close':'']">
					<h3 class="article_title">{{item.title}}</h3>
					<view class="article_content">{{item.content}}</view>
			</view>
			<view class="end" v-if="index==collectionBlogsList.length-1">{{status}}</view>
		</block> -->
		<uni-notice-bar single="true" text="[提示] 左滑可取消关注~"></uni-notice-bar>
		<uni-swipe-action>
		    <!-- 使用插槽 （请自行给定插槽内容宽度）-->
		    <uni-swipe-action-item
				v-for="(item,index) in collectionBlogsList"
				:key="index" 
				:class="index===collectionBlogsList.length">
				<uni-card
					@tap="goBlogInfo(item)"
					:title="item.title" 
					:thumbnail="userInfo.topImage" 
					:extra="item.createdAt">
						<view class="article_content">{{item.content}}</view>
				</uni-card>
		        <template v-slot:right>
		            <view  @tap="cancelCol(index)" class="cancelConcern">
						<image src="../../../static/mine/cancel.png" style="width: 100upx;height: 100upx;margin-top: 50upx;"></image>
					</view>
		        </template>
		    </uni-swipe-action-item>
		</uni-swipe-action>

		
	</view>
</template>

<script>
	import uniNoticeBar from '../../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.vue'
	import uniCard from '../../../uni_modules/uni-card/components/uni-card/uni-card.vue'
	import uniSwipeActionItem from '../../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import uniSwipeAction from '../../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.vue'
	export default{
		data(){
			return{
				collectionBlogsList:[],
				status:'没有更多了',
				theIndex:null,
				oldIndex:null,
				userInfo:{}
			}
		},
		onLoad() {
			this.getCollectionList()
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
			goBlogInfo(blogInfo){
				console.log(blogInfo)
				uni.navigateTo({
					//encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
					url:'/pages/home/blogInfoCmpt?blogInfo='+JSON.stringify(blogInfo)
				})
			},
			cancelCol(index){
				uni.showModal({
					title:'提示',
					content:'确定取消关注此活动吗？',
					success: (res) => {
						if(res.confirm){
							let MyCollection = this.collectionBlogsList
							MyCollection.splice(index,1)
							this.setBlogCollection(MyCollection,false)
							this.oldIndex = this.theIndex;
							this.theIndex = null
						}else{
							console.log("用户不取消")
						}
					}
				})
			},
			// moveStart(index,e){
			// 	if(e.touches.length>1){
			// 		return;
			// 	}
			// 	this.initXY = [e.touches[0].pageX, e.touches[0].pageY]
			// },
			// moving(index,e){
			// 	if(e.touches.length>1){
			// 		return;
			// 	}
			// 	let moveX = e.touches[0].pageX - this.initXY[0]
			// 	let moveY = e.touches[0].pageY-this.initXY[1]
				
			// 	if(moveX<0){
			// 		this.theIndex = index
			// 	}else{
			// 		this.oldIndex = this.theIndex;
			// 		this.theIndex = null
			// 	}
			// },
			// mouveend(index,e){
				
			// },
			setBlogCollection(MyCollectionBlogsList,coll) {
				console.log("存储到本地存储中")
				console.log(MyCollectionBlogsList)
				uni.setStorage({
					key:"MyCollectionBlogsList",
					data:MyCollectionBlogsList,
					success(){
						if(coll){
							uni.showToast({
								icon:"success",
								title:"收藏成功"
							})
						} else{
							uni.showToast({
								icon:"success",
								title:"取消收藏"
							})
						}
					}
				})
			},
			async getCollectionList(){
				uni.getStorage({
					key:"MyCollectionBlogsList",
					success: (res) => {
						console.log(res.data)
						this.collectionBlogsList = res.data
					}
				})
			}
		},
		components:{
			uniSwipeActionItem,
			uniSwipeAction,
			uniCard,
			uniNoticeBar
		}
	}
</script>

<style lang="less" scoped>
	.tip{
		width: 86%;
		height: 80upx;
		line-height: 80upx;
		margin: 20upx auto 0 auto;
		background-color: #838383;
		border-radius: 20upx;
		color: #FFFFFF;
		padding-left: 20upx;
	}
	// .cancelConcern{
	// 	width: 20%;
	// 	height: 232upx;
	// 	position: absolute;
	// 	right: 45upx;
	// 	// background-color: #e05c55;
	// 	z-index: 0;
	// 	padding:8upx;
	// 	font-size: 28upx;
	// 	text-align: center;
	// 	margin-top: 3px;
	// }
	.cancelConcern{
		width: 100%;
		display: flex;
		align-items: center;
	}
	// .colBlogItem{
	// 	width: 85%;
	// 	height: 230upx;
	// 	margin: 20upx auto;
	// 	padding: 20upx;
	// 	background-color: #F9F9F9;
	// 	border-radius: 20upx;
	// 	align-items: center;
	// 	font-size: 18upx;
	// 	// background-color: #FFFFFF;
	// 	z-index: 3;
	// 	position: relative;
	// 	@keyframes showMenu{
	// 		0%{
	// 			transform: translateX(0);
	// 		}
	// 		100%{
	// 			transform: translateX(-30%);
	// 		}
	// 	}
	// 	@keyframes closeMenu{
	// 		0%{
	// 			transform: translateX(-30%);
	// 		}
	// 		100%{
	// 			transform: translateX(0);
	// 		}
	// 	}
	// 	&.open{
	// 		animation: showMenu 0.25s linear both;
	// 	}
	// 	&.close{
	// 		animation: closeMenu 0.15s linear both;
	// 	}
	// }
	.article_content{
		display: -webkit-box;
		-webkit-box-orient:vertical;
		word-wrap: break-word;
		word-break: break-all;
		white-space: pre-line;
		text-overflow: ellipsis;
		overflow: hidden;
		-webkit-line-clamp: 3;
		line-height: 50upx;
		font-size: 15px;
		margin-bottom: 10upx;
	}
	.end{
		text-align: center;
		color: #D8D8D8;
		margin-top: 5px;
		padding-bottom: 20px;
	}
</style>
