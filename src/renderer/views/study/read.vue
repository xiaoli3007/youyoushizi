<template>
	<div>
		
	
	<!-- <el-row>
  <el-col :span="24" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)" > 
	
		
		
	</el-col>
</el-row> -->
<read-task :words="words" :rautoplay="rautoplay" :type="type" v-if="taskin"></read-task>
		
	</div>
</template>

<script>
	import ReadTask from '@/components/ReadTask'
	
	import { taskin  } from '@/api/task'
	import { taskone } from '@/api/table'
	
	export default {
		data() {
			return {
				taskid:0,
				taskin:false,
				rautoplay:false,
				type:1,
				words: {}
				// words: {
				// 	"id": "01",
				// 	"name": "第一课 燕子",
				// 	"word1": [{
				// 			"sw": "燕",
				// 			"sw_sound": "voice/26/73/2673734f025fa484228e34212569c44a.wav",
				// 			"dw": "燕子",
				// 			"dw_sound": "voice/b7/b9/b7b9ff4e590029ef27b7b1aa0b225890.wav",
				// 			"lw": "一身乌黑光亮的羽毛，一对俊俏轻快的翅膀，加上剪刀似的尾巴，凑成了活泼机灵的小燕子。",
				// 			"lw_sound": "voice/9d/f4/9df48d5d68f9bd2cb9f649328a6c7f43.wav"
				// 		},
				// 		{
				// 			"sw": "聚",
				// 			"sw_sound": "voice/bb/e3/bbe314384b41246825a63ee0d592f028.wav",
				// 			"dw": "聚拢",
				// 			"dw_sound": "voice/28/f8/28f88368a520672c52800e89184b40e7.wav",
				// 			"lw": "青的草，绿的叶，各色鲜艳的花，都像赶集似的聚拢来，形成了光彩夺目的春天。",
				// 			"lw_sound": "voice/4d/cf/4dcf2e1b7484b6b137b04775c2cb976f.wav"
				// 		},
				// 		{
				// 			"sw": "增",
				// 			"sw_sound": "voice/c0/a0/c0a0f275a8323b1b3a2ee07f821f11ec.wav",
				// 			"dw": "增添",
				// 			"dw_sound": "voice/94/6a/946a2e8a645b34a3f58a35c705c956a2.wav",
				// 			"lw": "小燕子从南方赶来，为春光增添了许多生机。",
				// 			"lw_sound": "voice/17/7b/177bb4ea7913763edf851b9265b8b8d7.wav"
				// 		},
				// 		{
				// 			"sw": "掠",
				// 			"sw_sound": "voice/5c/4f/5c4f4923a63f25137f2e7eb5bc41d5ad.wav",
				// 			"dw": "掠过",
				// 			"dw_sound": "voice/18/53/1853946cc3eb1cb39018f0497d4404ee.wav",
				// 			"lw": "燕子斜着身子在天空中掠过",
				// 			"lw_sound": "voice/67/2a/672acd376b83e2fce654e582a224cea5.wav"
				// 		}
				// 	],
				// 	"word2": [{
				// 			"sw": "俊",
				// 			"sw_sound": "voice/c7/85/c7857a45e8e8fb1b34e7ae0359d0ef5a.wav",
				// 			"dw": "俊俏",
				// 			"dw_sound": "voice/d2/1d/d21df8d96935542277f7b7e921c42261.wav",
				// 			"lw": "一身乌黑光亮的羽毛，一对俊俏轻快的翅膀，加上剪刀似的尾巴，凑成了活泼机灵的小燕子。",
				// 			"lw_sound": "voice/9d/f4/9df48d5d68f9bd2cb9f649328a6c7f43.wav"
				// 		},
				// 		{
				// 			"sw": "俏",
				// 			"sw_sound": "voice/97/ab/97ab6f1572ee7fda054f38a7937f5082.wav",
				// 			"dw": "俊俏",
				// 			"dw_sound": "voice/d2/1d/d21df8d96935542277f7b7e921c42261.wav",
				// 			"lw": "一身乌黑光亮的羽毛，一对俊俏轻快的翅膀，加上剪刀似的尾巴，凑成了活泼机灵的小燕子。",
				// 			"lw_sound": "voice/9d/f4/9df48d5d68f9bd2cb9f649328a6c7f43.wav"
				// 		},
				// 		{
				// 			"sw": "拂",
				// 			"sw_sound": "voice/50/96/5096b84939a6f6f266d5ef29d5d0bad0.wav",
				// 			"dw": "吹拂",
				// 			"dw_sound": "voice/09/a7/09a7238fb286b89118b60a9c0f5bd011.wav",
				// 			"lw": "微风吹拂着千万条才展开带黄色的嫩叶的柳丝。",
				// 			"lw_sound": "voice/1e/eb/1eeb1054e1a8c0f60b6a1d3591c32630.wav"
				// 		},
				// 		{
				// 			"sw": "谱",
				// 			"sw_sound": "voice/42/ff/42ff4f71a7a621300bbf72c5f3b73923.wav",
				// 			"dw": "五线谱",
				// 			"dw_sound": "voice/6d/f0/6df00f70dfd3e5424b2d54d944d8258a.wav",
				// 			"lw": "几对燕子飞倦了，落在电线上。蓝蓝的天空，电杆之间连着几痕细线，多么像五线谱啊!",
				// 			"lw_sound": "voice/ca/90/ca90be257ff82b53a6c5e79cd5a26eb8.wav"
				// 		}
				// 	]
				// },
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
			
			this.taskid = this.$route.query.taskid
			
			if(this.taskid==0){
				     
					this.rautoplay = this.$route.query.rautoplay==0?false:true
					this.type = this.$route.query.type==1?1:2
					this.relation_id = this.$route.query.relation_id
					this.relation_type = this.$route.query.relation_type
					const loading = this.$loading({
								  lock: true,
								  text: '创建任务中...',
								  spinner: 'el-icon-loading',
								  background: '#000'
								});
							
					taskin(this.$store.state.user.userid, 0, this.type, this.relation_id, this.relation_type, this.$route.query.rautoplay).then(response => {
						loading.close();
						// console.log(response.word1)
						// console.log(response.word_data)
						
						this.words = response.word_data
						this.taskin = true
					})	
				
			}else{
				 
				 console.log(this.taskid)
				 
				 const loading = this.$loading({
				 			  lock: true,
				 			  text: '查找任务中...',
				 			  spinner: 'el-icon-loading',
				 			  background: '#000'
				 			});
				 		
				 taskone({taskid:this.taskid}).then(response => {
				 	loading.close();
				 	
					console.log(response.word_data)
					
					this.rautoplay = response.taskinfo.autoplay==0?false:true
					this.type = parseInt(response.taskinfo.type)
					this.relation_id = response.taskinfo.relation_id
					this.relation_type = response.taskinfo.relation_type
				 	this.words = response.word_data
				 	this.taskin = true
					
					
				 })	
				
				
			}
		   
			
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
