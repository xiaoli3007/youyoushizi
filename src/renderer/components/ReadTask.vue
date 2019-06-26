<template>
	<div>
		<el-row>
			<el-col :span="20" :offset="2" justify="center" align="center">
				<div class="" style="margin-top: 15px;">
					<el-tag type="info"> {{words.name}}</el-tag>
					<el-tag type="info">
						<mytime :autoStart="true" :sendSync="true" ref="mytimea" v-on:getDataFromChild="getDataFromChild"></mytime>
					</el-tag>
					<!-- <el-tag type="info"> <mytime :autoStart="false" :sendSync="false" ref="mytimea2"></mytime> </el-tag> -->
					<el-tag type="info" @click.native="help_sy"> 调试按钮</el-tag>
					<el-tag type="success"> {{swiper_index}}/{{swiper_length}} </el-tag>
					<el-tag type="info" class="backbutton" @click.native="dialogTableVisible = true">使用帮助</el-tag>
					<el-tag type="info">
						<screenfull style="display: inline;" />
					</el-tag>
					<el-tag type="warning" @click.native="gotoback" class="backbutton">退出</el-tag>
				</div>
			</el-col>
		</el-row>

		<swiper :options="swiperOption" ref="mySwiper">
			<!-- slides -->
			<swiper-slide v-for="(slide, index) in words.word1" :key="index">
				<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center">

						<div class="tasktext" v-if="type===1">
							<svg-icon icon-class="erji2"></svg-icon>
						</div>



						<el-tabs v-model="TabsValue[index]" tab-position="right" style=" margin-top: 15px;" v-if="type===2">
							<el-tab-pane label="字" name='0'>
								<div class="tasktext" v-if="type===2">{{slide.sw}}</div>
							</el-tab-pane>
							<el-tab-pane label="词" name='1'>
								<div class="tasktext_ci" v-if="type===2">{{slide.dw}}</div>
							</el-tab-pane>
							<el-tab-pane label="句" name='2'>
								<div class="tasktext_ju" v-if="type===2">{{slide.lw}}</div>
							</el-tab-pane>
						</el-tabs>
					</el-col>
				</el-row>

				<el-row v-if="type===2">
					<el-col :span="20" :offset="2" justify="center" align="center">
						<!-- <el-radio ref='elradio' v-model="task_result.word1[index]" label="1" @change="know(this,index,'1')" border>认识</el-radio>
						<el-radio v-model="task_result.word1[index]" label="2" @change="know(this,index,'2')" border>不认识</el-radio> -->

						<myradio :listdata="RadioclassArr" v-on:passtoparentradio="passtoparentradio" v-model="task_result.word1[index]"></myradio>
					</el-col>
				</el-row>

				<el-row v-if="type===2">
					<el-col :span="20" :offset="2" justify="center" align="center">
						<el-tag type="info"> 下次复习时间</el-tag>


						<myradio :listdata="RadiofuxiArr[index]" v-on:passtoparentradio="passtoparentradio2" v-model="task_result.fx_time[index]"></myradio>
						<!-- <el-radio v-model="task_result.fx_time[index]" label="600" border>10分钟</el-radio>
						<el-radio v-model="task_result.fx_time[index]" label="3600" border>1小时</el-radio>
						<el-radio v-model="task_result.fx_time[index]" label="86400" border>1天</el-radio>
						<el-radio v-model="task_result.fx_time[index]" label="345600" border>4天</el-radio> -->
					</el-col>
				</el-row>


				<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center">



						<el-tooltip content="键盘:Home" placement="bottom" effect="light">
							<el-button size="small" @click.native="swiper_slideTo(0)" round>首字</el-button>
						</el-tooltip>
						<el-tooltip content="字音(键盘:空格)" placement="bottom" effect="light">
							<m-audio :show-duration="false" text="字" :src="slide.local_sw_sound" :block="false" ref="myaudio_zi" tabvalue="0"
							 v-on:passtoparenttabvlue="passtoparenttabvlue"></m-audio>
						</el-tooltip>
						<el-tooltip content="词音(键盘:T)" placement="bottom" effect="light">
							<m-audio :show-duration="false" text="词语" :src="slide.local_dw_sound" :block="false" ref="myaudio_ci" tabvalue="1"
							 v-on:passtoparenttabvlue="passtoparenttabvlue"></m-audio>
						</el-tooltip>
						<el-tooltip content="句音(键盘:S)" placement="bottom" effect="light">
							<m-audio :show-duration="false" text="例句" :src="slide.local_lw_sound" :block="false" ref="myaudio_ju" tabvalue="2"
							 v-on:passtoparenttabvlue="passtoparenttabvlue"></m-audio>
						</el-tooltip>
						<el-tooltip content="键盘:End" placement="bottom" effect="light">
							<el-button size="small" @click.native="swiper_slideTo(1)" round>尾字</el-button>
						</el-tooltip>
						<!-- <myaudio :show-duration="false" text="字" :block="false" :src="slide.local_sw_sound" ref="myaudio_ju"></myaudio> -->
					</el-col>
				</el-row>


				<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center">
						<el-button type="primary" v-if="index===words.word1.length-1 && type===1" @click="gotojc()">听写检查</el-button>
						<el-button type="primary" v-if="index===words.word1.length-1 && type===2" @click="gotoback()">认字完成</el-button>
					</el-col>
				</el-row>

			</swiper-slide>

			<!-- Optional controls -->
			<div class="swiper-pagination" slot="pagination"></div>
			<div class="swiper-button-prev" slot="button-prev"></div>
			<div class="swiper-button-next" slot="button-next"></div>
			<!--<div class="swiper-scrollbar" slot="scrollbar"></div> -->
		</swiper>


		<el-dialog title="使用帮助" :visible.sync="dialogTableVisible">
			<el-alert title="识字模式" type="success" :closable="false" description="1. 点击右侧 '字' '词' '句' 或 点击相应读音时， 显示对应字,词语,例句 ">
			</el-alert>

			<el-alert title="" type="success" :closable="false" description="2. 选择不认识，则会被加入到错字本 ">
			</el-alert>
			<el-alert title="" type="success" :closable="false" description=" 3. 在跳转过程中，每个字的检查结果保留">
			</el-alert>
			
			<el-alert title="键盘快捷键" type="warning" :closable="false" description="↑ ↓:切换字词句 ">
			</el-alert>
			
			<el-alert title="" type="warning" :closable="false" description="←:上一个字 ">
			</el-alert>

			<el-alert title="" type="warning" :closable="false" description="→:下一个字 ">
			</el-alert>
			<el-alert title="" type="warning" :closable="false" description="Home:转到第一个字 ">
			</el-alert>

			<el-alert title="" type="warning" :closable="false" description="End: 转到最后一个字">
			</el-alert>
			<el-alert title="" type="warning" :closable="false" description="空格: 字发音">
			</el-alert>
			<el-alert title="" type="warning" :closable="false" description="T: 词语发音">
			</el-alert>
			<el-alert title="" type="warning" :closable="false" description="S: 句子发音">
			</el-alert>

			<el-alert title="" type="warning" :closable="false" description="F1: 全屏幕">
			</el-alert>

		</el-dialog>




	</div>
</template>

<script>
	// import wavv from '@/assets/voice/26/73/2673734f025fa484228e34212569c44a.wav'
	const remote = require('electron').remote
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'

	import Screenfull from '@/components/Screenfull'
	import mytime from '@/components/mytime'
	import myradio from '@/components/myradio'
	
	import { taskin , taskindata ,taskinwcell } from '@/api/task'
	
	export default {
		name: 'read-task',
		props: {
			words: {
				type: Object
			},
			rautoplay: {
				type: Boolean,
				default: false
			},
			type: {
				type: Number,
				default: 1
			},
			// audiolist:[]
		},
		data() {
			const self = this
			return {
				// wavv,
				// data_rautoplay: this.rautoplay,
				// radioaaa: '',
				TabsValue: [],
				TabsValue2: '0',
				RadioclassArr: [{
					name: "认识",
					value: "1"
				}, {
					name: "不认识",
					value: "2"
				}],
				RadiofuxiArr: [],
				dialogTableVisible: false,
				task_result: {
					id: this.words.id,
					name: this.words.name,
					word1: [],
					fx_time: [],
					word2: []
				},
				// task_result: null,
				resource: '',
				isplaynow: false,
				thistype: this.words,
				swiper_index: 1,
				swiper_length: 0,
				xx_time: 0,
				swiperOption: {
					// some swiper options/callbacks
					// 所有的参数同 swiper 官方 api 参数
					// ...
					// effect : 'flip',

					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					pagination: {
						el: '.swiper-pagination',
						// type: 'fraction'
						type: 'progressbar'
					},
					simulateTouch: false, //禁止鼠标模拟
					autoplay: self.rautoplay ? {
						delay: 5000,
						stopOnLastSlide: true,
						disableOnInteraction: true,
					} : false,
					keyboard: { //键盘打开
						enabled: true,
						onlyInViewport: true,
					},
					on: {
						init: function() {
							//Swiper初始化了
							// console.log(self.rautoplay);	
							setTimeout(() => {
								// 								console.log('当前的slide序号是' + this.activeIndex);
								// 								console.log('当前的slide序号是' + this.realIndex);
								if (self.rautoplay) {
									self.$refs.myaudio_zi[this.realIndex].play()
								}
							}, 1000)
						},
						keyPress: function(event) {
							// console.log('你按了键盘' + event)
							if (event == 32) {
								//空格控制语音
								// console.log(this.audiolist)
								self.$refs.myaudio_zi[this.realIndex].play()
								// this.audiolist[this.realIndex].play()
								// this.audio=new Audio()
								// this.audio.src=require('@/assets/'+this.wordsdata.word1[this.realIndex].sw_sound)
								// this.audio.src='http://1252014125.vod2.myqcloud.com/46740e39vodcq1252014125/1db79a9a5285890783173288539/ZOaFuTmGs30A.mp3'
								// this.audio.play()
								// console.log(this.wordsdata.word1[this.realIndex].sw_sound);
								// console.log(this.realIndex);
								if (self.type == 2) {
									self.$set(self.TabsValue, this.realIndex, "0")
								}

							} else if (event == 84) { // 按键T 读词

								self.$refs.myaudio_ci[this.realIndex].play()

								if (self.type == 2) {
									self.$set(self.TabsValue, this.realIndex, "1")
								}

							} else if (event == 83) { // 按键S 读句子

								self.$refs.myaudio_ju[this.realIndex].play()

								if (self.type == 2) {
									self.$set(self.TabsValue, this.realIndex, "2")
								}

							} else if (event == 36) { //home 按键

								this.slideTo(0, 1000, false)

							} else if (event == 35) { //end 按键

								this.slideTo(this.slides.length, 1000, false)

							} else if (event == 38) { //上 按键

								if (parseInt(self.TabsValue[this.realIndex]) > 0) {
									// console.log(333)
									let t = parseInt(self.TabsValue[this.realIndex]) - 1
									self.$set(self.TabsValue, this.realIndex, t.toString())
								}
								// console.log(self.TabsValue[this.realIndex])	

							} else if (event == 40) { //下 按键

								// self.TabsValue[0]='2'
								// self.TabsValue2 = '2'
								if (parseInt(self.TabsValue[this.realIndex]) < 2) {
									// console.log(333)
									let t = parseInt(self.TabsValue[this.realIndex]) + 1
									self.$set(self.TabsValue, this.realIndex, t.toString())
								}
								// console.log(self.TabsValue[this.realIndex])	
							} else if (event == 112) { //F1 按键

								remote.getCurrentWindow().setFullScreen(!remote.getCurrentWindow().isFullScreen())
							}
						},
						slideChange: function() {
							// console.log('改变了')
							// remote.getCurrentWindow().focus()
							// console.log(remote.getCurrentWindow().isFocused())
							// console.log(this.realIndex);
							self.swiper_index = this.realIndex + 1
							setTimeout(() => {
								if (self.rautoplay) {
									self.$refs.myaudio_zi[this.realIndex].play()
								}
							}, 1000)
						}
					},
				}
			}
		},
		created() {
			console.log(this.words);
			let temp = this.words.word1
			const selfmain = this
			_(temp).forEach(function(value, key) {
				// console.log(value);
				let a = new Audio()
				// a.src = require('@/assets/' + value.sw_sound)
				a.src = value.sw_sound
				let b = new Audio()
				// b.src = require('@/assets/' + value.dw_sound)
				b.src = value.sw_sound
				let c = new Audio()
				// c.src = require('@/assets/' + value.lw_sound)
				c.src = value.sw_sound
				// this.audiolist.push(a)
				_.set(temp, key + "[sw_audio]", a);
				_.set(temp, key + "[dw_audio]", b);
				_.set(temp, key + "[lw_audio]", c);
				// _.set(temp, key + "[local_sw_sound]", require('@/assets/' + value.sw_sound));
				// _.set(temp, key + "[local_dw_sound]", require('@/assets/' + value.dw_sound));
				// _.set(temp, key + "[local_lw_sound]", require('@/assets/' + value.lw_sound));
				
				_.set(temp, key + "[local_sw_sound]", value.sw_sound);
				_.set(temp, key + "[local_dw_sound]", value.dw_sound);
				_.set(temp, key + "[local_lw_sound]", value.lw_sound);
				

				// _.set(selfmain.task_result, "[word1]"+key+"[text]", value.sw);
				// _.set(selfmain.task_result, "[word2]"+key+"[text]", value.sw);

				_.set(selfmain.task_result, "[word1]" + key, '');
				_.set(selfmain.task_result, "[fx_time]" + key, '');
				_.set(selfmain.task_result, "[word2]" + key, '');

				_.set(selfmain.TabsValue, key, "0");
				_.set(selfmain.RadiofuxiArr, key, [{
					name: "6天",
					value: "6",
					quality:2
				}, {
					name: "14天",
					value: "14",
					quality:3
				}, {
					name: "15天",
					value: "15",
					quality:4
				}, {
					name: "16天",
					value: "16",
					quality:5
				}]);

			});
			// console.log(11111111)
			// console.log(this.TabsValue)
		},
		components: {
			Screenfull,
			mytime,
			myradio
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			}
		},
		mounted() {
			// 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
			console.log(this.words);
			this.swiper.wordsdata = this.words
			// this.audiolist = new Audio() swiper_length
			// console.log(this.swiper)
			this.swiper_index = this.swiper.realIndex + 1
			this.swiper_length = this.swiper.slides.length
			// this.swiper.audiolist = temp
		},
		methods: {
			gotoback() {
				this.$router.replace({
					name: 'Jiaocai'
				})
			},
			gotojc() {
				this.$router.replace({
					name: 'ReadCheck'
				})
			},
			swiper_slideTo(data) {
				// console.log(this.words);
				if (data === 0) {
					this.swiper.slideTo(0, 1000, false)
				} else {
					this.swiper.slideTo(this.swiper.slides.length - 1, 1000, false)
				}
			},
			know(that, index, knowtype) {

				// console.log("字type" + knowtype);
				// console.log(this.task_result)
				// this.swiper.slideTo(this.swiper.realIndex + 1, 500, false)
				// remote.getCurrentWindow().show()
				// console.log(remote.getCurrentWindow().isFocused())
				// this.swiper.$wrapperEl[0].focus()
				// console.log(this.swiper.$wrapperEl[0])
			},
			passtoparenttabvlue(index) {
				// console.log("索引" + index);
				if (this.type == 2) {
					this.$set(this.TabsValue, this.swiper.realIndex, index)
				}
			},
			help_sy() {
				console.log(typeof this.task_result);
				
				var str = JSON.stringify(this.task_result);
				
				taskindata(15,str).then(response => {
						console.log(response.data)
				})
				
				
				// this.$set(this.TabsValue,0,'2')
				// this.TabsValue[0]='0'
				// console.log(this.$refs.mytimea.all_second)
				// console.log(this.$refs.elradio[this.swiper.realIndex].focus);
				// this.swiper.slideTo(this.swiper.realIndex + 1, 500, false)
			},
			getDataFromChild(data) {
				this.xx_time = data
				// console.log("getDataFromChild"+this.xx_time);
			},
			passtoparentradio(data) {
				console.log("passtoparentradio---" + data);
				this.$set(this.task_result.word1, this.swiper.realIndex, data)
				
				//发送请求记录当前字的 学习状态 计算难度因子
				taskinwcell(15,12,11,data).then(response => {
						console.log(response.data)
				})
				
				this.swiper.slideTo(this.swiper.realIndex + 1 < this.swiper.slides.length ? this.swiper.realIndex + 1 : this.swiper
					.slides.length, 500, false)
			},
			passtoparentradio2(data) {
				console.log("passtoparentradio2---" + data);
				this.$set(this.task_result.fx_time, this.swiper.realIndex, data)
			}

		}
	}
</script>

<style>
	.tasktext,
	.tasktext_ci,
	.tasktext_ju {
		/* width: 500px; height: 300px; */
		font-size: 500px;
		/* text-align: center; */
		margin-top: 1rem;
		user-select: none;
	}

	.tasktext_ci {

		font-size: 300px;

	}

	.tasktext_ju {

		font-size: 100px;
		text-align: left;

	}

	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.backbutton {
		cursor: pointer;
	}
</style>
