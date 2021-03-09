<template>
	<view class="home">
			<view class="fixed">
				<view class="qqq">
					<view class="search">
						<input  type="text" class="input" v-model="filterText" @input="inputes" placeholder="搜索" step autocomplete="off">
						<scroll-view
							scroll-y="true" 
							class="scroll-Y" 
							@scrolltoupper="upper" 
							@scrolltolower="lower"
							@scroll="scroll"
							v-show="this.ulDisable">
							<view class="cu-title" style="height: 50upx;display: inline-block;">
								<view>当前tab搜索结果</view><view class="hide" @tap="disableUl">隐藏</view>
							</view>
							<view class="cu-item" v-for="(item, index) in filterList" :key="index" @tap.stop="goBlogInfo(item)">
								<view class="cu-list">
									<h5 >{{item.title}}</h5>
									<p class="itemContent">{{item.content}}</p>
								</view>
							</view>
						</scroll-view>
					</view>
					
					<view class="classify">
						<scroll-view scroll-x="true" class="scrollx">
							<view class="categoryTab">
								<view 
									class="tabItem" 
									v-for="(item,index) in categoryFilterList" 
									:key="index" 
									@tap="handleSelected(index)" 
									:class="{'active': item.selected===1}">
									{{item.name}}
								</view>
							</view>
						</scroll-view>
						<view 
						v-for="(item,index) in blogs" 
						:key="index" 
						@tap="goBlogInfo(item)" 
						:class="index===blogs.length"
						>
							<view class="info">
								<h3 class="article_title">{{item.title}}</h3>
								<view class="article_content">{{item.content}}</view>
							</view>
							<view class="end" v-if="index==blogs.length-1">{{status}}</view>
						</view>
					</view>
				</view>
			</view>			
			<view class="write_article" @click="goToPage()">
				<image src="../../static/添加.png" style="width: 65px; height:65px" ></image>
			</view>
			<view class="scroll_top" @tap="topScrollTap" v-show="scrollTopShow">
				<image src="../../static/top.png" style="width: 60upx; height: 60upx;background-color: #FFFFFF;"></image>
			</view>
	</view>
</template>

<script>
				
	export default {
		data() {
			return {
				ulDisable:false,
				tabIndex:1,
				categoryFilterList:[],
				blogs:[],
				tabId: 1,
				status:'没有更多了',
				filterText:'',
				filterList:[],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				scrollTopShow: false,
			}
		},
		onLoad() {
			this.getCategoryListTab()
			// 获取分类列表
			uni.request({
				url:this.server_url+"/categoryFilterList/find",
				method:"POST",
				success: (res) => {
					this.categoryFilterList = res.data.data
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods: {
			onChange: function(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			},
			// tab点击事件：将被点击的tab值传过来，将selected设置为true，并将其他未被选中的tab样式设置为false。
			// 分类查询后，在点击不同的tab时，清空blogs里面的数据，重新获取当前tab的类型的文章
			handleSelected(index){
					console.log(this.categoryFilterList[index].name)
					// 通过获取到的index绑定单击后的样式
					this.categoryFilterList[index].selected = 1
					// 只能选中一项，把其他的设置为false
					for(let i=0;i<this.categoryFilterList.length;i++){
						if(i!=index){
							this.categoryFilterList[i].selected = 0
						}
					}
					//为防止数据叠加，做初始化
					this.blogs = [];
					//传递当前tab的text值
					this.getCategoryList(index)
			},
			// async  有关异步操作  只有被调用时才会触发
			// 获取被选中的tab
			async getCategoryListTab() {
				// 判断是否选中，并把i传过去
				for(let i=0;i<this.categoryFilterList.length;i++){
					if(this.categoryFilterList[i].selected){
						this.getCategoryList(i)
					}
				}
			},
			// 传递数据到子组件
			goBlogInfo(blogInfo){
				uni.navigateTo({
					//encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
					url:'/pages/home/blogInfoCmpt?blogInfo='+JSON.stringify(blogInfo)
				})
			},
			// 新建文章
			goToPage(){
				uni.navigateTo({
					//encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
					url:'/pages/home/add'
				})
			},
			// 从后台获取数据
			// i 是从getCategoryListTab()传过来的 i
			async getCategoryList(i){
				console.log(i);
				uni.request({
					url:this.server_url+'/blog/find',
					data:{
						form:{
							"category":this.categoryFilterList[i].category
						}
					},
					method:"POST",
					success: (res) => {
						this.blogs = res.data.data
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			upper: function(e) {
			    console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			// 下拉刷新   要在pages.json的当前页面里开启下拉
			onPullDownRefresh(){
				setTimeout(() => {
					this.status="没有更多内容了"
					this.blogs=[];   // 刷新，要把整个界面的数据清空
					this.getCategoryListTab();   // 获取当前tab的数据
					uni.stopPullDownRefresh();
				},2000)
			},
			inputes() {
				this.ulDisable = true
						//首先判断输入框是否为空
				if(this.filterText === ''){    
				//this.list是下拉框显示的内容，如果为空就展示全部数据
					this.filterList = this.blogs
				//否则执行下面内容
				}else{
					//先清空展示的数据
					this.filterList = []
					//然后开始循环全部数据
					for(var i=0;i<this.blogs.length;i++){
						//判断数据里面是否有符合输入的内容  不符合返回-1 只需要大于或等于0就是符合（核心所在，其它都是根据需求来自己写）
						if(this.blogs[i].title.indexOf(this.filterText)>=0){
								console.log(this.blogs[i].title)
								//然后把它丢进要展示的数组里面
								this.filterList.push(this.blogs[i])
						}
					}
				}
			},
			disableUl(){
				this.ulDisable = false
			},
			topScrollTap(){
				uni.pageScrollTo({
					scrollTop:0,    // 跳转到顶部
					duration:200   // 滚动动画的时长（毫秒）
				})
			},
			onPageScroll(e) {
				if(e.scrollTop < 200) {
					this.scrollTopShow = false
				} else {
					this.scrollTopShow = true
				}
			}
		}
	}
	
</script>

<style>
	.fixed{
		background-color: #FFFFFF;
		z-index: 999;
	}
	.input{
		width: 90%;
		height: 80upx;
		margin: 20upx auto;
		border: 1px solid #C0C0C0;
		padding-left: 20upx;
		border-radius: 40upx;
	}
	.scroll-Y{
		width: 90%;
		height: 600upx;
		z-index: 99;
		position: absolute;
		top: 100upx;
		left: 30upx;
		background-color: #FFFFFF;
	}
	.cu-list{
		height: 100upx;
		width: 100%;
		font-size: 40upx;
		border-bottom: 3upx solid #F2F2F2;
		padding-left: 10upx;
		padding-top: 15upx;
	}
	.cu-title{
		height: 60upx;
		width: 100%;
		font-size: 15px;
		border-bottom: 3upx solid #F2F2F2;
		padding-left: 10upx;
		padding-top: 15upx;
		position: relative;
	}
	.hide{
		position: absolute;
		top: 15upx;
		right: 30upx;
	}
	.itemContent{
		font-size: 30upx;
		color: #C8C7CC;
		margin-top: 5upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.classify{
		width: 100%;
		flex-direction: row;    /*设置为横向排列*/
		white-space: nowrap;    /* 强制不换行 */
	}
	.scrollx{
		width: 100%;
	}
	.categoryTab{
		width: 92%;
		padding:0 4% 0 4%;
		display: flex;
		align-items: center;
		color: #4C4C4C;
	}
	.tabItem{
		padding: 4px 6px;
		border-radius: 12px;
		background-color: #FFFFFF;
		margin-right: 5px;
	}
	.active{
		color: #FFFFFF;
		background-color: #D81E06;
	}
	.write_article{
		position: fixed;
		right: 20px;
		bottom: 80px;
		width: 65px;
		height: 65px;
		border-radius: 50px;
	}
	.order_context{
		width: 100%;
		height: 480px;
		z-index: -999;
	}
	swiper-item{
		background-color: #007AFF;
		width: 100%;
		height: 100%;
	}
	.info{
		height: 230upx;
		margin: 10px 10px 0 10px;
		background-color: #f9f9f9;
		border-radius: 20upx;
		padding: 10upx;
	}
	.article_title{
		height: 60upx;
	}
	.article_content{
		/* height: 150upx; */
		/* width: 670upx; */
		display: -webkit-box;
		-webkit-box-orient:vertical;
		word-wrap: break-word;
		word-break: break-all;
		white-space: pre-line;
		text-overflow: ellipsis;
		overflow: hidden;
		-webkit-line-clamp: 3;
		line-height: 50upx;
	}
	.end{
		text-align: center;
		color: #D8D8D8;
		margin-top: 5px;
		margin-bottom: 10px;
	}
	.scroll_top{
		position: fixed;
		bottom: 70px;
		left: 340upx;
	}
</style>
