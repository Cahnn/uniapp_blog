<template>
	<view class="blogInfo">
		<view class="operation">
			<view class="edit" @click="editBlog(blogInfo)" :data-artid="blogInfo.id">
				<image src="../../static/message/comment.png"></image>
				<br/>
				<view class="word">编辑</view>
			</view>
			<view class="good" @tap="deleteBlog" :data-artid="blogInfo.id">
				<image src="../../static/message/delete.png"></image>
				<br/>
				<view class="word">删除</view>
			</view>
			<view class="collection" @tap="collectionFollow">
				<image :src="collectionImg"></image>
				<br/>
				<view class="word">{{colStatus}}</view>
			</view>
		</view>
		<view class="info">
			<h2 class="title">{{blogInfo.title}}</h2>
			<view class="content">{{blogInfo.content}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				blogInfo:[],
				collection:false,
				collectionImg:'/static/message/star.png',
				blogId: '',
				colStatus:'收藏'
			}
		},
		onLoad(option) {
			if (option.blogInfo===undefined){
				console.log('数据为空值')
			}else{
				// JSON.parse(option.blogInfo) 转换成对象
				this.blogInfo = JSON.parse(option.blogInfo)
			}
			console.log('this.blogInfo:',this.blogInfo)
			this.blogId = this.blogInfo.id
			uni.setStorageSync("blogInfo",this.blogInfo)
			uni.getStorage({
				key:"blogId",
				success: (res) => {
					console.log("缓存读取成功",res.data)
				}
			})
			this.getCollectionActive()
		},
		onShow() {
			if (uni.getStorageSync('userid')) {
				this.getCollectionActive();
			}
		},
		methods: {
			setBlogCollection(MyCollectionBlogsList,coll){
				console.log("进入加入存储方法中")
				uni.setStorage({
					key:"MyCollectionBlogsList",
					data:MyCollectionBlogsList,
					success() {
						if(coll){
							uni.showToast({
								icon:"success",
								title:"收藏成功"
							})
						}else{
							uni.showToast({
								icon:"success",
								title:"取消收藏"
							})
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			collectionFollow(){
				if(this.collection){
					uni.showModal({
						title:'提示',
						content:'确定取消收藏此文章吗？',
						success: (res) => {
							if(res.confirm){
								this.collection=false,
								this.collectionImg='/static/message/star.png'
								this.colStatus="收藏"
								uni.getStorage({
									key:"MyCollectionBlogsList",
									success: (res) => {
										let MyCollection = res.data
										let index = MyCollection.findIndex(item => {
											if(item.id === this.blogInfo.id){
												return true;
											}
										})
										MyCollection.splice(index,1)
										this.setBlogCollection(MyCollection,false)
									}
								})
							}else{
								console.log("用户不取消")
							}
						}
					})
				}else{
					this.collectionImg = '/static/message/starfill.png'
					this.collection = true,
					this.colStatus="已收藏"
					uni.getStorage({
						key:"MyCollectionBlogsList",
						success: (res) => {
							console.log("加入成功")
							console.log(res.data)
							let MyCollection = res.data
							let isExist = false
							MyCollection.forEach(item => {
								if(item.id === this.blogInfo.id){
									isExist = true
								}
							})
							if(!isExist){
								console.log("将数据加入存储列表")
								MyCollection.push(this.blogInfo)
								this.setBlogCollection(MyCollection,true)
							}
						},
						fail:(err) => {
							console.log("加入存储失败")
							let MyCollectionBlogsList = []
							MyCollectionBlogsList.push(this.blogInfo)
							this.setBlogCollection(MyCollectionBlogsList,true)
						}
					})
				}
			},
			// 获取收藏状态
			async getCollectionActive() {
				uni.getStorage({
					key:"MyCollectionBlogsList",
					success:(res) => {
						let MyCollection = res.data
						let isExist = false
						console.log("收藏：",MyCollection)
						MyCollection.forEach(item => {
							if(item.id === this.blogInfo.id){
								isExist = true
							}
						})
						if(isExist){
							console.log('收藏')
							this.collectionImg='/static/message/starfill.png'
							this.collection = true
							this.colStatus = "已收藏"
						}else{
							this.collectionImg = '/static/message/star.png'
							this.collection = false
							this.colStatus = "收藏"
						}
					}
				})
			},
			editBlog(e){
				console.log(e.id)
				var artId = e.id;
				uni.navigateTo({
					url:'/pages/home/add?artId='+artId
				})
			},
			deleteBlog(e){
				var artId = e.currentTarget.dataset.artid
				console.log(artId)
				uni.showModal({
					title:"提示",
					content:"确定要删除吗?",
					success: (e) => {
						if(e.confirm){
							uni.request({
								url:this.server_url+'/blog/remove',
								method:"POST",
								data:{
									id:artId
								},
								success: (res) => {
									code:200,
									uni.showToast({
										title:"已删除",
										icon:"success"
									})
									// 如果被删除文章是收藏文章，则把收藏缓存清除
									if(this.collection === true){
										uni.getStorage({
											key:"MyCollectionBlogsList",
											success: (res) => {
												let MyCollection = res.data
												let index = MyCollection.findIndex(item => {
													if(item.id === this.blogInfo.id){
														return true;
													}
												})
												MyCollection.splice(index,1)
												this.setBlogCollection(MyCollection,false)
											}
										})
									}
									setTimeout(() => {
										uni.switchTab({
											url: "./home",
										});
									}, 500);
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
			}
		}
	}
</script>

<style>
.blogInfo{
	width: 94%;
	margin: 0 auto;
	text-align: center;
}
.operation{
	height: 60px;
	width: 100%;
	text-align: center;
	padding-top: 10px;
	border-bottom: 1px solid #F9F9F9;
	position: fixed;
	bottom: 0;
	left: 0;
	background-color: #FFFFFF;
	z-index: 999;;
}
.operation view{
	display: inline-block;
	width: 33%;
	text-align: center; 
	font-size: 13px;
}
.operation view image{
	width: 60upx;
	height: 60upx;
}
.info{
	margin-top: 20px;
	padding-bottom: 80px;
}
.content{
	margin-top: 10px;
	line-height: 30px;
	font-size: 20px;
}
</style>
