<template>
	<div class="readcheck">
		<template>

			<el-row>
				<el-col :span="20" :offset="2" justify="center" align="center">
					<div class="" style="margin-top: 15px;">
						<el-tag type="success">{{words.name}}</el-tag>
						<el-tag type="warning">听写对照</el-tag>
						<el-tag type="info">
							<screenfull style="display: inline;" />
						</el-tag>
						<el-tag type="danger" @click.native="gotoback"  class="backbutton"> 退出</el-tag>
					</div>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="8" v-for="(singe, index) in words.word1" :key="index">
					<div class="grid-content bg-purple">
						<el-tabs tab-position="right" style=" margin-top: 15px;">
							<el-tab-pane label="字">
								<div class="checktext">{{singe.sw}}</div>
							</el-tab-pane>
							<el-tab-pane label="词">
								<div class="checktext_ci">{{singe.dw}}</div>
							</el-tab-pane>
							<el-tab-pane label="句">
								<div class="checktext_ju">{{singe.lw}}</div>
							</el-tab-pane>
						</el-tabs>

						<el-row>
							<el-col :span="20" :offset="2" justify="center" align="center">
								<el-radio v-model="task_result[index].status" label="1" border @change="know(index,'1')">正确</el-radio>
								<el-radio v-model="task_result[index].status" label="2" border @change="know(index,'2')">错误</el-radio>
							</el-col>
						</el-row>

						<el-row>
							<el-col :span="20" :offset="2" justify="center" align="center">
								<m-audio :show-duration="false" text="字" :src="singe.local_sw_sound" :block="false" ref="myaudio_zi"></m-audio>
								<m-audio :show-duration="false" text="词" :src="singe.local_dw_sound" :block="false" ref="myaudio_ci"></m-audio>
								<m-audio :show-duration="false" text="句" :src="singe.local_lw_sound" :block="false" ref="myaudio_ju"></m-audio>
							</el-col>
						</el-row>


					</div>
				</el-col>

			</el-row>
			
			<el-row>
				<el-col :span="20" :offset="2" justify="center" align="center">
					<el-button type="primary" @click="gotoback()">检查完成</el-button>
					
					<!-- <el-button type="primary" @click="cs()">cs</el-button> -->
					
				</el-col>
			</el-row>
			
		</template>

	</div>
</template>

<script>

import { taskindata  } from '@/api/task'
import _g from '@/utils/global.js'	
	// import ReadTask from '@/components/ReadTask'
import Screenfull from '@/components/Screenfull'
	export default {
		data() {
			return {
				words: {},
				task_result: [],
			}
		},
		components: {Screenfull},
		filters: {

		},
		computed: {
		　　 
		},
		created() {
			// console.log(this.$route.query.words);
			
			this.words = this.$route.query.words
			let temp = this.words.word1
			const selfmain = this
			_(temp).forEach(function(value, key) {
				// _.set(selfmain.task_result, "[word1]" + key+"[status]", '');
				_.set(selfmain.task_result, key+"[wcellid]", value.wcellid);
				 
				_.set(selfmain.task_result, key+"[status]", '');
				// _.set(selfmain.words.word1, key+"[check]", '');
				//selfmain.$set(selfmain.task_result, "status", 0);
			});
			
		 
			// console.log(11111111)
			// console.log(this.task_result)
			this.task_result = Object.assign({},this.task_result)

			// console.log(typeof this.task_result );
		},
		methods: {
			know( index, knowtype) {
			
				//console.log("字type" + knowtype);
				//console.log("字22222type" + this.task_result[index].status);
				 
				// this.$set(this.task_result[index], "status", knowtype);
				
				  
				//this.task_result = Object.assign({},this.task_result)
				//console.log(this.task_result)
			},
			gotoback() {
				
				var str = JSON.stringify(this.task_result);
				
				 const loading = this.$loading({
							  lock: true,
							  text: '记录数据中， 请稍等...',
							  spinner: 'el-icon-loading',
							  background: 'rgba(0, 0, 0, 0.7)'
							});
				
				taskindata(this.$store.state.user.userid,this.words.taskid,str).then(response => {
						// console.log(response)
						
						loading.close();
						
						if(response.code==20000){
							
							_g.toastMsg('success', '记录成功！',this)
								
							this.$router.replace({
								name: 'Task'
							})
						}
				})
		 		
			},
			cs() {
				//console.log(this.words)
				console.log(this.words.taskid)
				console.log(this.task_result)
				
				// var str = JSON.stringify(this.task_result);
				// 
				// taskindata(this.$store.state.user.userid,this.words.taskid,str).then(response => {
				// 		// console.log(response)
				// })
				
				
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.readcheck{
	.el-row {
		margin: 20px 0 0;
		padding: 0 15px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
		margin-bottom: 20px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #eee; border: 1px solid #ccc;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 300px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.checktext,
	.checktext_ci,
	.checktext_ju {
		/* width: 500px; height: 300px; */
		font-size: 100px;
		/* text-align: center; */
		margin-top: 1rem;
		user-select: none;
		text-align: center;
	}

	.checktext_ci {

		font-size: 60px;

	}

	.checktext_ju {
	
		font-size: 20px;
		text-align: left; text-indent: 30px; margin-left: 15px;

	}
	}
</style>
