<template>
  <div class="app-container">
		
		
<el-form ref="form" :model="form" label-width="200px">
  

<!--  <el-form-item label="调试窗口">
   <el-button type="primary" @click="openDev">打开 / 关闭 调试窗口</el-button>
   
  </el-form-item> -->
	
	
  <el-form-item label="播放声音">
    <el-radio-group v-model="form.voicetype">
      <el-radio :label="2">女声</el-radio>
			 <el-radio :label="1">男声</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="听写间隔时间(秒)">
     <el-slider v-model="form.autoplay_time" :min="3" :max="20" show-input></el-slider>
  </el-form-item>
	
	 <el-form-item label="自动听写重复播报次数">
	   <el-slider v-model="form.autoplay_repeat" :min="1" :max="5" show-input></el-slider>
	</el-form-item>
	
  <el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>
    <!-- <el-button>取消</el-button> -->
  </el-form-item>
</el-form>

  </div>
</template>

<script>
	const { shell, getCurrentWebContents } = require('electron').remote
	
	import { setVoicetype, setAutoplay_time ,getVoicetype ,getAutoplay_time,getAutoplay_repeat,setAutoplay_repeat} from '@/utils/auth'
		import _g from '@/utils/global.js'	
		import { setting  } from '@/api/task'
		
  export default {
    data() {
      return {
        form: {
          voicetype: getVoicetype()?parseInt(getVoicetype()):2,
          autoplay_time: getAutoplay_time()?parseInt(getAutoplay_time()):5,
          autoplay_repeat: getAutoplay_repeat()?parseInt(getAutoplay_repeat()):1
        }
      }
    },
		created() {
			console.log(getVoicetype());
			console.log(getAutoplay_time());
			console.log(getAutoplay_repeat());
			
		},
    methods: {
			openDev () {
			  getCurrentWebContents().toggleDevTools()
			},
      onSubmit() {
				const loading = this.$loading({
														  lock: true,
														  text: '提交中， 请稍等...',
														  spinner: 'el-icon-loading',
														  background: 'rgba(0, 0, 0, 0.7)'
														});
														
        // console.log(this.form);
				setVoicetype(this.form.voicetype)
				setAutoplay_time(this.form.autoplay_time)
				setAutoplay_repeat(this.form.autoplay_repeat)
				
				setting(this.$store.state.user.userid,  this.form.voicetype, this.form.autoplay_time, this.form.autoplay_repeat).then(response => {
					loading.close();
					console.log(response)
					_g.toastMsg('success', '保存成功！',this)
				})	
				// loading.close();
				
				
      }
    }
  }
</script>