<template>
  <div class="app-container">
		
		<!-- 	<el-radio v-model="form.radio1" label="1"  border>认识</el-radio>
		<el-radio v-model="form.radio1" label="2"  border>不认识</el-radio> -->
		
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
       
				 
				 
			 
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
				radio1: '',
        name: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    // onCancel() {
    //   this.$message({
    //     message: 'cancel!',
    //     type: 'warning'
    //   })
    // }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

