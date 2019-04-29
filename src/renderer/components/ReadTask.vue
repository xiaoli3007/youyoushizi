<template>
	<div>
		<swiper :options="swiperOption" ref="mySwiper">
			<!-- slides -->
			<swiper-slide v-for="(slide, index) in words.word1" :key="index">

				<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center">
						<div class="" style="margin-top: 15px;">
							<el-tag type="info"> 第三册第二课听写任务--听写 </el-tag>
							<el-tag type="success"> 3/12 </el-tag>
							<el-tag type="info"> 用时：03:45 </el-tag>
							<el-tag type="info">
								<screenfull style="display: inline;" />
							</el-tag>
							<el-tag type="warning" @click.native="gotoback">退出</el-tag>
						</div>
					</el-col>
				</el-row>



				<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center">
						<div class="tasktext" v-if="type===2">{{slide.sw}}</div>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center">

							<el-radio v-model="radioaaa" label="1" @change="testa(1)" border>认识</el-radio>
							<el-radio v-model="radioaaa" label="2" @change="testa(2)" border>不认识</el-radio>


					</el-col>
				</el-row>

				<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center">
						<el-tag type="info" @click.native="testa(1)">首字</el-tag>

						<m-audio :show-duration="false" text="字" :src="require('@/assets/'+slide.sw_sound)" :block="false" ref="myaudio_zi"></m-audio>

						<m-audio :show-duration="false" text="词语" :src="require('@/assets/'+slide.dw_sound)" :block="false" ref="myaudio_ci"></m-audio>

						<m-audio :show-duration="false" text="例句" :src="require('@/assets/'+slide.lw_sound)" :block="false" ref="myaudio_ju"></m-audio>
						<el-tag type="info">尾字</el-tag>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center">
						<!-- <div class="aaa"><audio class="success" :src="wavv" autoplay="autoplay"></audio></div> -->
						<el-button type="primary" v-if="index===words.word1.length-1">听写检查</el-button>
						<!-- <el-button type="primary" @click="onEnlargeText" >111</el-button> -->
					</el-col>
				</el-row>

			</swiper-slide>

			<!-- Optional controls -->
			<div class="swiper-pagination" slot="pagination"></div>
			<div class="swiper-button-prev" slot="button-prev"></div>
			<div class="swiper-button-next" slot="button-next"></div>
			<!--<div class="swiper-scrollbar" slot="scrollbar"></div> -->
		</swiper>
	</div>
</template>

<script>
	// import wavv from '@/assets/voice/26/73/2673734f025fa484228e34212569c44a.wav'

	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'

	import Screenfull from '@/components/Screenfull'

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
				radioaaa: '',
				resource: '',
				isplaynow: false,
				thistype: this.words,
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
									self.$refs.myaudio[this.realIndex].play()
								}
							}, 2000)
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
							} else if (event == 84) { // 按键T 读词

								self.$refs.myaudio_ci[this.realIndex].play()

							} else if (event == 83) { // 按键S 读句子

								self.$refs.myaudio_ju[this.realIndex].play()

							} else if (event == 36) { //home 按键

								this.slideTo(0, 1000, false)

							} else if (event == 35) { //end 按键

								this.slideTo(this.slides.length, 1000, false)
							}
						},
						slideChange: function() {
							// console.log('改变了')
							// console.log(this.realIndex);
							// setTimeout(() => {
							// 	self.$refs.myaudio[this.realIndex].play()
							// }, 1000)
						}
					},
				}
			}
		},
		created() {
			// console.log(this.rautoplay);
		},
		components: {
			Screenfull
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			}
		},
		mounted() {
			// current swiper instance
			// 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
			// console.log(this.words);
			this.swiper.wordsdata = this.words
			// this.audiolist = new Audio()
			var temp = this.words.word1
			_(temp).forEach(function(value, key) {
				// console.log(value);
				let a = new Audio()
				a.src = require('@/assets/' + value.sw_sound)
				// this.audiolist.push(a)
				_.set(temp, key, a);
			});
			// console.log(temp)
			this.swiper.audiolist = temp
			// console.log('this is current swiper instance object', this.swiper)
			// this.swiper.slideTo(3, 1000, false)
		},
		methods: {
			gotoback() {
				this.$router.replace({
					name: 'Jiaocai'
				})
			},
			testa(data) {
				console.log(data);
			},
			onEnlargeText() {
				//console.log(this.isplaynow);
				//this.isplaynow = true
				//console.log(this.isplaynow);
				// console.log(this.$refs.myaudio[0].play());
				// this.$refs.myaudio.play()
			}
		}
	}
</script>

<style>
	.tasktext {
		/* width: 500px; height: 300px; */
		font-size: 500px;
		/* text-align: center; */
		margin-top: 1rem;
		user-select: none;
	}

	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}
</style>
