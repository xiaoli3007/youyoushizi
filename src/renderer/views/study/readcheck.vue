<template>
	<div>
		<template>

			<el-row>
				<el-col :span="20" :offset="2" justify="center" align="center">
					<div class="" style="margin-top: 15px;">
						{{words.name}}
						<el-tag type="warning">听写对照</el-tag>
					</div>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="8" v-for="(singe, index) in words.word1" :key="index">
					<div class="grid-content bg-purple">
						<el-tabs tab-position="right" style=" margin-top: 15px;">
							<el-tab-pane label="字">
								<div class="tasktext">{{singe.sw}}</div>
							</el-tab-pane>
							<el-tab-pane label="词">
								<div class="tasktext_ci">{{singe.dw}}</div>
							</el-tab-pane>
							<el-tab-pane label="句">
								<div class="tasktext_ju">{{singe.lw}}</div>
							</el-tab-pane>
						</el-tabs>

						<el-row>
							<el-col :span="20" :offset="2" justify="center" align="center">
								<el-radio label="1" border>正确</el-radio>
								<el-radio label="2" border>错误</el-radio>
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
				</el-col>
			</el-row>
			
		</template>

	</div>
</template>

<script>
	// import ReadTask from '@/components/ReadTask'

	export default {
		data() {
			return {
				rautoplay: false,
				type: 1,
				words: {
					"id": "01",
					"name": "第一课 燕子",
					"word1": [{
							"sw": "燕",
							"sw_sound": "voice/26/73/2673734f025fa484228e34212569c44a.wav",
							"dw": "燕子",
							"dw_sound": "voice/b7/b9/b7b9ff4e590029ef27b7b1aa0b225890.wav",
							"lw": "一身乌黑光亮的羽毛，一对俊俏轻快的翅膀，加上剪刀似的尾巴，凑成了活泼机灵的小燕子。",
							"lw_sound": "voice/9d/f4/9df48d5d68f9bd2cb9f649328a6c7f43.wav",
							"check": ""
						},
						{
							"sw": "聚",
							"sw_sound": "voice/bb/e3/bbe314384b41246825a63ee0d592f028.wav",
							"dw": "聚拢",
							"dw_sound": "voice/28/f8/28f88368a520672c52800e89184b40e7.wav",
							"lw": "青的草，绿的叶，各色鲜艳的花，都像赶集似的聚拢来，形成了光彩夺目的春天。",
							"lw_sound": "voice/4d/cf/4dcf2e1b7484b6b137b04775c2cb976f.wav",
							"check": ""
						},
						{
							"sw": "增",
							"sw_sound": "voice/c0/a0/c0a0f275a8323b1b3a2ee07f821f11ec.wav",
							"dw": "增添",
							"dw_sound": "voice/94/6a/946a2e8a645b34a3f58a35c705c956a2.wav",
							"lw": "小燕子从南方赶来，为春光增添了许多生机。",
							"lw_sound": "voice/17/7b/177bb4ea7913763edf851b9265b8b8d7.wav",
							"check": ""
						},
						{
							"sw": "掠",
							"sw_sound": "voice/5c/4f/5c4f4923a63f25137f2e7eb5bc41d5ad.wav",
							"dw": "掠过",
							"dw_sound": "voice/18/53/1853946cc3eb1cb39018f0497d4404ee.wav",
							"lw": "燕子斜着身子在天空中掠过",
							"lw_sound": "voice/67/2a/672acd376b83e2fce654e582a224cea5.wav",
							"check": ""
						}
					],
				},


			}
		},
		components: {},
		filters: {

		},
		created() {
			// console.log(this.rautoplay);
			let temp = this.words.word1
			const selfmain = this
			_(temp).forEach(function(value, key) {
				
				_.set(temp, key+"[local_sw_sound]", require('@/assets/' + value.sw_sound));
				_.set(temp, key+"[local_dw_sound]", require('@/assets/' + value.dw_sound));
				_.set(temp, key+"[local_lw_sound]", require('@/assets/' + value.lw_sound));
				
				// _.set(selfmain.task_result, "[word1]"+key+"[text]", value.sw);
				// _.set(selfmain.task_result, "[word2]"+key+"[text]", value.sw);
				
				// _.set(selfmain.task_result, "[word1]"+key, '');
				// _.set(selfmain.task_result, "[fx_time]"+key, '');
				// _.set(selfmain.task_result, "[word2]"+key, '');
				
			});
			// console.log(11111111)
			console.log(this.words.word1)
		},
		methods: {
			gotoback() {
				this.$router.replace({
					name: 'Jiaocai'
				})
			},
		}
	}
</script>
<style>
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
		background: #eee;
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

	.tasktext,
	.tasktext_ci,
	.tasktext_ju {
		/* width: 500px; height: 300px; */
		font-size: 100px;
		/* text-align: center; */
		margin-top: 1rem;
		user-select: none;
		text-align: center;
	}

	.tasktext_ci {

		font-size: 60px;

	}

	.tasktext_ju {
	
		font-size: 20px;
		text-align: left; text-indent: 30px; margin-left: 15px;

	}
</style>
