<template>
	<div class="app-container">

		<el-row v-if="taskin">
			<el-col :span="20" :offset="2" justify="center" align="center">
				<div class="" style="margin-top: 15px;">
					<span>{{program.title}}</span>
					<el-tag type="info" @click.native="gotoback"  class="backbutton"> 返回</el-tag>
				</div>
			</el-col>
		</el-row>
		
		
		<el-row v-if="taskin">
			<el-col :span="20" :offset="2" justify="left" align="left">
				<div class="" style="margin-top: 15px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);padding: 10px;font-size: 12px; line-height: 20px;">
					
					<p v-if="program.author!=''">作者：{{program.author}}</p>
					<p v-if="program.subject!=''">主题：{{program.subject}}</p>
    <p v-if="program.description!=''">简介：{{program.description}}</p>
				</div>
			</el-col>
		</el-row>
		
		
			<el-row v-if="taskin" v-for="(slide, index) in data" :key="index">
				<el-col :span="20" :offset="2" justify="left" align="left">
					<div class="" style="margin-top: 15px;">
						<span><el-tag type="warning">{{slide.name}}</el-tag></span>
						<el-divider></el-divider>
						<template v-for="sub in slide.wcell_list">
						
						<span > {{sub.word}}</span> <el-divider direction="vertical"></el-divider>
						 </template>
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
				program: null,
				data: null,
				taskin:false,
			}
		},
		filters: {

		},
		created() {
			
			this.ebookid = this.$route.query.ebookid
			// this.ebookid = 446654
			console.log(this.ebookid );
			this.init()
   
		},
		methods: {
				 gotoback(a) {
					 // console.log(a);
					this.$router.replace({ name: 'Book'})
				},
			fetchData() {
				const loading = this.$loading({
							  lock: true,
							  text: '加载中...',
							  spinner: 'el-icon-loading',
							  background: '#000'
							});

				const params = {
					ebookid: this.ebookid,
				}
				getbookshow(params).then(response => {
					loading.close();
					this.data = response.items
					this.program = response.program
					console.log(response);
					this.taskin = true
				})
			},

			init() {
				this.fetchData()
			},

		},
	}
</script>
