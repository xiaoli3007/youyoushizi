<template>
	<div>
		<swiper :options="swiperOption" ref="mySwiper">
			<!-- slides -->
			<swiper-slide v-for="(slide, index) in words.word1" :key="index">
				<div class="aaa">{{slide.sw}}</div>
				
				<m-audio :show-duration="false" text="点击或按空格播放" :src="require('@/assets/'+slide.sw_sound)" :block="false"  ></m-audio>
				
				<!-- <div class="aaa"><audio class="success" :src="wavv" autoplay="autoplay"></audio></div> -->
				<el-button type="warning" v-if="index===words.word1.length-1">从新开始</el-button>
				<el-button type="primary" v-if="index===words.word1.length-1">已到达最后，点击对照错字</el-button>
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
	import wavv from '@/assets/voice/26/73/2673734f025fa484228e34212569c44a.wav'
	
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
			audiolist:null
		},
		data() {
			return {
				wavv,
				thistype: this.words,
				swiperOption: {
					// some swiper options/callbacks
					// 所有的参数同 swiper 官方 api 参数
					// ...
					navigation: {
					  nextEl: '.swiper-button-next',
					  prevEl: '.swiper-button-prev',
					},
					pagination: {
						el: '.swiper-pagination',
						type: 'progressbar'
					},
					simulateTouch: false, //禁止鼠标模拟
					autoplay: false,
// 					autoplay: {
// 						delay: 1000,
// 						stopOnLastSlide: true,
// 						disableOnInteraction: true,
// 					},
					keyboard: { //键盘打开
						enabled: true,
						onlyInViewport: true,
					},
					on: {
						init: function(){
						  //Swiper初始化了
						  
						  setTimeout(() => {
							  console.log('当前的slide序号是'+this.activeIndex);
							  console.log('当前的slide序号是'+this.realIndex);
						  }, 3000)
						},
						keyPress: function(event) {
							console.log('你按了键盘' + event)
							if (event == 32) {
								//空格控制语音
								this.audio=new Audio()
								this.audio.src=require('@/assets/'+this.wordsdata.word1[this.realIndex].sw_sound)
								// this.audio.src='http://1252014125.vod2.myqcloud.com/46740e39vodcq1252014125/1db79a9a5285890783173288539/ZOaFuTmGs30A.mp3'
								this.audio.play()
								// console.log(this.wordsdata.word1[this.realIndex].sw_sound);
								// console.log(this.realIndex);
							}
						},
						slideChange: function() {
							// console.log('改变了')
// 							this.audio=new Audio()
// 							this.audio.src=require('@/assets/'+this.wordsdata.word1[this.realIndex].sw_sound)
// 							this.audio.play()
							console.log(this.realIndex);
						}
					},
				}
			}
		},
		created() {
			// console.log(this.words);
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
			this.audiolist = new Audio()
			console.log('this is current swiper instance object', this.swiper)
			// this.swiper.slideTo(3, 1000, false)
		},
		methods: {
			testa(data) {
				console.log(data);
			}
		}
	}
</script>

<style>
	.aaa {
		/* width: 500px; height: 300px; */
		font-size: 500px;
		text-align: center;
		margin-top: 6.25rem;
	}
</style>
