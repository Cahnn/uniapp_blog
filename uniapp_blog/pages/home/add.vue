<template>
	<view class="add_article">
		<form @submit="formSubmit">
			<view class="blog_title">
				<input value="" name="title" placeholder="请输入标题" type="text" v-if="!this.id" />
				<input value="" placeholder="请输入标题" type="text" v-else v-model="editBlog.title" />
			</view>
			<view class="blog_content">
					<view class='wrapper'>
						<view class='toolbar'  v-if="!this.id" @tap="format" style="height: 120px;overflow-y: auto;" disabled>
							<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
							<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
							<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
							<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"></view>
							<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align"
							 data-value="left"></view>
							<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi" data-name="align"
							 data-value="center"></view>
							<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align"
							 data-value="right"></view>
							<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi" data-name="align"
							 data-value="justify"></view>
							<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font" data-name="fontFamily" data-value="Pacifico"></view>
							<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize" data-name="fontSize"
							 data-value="24px"></view>
							<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color" data-name="color"
							 data-value="#0000ff"></view>
							<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor"
							 data-name="backgroundColor" data-value="#00ff00"></view>
							<view class="iconfont icon-date" @tap="insertDate"></view>
							<view class="iconfont icon-undo" @tap="undo"></view>
							<view class="iconfont icon-redo" @tap="redo"></view>
							<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
							<view class="iconfont icon-shanchu" @tap="clear"></view>
						</view>
					
						<view class="editor-wrapper">
							<editor 
								v-if="!this.id"
								id="editor" 
								class="ql-container" 
								placeholder="开始输入..." 
								showImgSize showImgToolbar showImgResize
								@statuschange="onStatusChange" 
								@input="onEditorInput"
								@ready="onEditorReady">
							</editor>
						<!-- 	<editor
								v-else
								id="editor" 
								class="ql-container" 
								placeholder="开始输入..." 
								v-model="editBlog.content"
								showImgSize showImgToolbar showImgResize
								@statuschange="onStatusChange" 
								@input="onEditorInput"
								@ready="onEditorReady">
							</editor> -->
							<textarea maxlength="-1" placeholder="请输入内容..." v-else v-model="editBlog.content" style="overflow: hidden;"></textarea>
						</view>
					</view>
				<!-- <textarea name="content" maxlength="-1" placeholder="请输入内容..." v-if="!this.id" style="overflow: hidden;"></textarea> -->
				
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
				<button type="default" form-type="submit" class="postArti">发布</button>
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
				editBlog:{},
				inputText:'',
				formats: {},
				readOnly: false,
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
			uni.loadFontFace({
				family: 'Pacifico',
				source: 'url("https://sungd.github.io/Pacifico.ttf")'
			})
		},
		methods: {
			onEditorInput(e){
				var that = this;
				this.inputText = e.detail.html
				// console.log(e.detail.html); //带标签内容
				// console.log(e.detail.text); //纯文本内容
			},
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
							}
						})
					}
				})
			},
			formSubmit(e){
				  this.blogInfo=e.detail.value
				  if(this.blogInfo.title === '') {
					  alert("文章标题不能为空")
					  return;
				  }	else if(this.blogInfo.content === '') {
					  alert("文章内容不能为空")
					  return;
				  }	
				  else if(this.blogInfo.category == '') {
					  alert("文章分类不能为空")
					  return;
				  }	
				  else if(this.id) {
					  console.log("编辑内容的id",this.id)
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
							content:this.inputText,
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
@import "./editor-icon.css";
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
.wrapper {
	height: 50%;
}
.editor-wrapper {
	height: calc(100vh - var(--window-top) - var(--status-bar-height) - 560upx);
	background: #fff;
}

.iconfont {
	display: inline-block;
	padding: 8px 8px;
	width: 24px;
	height: 24px;
	cursor: pointer;
	font-size: 20px;
}

.toolbar {
	height: 160upx !important;
	box-sizing: border-box;
	border-bottom: 0;
	font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}


.ql-container {
	box-sizing: border-box;
	padding: 12upx 15upx;
	width: 100%;
	min-height: 30vh;
	height: 100%;
	margin-top: 20upx;
	font-size: 16px;
	line-height: 1.5;
}

.ql-active {
	color: #06c;
}
.selectCategory{
	width: 100%;
	height: 130upx;
	border-top: #F1F1F1 5upx solid;
	position: fixed;
	bottom: 140upx;
	background-color: white;
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
	font-size: 20px;
	float: right;
	margin-right: 40upx;
	margin-top: 14upx;
}
</style>
