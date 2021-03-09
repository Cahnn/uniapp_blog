<template>
	<view class="add_article">
		<form @submit="formSubmit">
			<view class="blog_title">
				<input value="" name="title" placeholder="请输入标题" type="text" v-model="this.editInfo.title" />
			</view>
			<view class="blog_content">
				<textarea name="content"  v-model="this.editInfo.content" maxlength="-1" placeholder="请输入内容..." style="overflow: hidden;"></textarea>
			</view>
			<view class="selectCategory">
				<!-- 获取已有分类，自行创建分类 -->
				<scroll-view scroll-x="true" class="scrollx">
					<view class="uni-list">
						<radio-group @change="radioChange" name="category">
							<label class="uni-list-cell" v-for="(item, index) in categoryFilterList" :key="item.id" v-show="item.name!='全部'">
								<view class="itemRadio">
									<radio :value="item.category" :checked="index === current"/>
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
				blogInfo:[],
				categoryFilterList:[],
				editInfo:{}
			}
		},
		onLoad(option) {
			if (option.editInfo===undefined){
				console.log('数据为空值')
			}else{
				// JSON.parse(option.blogInfo) 转换成对象
				this.editInfo = JSON.parse(option.editInfo)
			}
			console.log("需要编辑的内容为：",this.editInfo)
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
				  else if(this.blogInfo.id) {
					  uni.request({
						url:this.server_url+'/blog/update',
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
				  }	else{
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
	height: 60px;
	border-bottom: #F1F1F1 3px solid;
}
.blog_title input{
	width: 100%;
	height: 100%;
	font-size: 20px;
	margin-left: 10px;
	
}
textarea{
	width: 95%;
	height: 400px;
	font-size: 18px;
	margin: 10px;
}
.selectCategory{
	width: 100%;
	height: 65px;
	border-top: #F1F1F1 3px solid;
}
.uni-list{
	width: 100%;
	flex-direction: row;    /*设置为横向排列*/
	white-space: nowrap;    /* 强制不换行 */
}
.uni-list-cell{
	display: inline-block;
	width: 80px;
	text-align: center;
}
.itemRadio{
	margin-top: 10px;
}
.itemName{
	margin-top: 5px;
}
.scrollx{
	width: 100%;
}
.submit{
	width: 100%;
	height: 65px;
	position: fixed;
	bottom: 0;
	border-top: #F1F1F1 3px solid;
}
.postArti{
	width: 115px;
	height: 50px;
	border-radius: 12px;
	background-color: #D81E06;
	color: white;
	font-size: 20px;
	float: right;
	margin-right: 20px;
	margin-top: 7px;
}
</style>
