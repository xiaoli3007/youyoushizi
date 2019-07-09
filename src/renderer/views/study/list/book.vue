<template>
  <div class="app-container">
	  
 <el-form :inline="true"  class="demo-form-inline">
	    <el-form-item>
	  	<el-input v-model="keywords" placeholder="关键词"></el-input>
	    </el-form-item>
	    <el-form-item>
	  	<el-button type="primary" @click="search()">查询</el-button>
	    </el-form-item>
	  </el-form>
	  
	   
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
    <!-- <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column> -->
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="字"   align="center">
        <template slot-scope="scope">
          <span>{{scope.row.s}}</span>
        </template>
      </el-table-column>
     <!-- <el-table-column label="zixing" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.zixing}}
        </template>
      </el-table-column> -->
			
				<el-table-column label="操作"   align="center">
			  <template slot-scope="scope">
				  
				  <!-- <el-col :span="12"><el-button type="success" size="medium" v-on:click="read(1,scope.row.id,'ebook',0)">听写</el-button></el-col> -->
				  <!-- <el-col :span="8"><el-button type="success" size="medium" v-on:click="read(1,1,scope.row.id,'lesson',0)">自动听写</el-button> </el-col> -->
		 <el-col :span="24">
			 
			 <el-button type="warning" size="medium" v-if="scope.row.shizi_taskid===0" v-on:click="read(2,scope.row.id,'ebook',0)">识字</el-button> 
			 <el-button type="warning" size="medium" v-if="scope.row.shizi_taskid!=0" v-on:click="readtask(scope.row.shizi_taskid)">识字</el-button> 
			 
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
import { getList} from '@/api/table'
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
    this.init()
		
  },
  methods: {
		 readtask(a) {
			 // console.log(a);
			this.$router.replace({ name: 'Read' , query:{  taskid: a }})
		},
		 read(b,c,d,e) {
			this.$router.replace({ name: 'Read' , query:{ type: b,relation_id: c, relation_type: d, taskid: e}})
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
					
					keywords: this.keywords,
					page: this.currentPage,
					pagesize: this.pagesize,
					userid: this.$store.state.user.userid,
			}
      getList(params).then(response => {
		     _g.closeGlobalLoading()
        this.list = response.items
		    this.dataCount = parseInt(response.dataCount)
        this.listLoading = false
					
					var temp = this.list
					_(temp).forEach(function(value,key) {
						// console.log(value.word1);
							 var s = []
							_(value.wcell_list).forEach(function(value2,key2) {
								s.push(value2.word)
							});
							  s=_.join(s, ',')
							// console.log(typeof temp);
							// console.log(temp[key].name);
							// this.list['sss']=s  
							_.set(temp, key+'.s', s);
					});
					this.list = temp
					console.log(this.list);
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
