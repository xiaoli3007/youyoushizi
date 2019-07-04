<template>
  <div class="app-container">
		
<el-form ref="form" :model="form" label-width="150px">
  

  <el-form-item label="播放声音">
    <el-radio-group v-model="form.voicetype">
      <el-radio :label="2">女声</el-radio>
			 <el-radio :label="1">男声</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="听写间隔时间(秒)">
     <el-slider v-model="form.autoplay_time" :min="3" :max="20" show-input></el-slider>
  </el-form-item>
	
  <el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>
    <!-- <el-button>取消</el-button> -->
  </el-form-item>
</el-form>

  </div>
</template>

<script>
	import { setVoicetype, setAutoplay_time ,getVoicetype ,getAutoplay_time} from '@/utils/auth'
		import _g from '@/utils/global.js'	
		
  export default {
    data() {
      return {
        form: {
          voicetype: getVoicetype()?parseInt(getVoicetype()):2,
          autoplay_time: getAutoplay_time()?parseInt(getAutoplay_time()):5
        }
      }
    },
		created() {
		  console.log(getVoicetype());
			console.log(getAutoplay_time());
			
		},
    methods: {
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
				loading.close();
				_g.toastMsg('success', '保存成功！',this)
				
      }
    }
  }
</script>