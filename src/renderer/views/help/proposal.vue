<template>
  <div class="app-container">
		
	 
   <el-form r  :model="form"  :rules="rules" ref="ruleForm" label-width="120px">
   <!--    <el-form-item label="标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
       
				 
				 -->
			 
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="form.content" :rows="10"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="submitForm('ruleForm')" >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
	
	import { feedback  } from '@/api/help'
	import _g from '@/utils/global.js'	
	
export default {
  data() {
    return {
      form: {
        content: ''
      },
			 rules: {
          content: [
            { required: true, message: '请输入', trigger: 'blur' },
            { min: 10, max: 100, message: '长度在 10 到 100 个字', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
   submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
							
							 const loading = this.$loading({
										  lock: true,
										  text: '提交中， 请稍等...',
										  spinner: 'el-icon-loading',
										  background: 'rgba(0, 0, 0, 0.7)'
										});
							
							// console.log(this.form.content)
							
								feedback(this.$store.state.user.userid,this.form.content).then(response => {
										// console.log(response)
										
										loading.close();
										
										if(response.code==20000){
											this.form.content = ''
											_g.toastMsg('success', '提交成功，感谢您的意见！',this)
												
										}
								})
							
          } else {
            // alert('提交失败!!');
						console.log('提交失败!!');
            return false;
          }
        });
      },
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

