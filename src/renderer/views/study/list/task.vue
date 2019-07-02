<template>
  <div class="app-container">
	  
	  <el-form :inline="true"  class="demo-form-inline">
	<!-- 	     <el-form-item>
		   <el-select v-model="value" placeholder="分类">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   </el-form-item> -->
  
	    <el-form-item>
	  	<el-input v-model="keywords" placeholder="关键词"></el-input>
	    </el-form-item>
	    <el-form-item>
	  	<el-button type="primary" @click="search()">查询</el-button>
	    </el-form-item>
	  </el-form>
	  
	  
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <!-- <el-table-column align="center" label='ID' >
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column> -->
      <el-table-column label="任务标题">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
			
    <el-table-column label="创建时间"  align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createtime_text}}</span>
        </template>
      </el-table-column>
			
      <el-table-column label="任务类别"  align="center">
        <template slot-scope="scope">
          
					
					<el-tag :type="scope.row.type_text | statusFilter" effect="plain">{{scope.row.type_text}}</el-tag>
        </template>
      </el-table-column> 
			
			<el-table-column label="任务状态"  align="center">
			  <template slot-scope="scope">
					
						<el-tag :type="scope.row.status_text | taskstatusFilter" effect="dark">{{scope.row.status_text}}</el-tag>
						
			  </template>
			</el-table-column> 
			
				<el-table-column label="操作"  align="center">
			  <template slot-scope="scope">
				  
				  <el-col :span="12"><el-button  size="small" type="primary" v-on:click="read(scope.row.id)" plain> 开始任务</el-button></el-col>
				 
				  <el-col :span="12">
						
					 
						 <el-button type="danger"  v-on:click="handleDelete(scope.row.id)" icon="el-icon-delete" circle></el-button>
						
						</el-col>
				 				 
								 
			  	
			  </template>
			</el-table-column>

    </el-table>
	
	
	<div class="block pages">
					<el-pagination
					@current-change="handleCurrentChange"
					background
					layout="prev, pager, next"
					:page-size="pagesize"
					:current-page="currentPage"
					:total="dataCount">
					</el-pagination>
				</div>
				
				
  </div>
</template>

<script>
import { tasklist } from '@/api/table'
import { task_delete  } from '@/api/task'

import _g from '@/utils/global.js'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
	  loading:false,
	  dataCount: null,
	  currentPage: null,
	  keywords: '',
	  multipleSelection: [],
	  pagesize: 12,
	  options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
		value: ''
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '听写': 'success',
        '识字': 'warning',
      }
      return statusMap[status]
    }
		,taskstatusFilter(status) {
      const statusMap = {
        '未开始': 'info',
        '进行中': '',
        '纠错': 'danger',
        '全部完成': 'success',
      }
      return statusMap[status]
    }
		
  },
  created() {
    this.init()
  },
  methods: {
		
		handleDelete( taskid) {
			this.$confirm('确认删除该任务?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				
				 this.listLoading = true
				task_delete(taskid).then(response => {
					// console.log(response)
					
					if(response.code=='20000'){
						
					
						 
						  _g.shallowRefresh(this.$route.name)
						 
						 
						 
						 
							
						 setTimeout(() => {
						 	_g.toastMsg('success', '删除成功',this)
							this.listLoading = false
						}, 1500)
						
						
					}else{
						_g.toastMsg('error', '删除错误',this)
					}
				})
			  // console.log(row.id);
			}).catch(() => {
			  // catch error
			})
			
			
		},
		 read(a) {
			this.$router.replace({ name: 'Read' , query:{  taskid: a }})
		},
	  search() {
	    this.$router.push({ path: this.$route.path, query: { keywords: this.keywords, page: 1 }})
	  },
	   handleCurrentChange(page) {
	    this.$router.push({ path: this.$route.path, query: { keywords: this.keywords, page: page }})
	  },
    fetchData() {
			_g.openGlobalLoading()
      this.listLoading = true
	  const params = {
			  booktype: 910,
	      keywords: this.keywords,
	      page: this.currentPage,
	      pagesize: this.pagesize,
				userid:this.$store.state.user.userid
	  }
      tasklist(params).then(response => {
					_g.closeGlobalLoading()
					this.list = response.items
				  this.dataCount = parseInt(response.dataCount)
          this.listLoading = false
      })
	  this.listLoading = false
    },
	 getCurrentPage() {
	  let data = this.$route.query
	  if (data) {
	    if (data.page) {
	      this.currentPage = parseInt(data.page)
	    } else {
	      this.currentPage = 1
	    }
	  }
	},
	getKeywords() {
	  let data = this.$route.query
	  if (data) {
	    if (data.keywords) {
	      this.keywords = data.keywords
	    } else {
	      this.keywords = ''
	    }
	  }
	},
	init() {
	  this.getKeywords()
	  this.getCurrentPage()
	  this.fetchData()
	},
	
  },
  watch: {
    '$route' (to, from) {
      this.init()
    }
  }
}
</script>
