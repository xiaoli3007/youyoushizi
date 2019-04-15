<template>
	<div>
		<swiper :options="swiperOption" ref="mySwiper" >
			<!-- slides -->
			<swiper-slide><div class="aaa">张</div></swiper-slide>
			<swiper-slide><div class="aaa">李</div></swiper-slide>
			<swiper-slide><div class="aaa">丹</div></swiper-slide>
			
			<!-- Optional controls -->
			<!-- <div class="swiper-pagination" slot="pagination"></div>
			<div class="swiper-button-prev" slot="button-prev"></div>
			<div class="swiper-button-next" slot="button-next"></div>
			<div class="swiper-scrollbar" slot="scrollbar"></div> -->
		</swiper>
	</div>
</template>

<script>
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'

	export default {
		name: 'read-task',
		data() {
			return {
				swiperOption: {
					// some swiper options/callbacks
					// 所有的参数同 swiper 官方 api 参数
					// ...
				}
			}
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			}
		},
		mounted() {
			// current swiper instance
			// 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
			console.log('this is current swiper instance object', this.swiper)
			this.swiper.slideTo(3, 1000, false)
		}
	}
</script>

<style>
	.aaa{ /* width: 500px; height: 300px; */ font-size:500px; text-align: center;margin-top: 6.25rem;}
</style>
