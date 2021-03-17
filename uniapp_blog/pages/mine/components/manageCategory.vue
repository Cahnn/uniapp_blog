<template>
	<view>
		<view class="categoryItem" v-for="(item,index) in categoryFilterList" :key="index" v-show="item.name!='全部'">
			<view class="name">{{item.name}}</view>
			<!-- <view class="edit" @tap="editCategory"><image src="../../../static/mine/edit.png"></image></view> -->
			<view class="remove" @tap="removeCategory(item)"><image src="../../../static/mine/remove.png"></view>
		</view>
		<view class="add" @tap="addCategory">
			<image src="../../../static/添加.png" style="width: 50upx;height: 50upx;"></image>
			<view>新增分类</view>
		</view>
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog mode="input" value="" placeholder="输入分类名称" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'   
	export default {
		data() {
			return {
				categoryFilterList:[],
			}
		},
		components: {
			uniPopupDialog
		},
		onLoad() {
			// 获取分类列表
			this.getFilterList()
		},
		methods: {
			async getFilterList(){
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
			closeChange(done){
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				done()
			},
			confirmChange(done,value){
				console.log(value)
				done()
			},
			close(done){
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				done()
			},
			confirm(done,value){
				// 输入框的值
				console.log(value)
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				uni.request({
					url:this.server_url+'/categoryFilterList/add',
					method:"POST",
					header:{
						// 固定格式
						'content-type':'application/x-www-form-urlencoded'
					},
					data:{
						name:value,
						selected:0,
						category:value+'1'
					},
					success: (res) => {
						console.log(res)
						this.getFilterList()
					},
					fail: (err) => {
						console.log(err)
					}
				})
				done()
			},
			removeCategory(item){
				console.log(item.id)
				console.log(item.category)
				uni.showModal({
					title:"提示",
					content:"删除该分类会连同该分类的文章一同删除，确定删除吗?",
					success:(e)=>{
						if(e.confirm){
							uni.request({
								url:this.server_url+'/categoryFilterList/remove',
								method:"POST",
								data:{
									id:item.id
								},
								success: (res) => {
									uni.request({
										url:this.server_url+'/blog/removeCategory',
										method:"POST",
										data:{
											classify:item.category
										},
										success: () => {
											code:200,
											uni.showToast({
												title:"已删除",
												icon:"success"
											})
											this.getFilterList()
										},
										fail: (err) => {
											console.log(err)
										}
									})
								},
								fail: (err) => {
									console.log(err)
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
			
			addCategory(){
				this.$refs.popup.open()
			}
		}
	}
</script>

<style scoped lang="less">
	.categoryItem{
		width: 90%;
		height: 120upx;
		line-height: 120upx;
		margin: 0 auto;
		border-bottom: 2upx solid #F8F8F8;
		font-size: 40upx;
		display: flex;
	}
	.name{
		flex: 1;
	}
	.edit, .remove{
		padding: 15upx 0 0 10upx;
		width: 15%;
		image{
			width: 50upx;
			height: 50upx;
			margin-left: 20upx;
		}
	}
	.add{
		width: 100%;
		height: 120upx;
		line-height: 120upx;
		display: flex;
		background-color: #F2F2F2;
		image{
			margin: 33upx 20upx 0 35%;
		}
	}
</style>
