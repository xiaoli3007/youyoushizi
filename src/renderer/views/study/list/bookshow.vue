<template>
	<div class="app-container">

		<el-row>
			<el-col :span="20" :offset="2" justify="center" align="center">
				<div class="" style="margin-top: 15px;">
					<el-tag type="success">标题撒发顺丰那卡死发卡方</el-tag>
					<el-tag type="info" @click.native="gotoback"  class="backbutton"> 返回</el-tag>
				</div>
			</el-col>
		</el-row>
		
		
		<el-row>
			<el-col :span="20" :offset="2" justify="left" align="left">
				<div class="" style="margin-top: 15px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);padding: 10px;font-size: 12px; line-height: 20px;">
					
					<p>作者：张三</p>
    <p>简介：啊啥法萨芬啊啥法萨芬啊啥法萨芬啊啥法萨芬啊啥法萨芬啊啥法萨芬啊啥法萨芬啊啥
					 法萨芬啊啥法萨芬啊啥法萨芬啊啥法萨芬啊啥法萨
					 芬啊啥法萨芬啊啥法萨芬啊啥法萨芬啊啥法萨芬啊啥法萨芬啊啥法
					 萨芬啊啥法萨芬啊啥法萨芬啊啥法萨芬啊啥法萨芬啊啥法萨芬</p>
				</div>
			</el-col>
		</el-row>
		
		
			<el-row>
				<el-col :span="20" :offset="2" justify="left" align="left">
					<div class="" style="margin-top: 15px;">
						<span><el-tag type="warning">分类1</el-tag></span>
						<el-divider></el-divider>
						<span>雨纷纷</span>
						<el-divider direction="vertical"></el-divider>
						<span>旧故里</span>
						<el-divider direction="vertical"></el-divider>
						<span>草木深</span>
					</div>
				</el-col>
			</el-row>
			
			<el-row>
				<el-col :span="20" :offset="2" justify="left" align="left">
					<div class="" style="margin-top: 15px;">
						<span><el-tag type="warning">分类1</el-tag></span>
						<el-divider></el-divider>
						<span>雨纷纷</span>
						<el-divider direction="vertical"></el-divider>
						<span>旧故里</span>
						<el-divider direction="vertical"></el-divider>
						<span>草木深</span>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20" :offset="2" justify="left" align="left">
					<div class="" style="margin-top: 15px;">
						<span><el-tag type="warning">分类1</el-tag></span>
						<el-divider></el-divider>
						<span>雨纷纷</span>
						<el-divider direction="vertical"></el-divider>
						<span>旧故里</span>
						<el-divider direction="vertical"></el-divider>
						<span>草木深</span>
					</div>
				</el-col>
			</el-row>
		
		

	</div>
</template>

<script>
	import {
		getbookshow
	} from '@/api/table'
	import _g from '@/utils/global.js'

	export default {
		data() {
			return {
				ebookid: 0,
				detaile: null,
				listLoading: true,
			}
		},
		filters: {

		},
		created() {
			
			this.ebookid = this.$route.query.ebookid
			console.log(this.ebookid );
			this.init()

		},
		methods: {
				 gotoback(a) {
					 // console.log(a);
					this.$router.replace({ name: 'Book'})
				},
			fetchData() {
				// this.listLoading = true
				// const params = {
				// 	keywords: this.keywords,
				// }
				// getbookshow(params).then(response => {
				// 	// this.detaile = response.items
				// 	this.listLoading = false
				// 	console.log(response);
				// })
				// this.listLoading = false
			},

			init() {
				this.fetchData()
			},

		},
	}
</script>
