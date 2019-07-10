<template>
	<div>
		
	
	<!-- <el-row>
  <el-col :span="24" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)" > 
	
		
		
	</el-col>
</el-row> -->
<read-task :words="words"  :type="type" :review="review"  v-if="taskin"></read-task>
		
	</div>
</template>

<script>
	import ReadTask from '@/components/ReadTask'
	

	import { review_list } from '@/api/table'
	
	export default {
		data() {
			return {
				taskid:0,
				taskin:false,
				// rautoplay:false,
				type:2,
				review:1,
				words: {}
			}
		},
		components: {
			ReadTask
		},
		filters: {

		},
		created() {
			//  status 0 未开始 1进行中	2初次完成	第一次复习，可能有错字，会进入后续复习 3	复习错字 	4	全部完成
			
			// type 0 听写 1 认字 2 复习
			
			 	 
			 // console.log(this.taskid)
			 
			 const loading = this.$loading({
						  lock: true,
						  text: '进入复习任务中...',
						  spinner: 'el-icon-loading',
						  background: '#000'
						});
					
			 review_list({userid:this.$store.state.user.userid,nums:this.$route.query.nums}).then(response => {
				loading.close();
				
				// console.log(response.word_data)
				
				// this.rautoplay = response.taskinfo.autoplay==0?false:true
				this.type = 2
				//this.relation_id = response.taskinfo.relation_id
				//this.relation_type = response.taskinfo.relation_type
				this.words = response.word_data
				this.taskin = true
				
			 })	
				
		 	
			// loading.close();
				// console.log(this.$store.state.user.userid)
				// console.log(this.words)
		},
		methods: {
			fetchData() {

			}
		}
	}
</script>
