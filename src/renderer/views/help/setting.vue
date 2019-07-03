<template>
  <div class="app-container">
		
<el-form ref="form" :model="form" label-width="150px">
  

  <el-form-item label="播放声音">
    <el-radio-group v-model="form.voicetype">
      <el-radio :label="1">男声</el-radio>
      <el-radio :label="2">女声</el-radio>
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
  export default {
    data() {
      return {
        form: {
          voicetype: 1,
          autoplay_time: 5
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>