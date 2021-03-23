<template>
	<view class="add_article">
		<form @submit="formSubmit">
			<view class="blog_title">
				<input value="" name="title" placeholder="请输入标题" type="text" v-if="!this.id" />
				<input value="" placeholder="请输入标题" type="text" v-else v-model="editBlog.title" />
			</view>
			<view class="blog_content">
				<textarea name="content" maxlength="-1" placeholder="请输入内容..." v-if="!this.id" style="overflow: hidden;"></textarea>
				<textarea maxlength="-1" placeholder="请输入内容..." v-else v-model="editBlog.content" style="overflow: hidden;"></textarea>
			</view>
			<view class="selectCategory">
				<scroll-view scroll-x="true" class="scrollx">
					<view class="uni-list">
						<radio-group @change="radioChange" name="category" v-if="!this.id">
							<label class="uni-list-cell" v-for="(item, index) in categoryFilterList" :key="item.id" v-show="item.name!='全部'">
								<view class="itemRadio">
									<radio :value="item.category" :checked="index === current"/>
								</view>
								<view class="itemName">{{item.name}}</view>
							</label>
						</radio-group>
						<radio-group @change="radioChange" v-else>
							<label class="uni-list-cell" v-for="(item, index) in categoryFilterList" :key="item.id" v-show="item.name!='全部'">
								<view class="itemRadio">
									<radio :value="item.category" :checked="item.category === editBlog.category" disabled/>
								</view>
								<view class="itemName">{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</scroll-view>
			</view>
			<view class="submit">
				<button type="default" form-type="submit" class="postArti">发布文章</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:0,
				current: 0,
				blogInfo:{},
				categoryFilterList:[],
				id:Number,
				editBlog:{}
			}
		},
		onLoad(option) {
			this.id = option.artId
			console.log(this.id)
			uni.request({
				url:this.server_url+'/blog/find',
				data:{
					form:{
						"id":this.id
					}
				},
				method:"POST",
				success: (res) => {
					this.editBlog = res.data.data[0]
					console.log("this.id的内容是:",this.editBlog)
				},
				fail: (err) => {
					console.log(err)
				}
			})
			
			uni.request({
				url:this.server_url+"/categoryFilterList/find",
				method:"POST",
				success: (res) => {
					this.categoryFilterList = res.data.data
				}
			})
		},
		methods: {
			formSubmit(e){
				  this.blogInfo=e.detail.value
				  if(this.blogInfo.title === '') {
					  alert("文章标题不能为空")
					  return;
				  }	else if(this.blogInfo.content == '') {
					  alert("文章内容不能为空")
					  return;
				  }	
				  else if(this.blogInfo.category == '') {
					  alert("文章分类不能为空")
					  return;
				  }	
				  else if(this.id) {
					  console.log("编辑内容的id",this.id)
					  console.log(this.editBlog.title)
					  uni.request({
					  	url:this.server_url+"/blog/update",
						method:"POST",
						header:{
							// 固定格式
							'content-type':'application/x-www-form-urlencoded'
						},
						data:{
							id:this.id,
							title:this.editBlog.title,
							content:this.editBlog.content,
							category:this.editBlog.category
						},
						success: (res) => {
							console.log(res)
						},
						fail: (err) => {
							console.log(err)
						}
					  })
				  }
				  else{
					  uni.request({
						url:this.server_url+'/blog/add',
						method:"POST",
						header:{
							// 固定格式
							'content-type':'application/x-www-form-urlencoded'
						},
						data:{
							title:this.blogInfo.title,
							content:this.blogInfo.content,
							category:this.blogInfo.category
						},
						success: (res) => {
							console.log(res)
						},
						fail: (err) => {
							console.log(err)
						}
					  })
				  }  
				  setTimeout(() => {
					uni.switchTab({
						url: "./home",
					});
					}, 1000);
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.categoryFilterList.length; i++) {
					if (this.categoryFilterList[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			}
		}
	}
</script>

<style>
.blog_title{
	width: 100%;
	height: 120upx;
	border-bottom: #F1F1F1 3px solid;
}
.blog_title input{
	width: 100%;
	height: 100%;
	font-size: 20px;
	margin-left: 20upx;
	
}
textarea{
	width: 95%;
	height: 890upx;
	font-size: 18px;
	margin: 20upx;
}
.selectCategory{
	width: 100%;
	height: 130upx;
	border-top: #F1F1F1 5upx solid;
	position: fixed;
	bottom: 140upx;
}
.uni-list{
	width: 100%;
	flex-direction: row;    /*设置为横向排列*/
	white-space: nowrap;    /* 强制不换行 */
}
.uni-list-cell{
	display: inline-block;
	width: 160upx;
	text-align: center;
}
.itemRadio{
	margin-top: 20upx;
}
.itemName{
	margin: 10upx 0;
	font-size: 14px;
}
.scrollx{
	width: 100%;
}
.submit{
	width: 100%;
	height: 130upx;
	position: fixed;
	bottom: 0;
	border-top: #F1F1F1 3px solid;
}
.postArti{
	width: 230upx;
	height: 100upx;
	border-radius: 24upx;
	background-color: #D81E06;
	color: white;
	font-size: 40upx;
	float: right;
	margin-right: 40upx;
	margin-top: 14upx;
}
</style>
