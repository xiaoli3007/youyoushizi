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
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
  <!--   <el-table-column label="pinyin" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.pinyin}}</span>
        </template>
      </el-table-column> -->
     <!--  <el-table-column label="zixing" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.zixing}}
        </template>
      </el-table-column> -->
			
				<el-table-column label="操作" width="410" align="center">
			  <template slot-scope="scope">
				  
				  <el-col :span="8"><el-button type="primary" v-on:click="read(0,1)">手动听写</el-button></el-col>
				  <el-col :span="8"><el-button type="success" v-on:click="read(1,1)">自动听写</el-button> </el-col>
				  <el-col :span="8"><el-button type="warning" v-on:click="read(0,2)">识字</el-button> </el-col>
			  	
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
import { getList } from '@/api/table'
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
		 read(a,b) {
			this.$router.replace({ name: 'Read' , query:{  rautoplay: a ,type: b}})
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
	      pagesize: this.pagesize
	  }
      getList(params).then(response => {
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
