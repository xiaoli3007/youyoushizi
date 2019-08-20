<template>
	<div class="app-container">

		<el-row v-if="taskin">
			<el-col :span="20" :offset="2" justify="center" align="center">
				<div class="" style="margin-top: 15px;">
					<span>{{program.title}}</span>
					<el-tag type="info" @click.native="gotoback" class="backbutton"> 返回</el-tag>
				</div>
			</el-col>
		</el-row>


		<el-row v-if="taskin">
			
			<el-col :span="20" :offset="2" justify="left" align="left">
				<div class="" style="margin-top: 15px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);padding: 10px;font-size: 12px; line-height: 20px;">
				
				<el-row> 
					<el-col :span="3"  >
						<el-image style="width: 120px;cursor: pointer; " :src="program.thumb_zm" fit="fill" ></el-image>
					</el-col>
					
					<el-col :span="21"  justify="left" align="left">
						
							<p v-if="program.author!=''">作者：{{program.author}}</p>
							<p v-if="program.subject!=''">主题：{{program.subject}}</p>
							<p v-if="program.description!=''">详细描述：{{program.description}}</p>
							<p v-if="program.toc!=''" >目录：<span v-html="program.toc"></span></p>
							
						 
				</el-col> 
				</el-row>
				</div>
			</el-col>
		</el-row> 
	
	</div>
</template>

<script>
	import {
		getbookshowrecommend
	} from '@/api/table'
	import _g from '@/utils/global.js'

	export default {
		data() {
			return {
				ebookid: 0,
				program: null,
				data: null,
				taskin: false,
				activeName: 'first',
				activetablist:null
			}
		},
		filters: {

		},
		created() {

			this.ebookid = this.$route.query.ebookid
			// this.ebookid = 446654
			// console.log(this.ebookid);
			this.init()
			
		},
		methods: {
			 
			gotoback(a) {
				// console.log(a);
				this.$router.replace({
					name: 'BookRecommend'
				})
			},
			fetchData() {
				const loading = this.$loading({
					lock: true,
					text: '加载中...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});

				const params = {
					ebookid: this.ebookid,
					userid:this.$store.state.user.userid
				}
				getbookshowrecommend(params).then(response => {
					loading.close();
					console.log(response);
					this.data = response.items
					this.program = response.program
					// this.activetablist = JSON.parse(JSON.stringify(response.datas_tab)); 
					// console.log(response);
					this.taskin = true
					
					// console.log(this.activetablist);
					
				})
				
					
			},

			init() {
				this.fetchData()
			},

		},
	}
</script>
