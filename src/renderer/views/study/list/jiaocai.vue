<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="教材">
        <template slot-scope="scope">
         人教版三年级下册
        </template>
      </el-table-column>
      <el-table-column label="课时" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
			
			 <el-table-column label="字" width="110" align="center">
			  <template slot-scope="scope">
			    <span>{{scope.row.s}}</span>
			  </template>
			</el-table-column>
			
			<el-table-column label="操作" width="410" align="center">
			  <template slot-scope="scope">
				  
				  <el-col :span="8"><el-button type="primary" v-on:click="read(0,1)">手动听写</el-button></el-col>
				  <el-col :span="8"><el-button type="success" v-on:click="read(1,1)">自动听写</el-button> </el-col>
				  <el-col :span="8"><el-button type="warning" v-on:click="read(0,2)">识字</el-button> </el-col>
  
				 
				
			  </template>
			</el-table-column>
			
     
    </el-table>
  </div>
</template>

<script>

import supermemo2 from '@/lib/supermemo2'

import { getjiaocaiList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
	  let quality =4  // 表示审核质量的介于0和5之间的数字。0是最差的，5是最好的。.
	  let lastSchedule= 5 // 上次审阅空间的持续时间
	  let lastFactor =1 // 用于计算上一个计划的因素。
	  let ret = supermemo2(quality, lastSchedule, lastFactor)
	  // {
	  //     schedule: Number, // 下一个评论空间。
	  //     factor: Number, // 在下一轮计算中应该使用的因素。
	  //     isRepeatAgain: Boolean // 如果是真的，应重新检查项目，直到质量不低于4。
	  // }
	  console.log(ret)
	  
    this.fetchData()
  },
  methods: {
	  read(a,b) {
	  	this.$router.replace({ name: 'Read' , query:{  rautoplay: a ,type: b}})
	  },
    fetchData() {
      this.listLoading = true
      getjiaocaiList(this.listQuery).then(response => {
        this.list = response.data.chapter
				var temp = this.list
				_(temp).forEach(function(value,key) {
					// console.log(value.word1);
						 var s = []
						_(value.word1).forEach(function(value2,key2) {
							s.push(value2.sw)
						});
						  s=_.join(s, '~')
						// console.log(typeof temp);
						// console.log(temp[key].name);
						// this.list['sss']=s  
						_.set(temp, key+'.s', s);
						
				});
				this.list = temp
				// console.log(temp);
				
        this.listLoading = false
      })
    }
  }
}
</script>
