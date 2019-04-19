<template>
	<div>
		<swiper :options="swiperOption" ref="mySwiper">
			<!-- slides -->
			<swiper-slide v-for="(slide, index) in words.word1" :key="index">

				<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center">
						<div class="aaa">{{slide.sw}}</div>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center">
						<m-audio :show-duration="false" text="点击或按空格播放" :src="require('@/assets/'+slide.sw_sound)" :block="false"
						 ref="myaudio"></m-audio>
						 
						
						  
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center">
						<!-- <div class="aaa"><audio class="success" :src="wavv" autoplay="autoplay"></audio></div> -->
						<el-button type="warning" v-if="index===words.word1.length-1">从新开始</el-button>
						<el-button type="primary" v-if="index===words.word1.length-1">已到达最后，点击对照错字</el-button>
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
			// audiolist:[]
		},
		data() {
			const self = this
			return {
				// wavv,
				// data_rautoplay: this.rautoplay,
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
									self.$refs.myaudio[this.realIndex].play()
							}, 3000)
						},
						keyPress: function(event) {
							// console.log('你按了键盘' + event)
							if (event == 32) {
								//空格控制语音
								// console.log(this.audiolist)
								self.$refs.myaudio[this.realIndex].play()
								// this.audiolist[this.realIndex].play()
								// this.audio=new Audio()
								// this.audio.src=require('@/assets/'+this.wordsdata.word1[this.realIndex].sw_sound)
								// this.audio.src='http://1252014125.vod2.myqcloud.com/46740e39vodcq1252014125/1db79a9a5285890783173288539/ZOaFuTmGs30A.mp3'
								// this.audio.play()
								// console.log(this.wordsdata.word1[this.realIndex].sw_sound);
								// console.log(this.realIndex);
							} else if (event == 36) { //home 按键
								
								this.slideTo(0, 1000, false)
								
							} else if (event == 35) { //end 按键
								
								this.slideTo(this.slides.length, 1000, false)
							}
						},
						slideChange: function() {
							// console.log('改变了')
							// console.log(this.realIndex);
							self.$refs.myaudio[this.realIndex].play()
						}
					},
				}
			}
		},
		created() {
			// console.log(this.rautoplay);
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
	.aaa {
		/* width: 500px; height: 300px; */
		font-size: 500px;
		/* text-align: center; */
		margin-top: 6.25rem;
	}
	 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
