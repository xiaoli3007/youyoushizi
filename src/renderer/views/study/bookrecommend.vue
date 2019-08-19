<template>
  <div class="app-container">
	  
 <el-form :inline="true"  class="demo-form-inline">
	   <!-- <el-form-item style="margin-bottom: 0;">
	  	<el-input v-model="keywords" placeholder="标题"></el-input>
	    </el-form-item>
		<el-form-item style="margin-bottom: 0;">
		<el-input v-model="search_author" placeholder="作者"></el-input>
		</el-form-item>
		
		<el-form-item style="margin-bottom: 0;">
		<el-input v-model="search_translator" placeholder="译者"></el-input>
		</el-form-item> -->
		
		<el-form-item style="margin-bottom: 0;">
		  <el-select v-model="ssvalue" clearable placeholder="年级">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
	 	</el-form-item>
		
		<el-form-item style="margin-bottom: 0;">
		  <el-select v-model="ssvalue" clearable placeholder="类别">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
		</el-form-item>
		<el-form-item style="margin-bottom: 0;">
		  <el-select v-model="ssvalue" clearable placeholder="篇幅">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
		</el-form-item>
		<el-form-item style="margin-bottom: 0;">
		  <el-select v-model="ssvalue" clearable placeholder="专题">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
		</el-form-item>
		
		
	    <el-form-item style="margin-bottom: 0;">
	  	<el-button type="primary" @click="search()">查询</el-button> 
	    </el-form-item>
	  </el-form>
	  <div class="booklist">
	  <el-row :gutter="20" v-loading.body="listLoading" element-loading-text="Loading" >
	  	<el-col :span="6" v-for="(singe, index) in list" :key="index">
	  		<div class="grid-content bg-purple" >
	   
	  			<el-row style="margin-top: 10px;">
					<el-col :span="9"  justify="center" align="center" style="margin-bottom:0;">
						<el-image style="width: 120px;cursor: pointer; " :src="singe.thumb_zm" fit="fill" @click.native="gotoBookShow(singe.id)"></el-image>
					</el-col>
	  				<el-col :span="14" :offset="1" justify="center" align="left" style="margin-bottom:0;">
	  					<p >
						<el-link type="primary" @click.native="gotoBookShow(singe.id)">{{singe.title}}</el-link>
						 </p>
			<p><el-rate
  v-model="rvalue"
  disabled
    
  text-color="#ff9900"
  score-template="{value}">
</el-rate></p>
			<p>作者:{{singe.author}}</p>
			<p v-if="singe.translator!=''">译者:{{singe.translator}}</p>
			<p class="desc" :title="singe.summary">描述:{{singe.description_list}}</p>
	  				</el-col>
	  			</el-row>
		</div>
	  	</el-col>
	  
	  </el-row>
	   </div> 
  
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
import { getbookrecommendlist} from '@/api/table'
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
	  search_author:'',
	  search_translator:'',
	  rvalue: 5,
	  options: [{
	            value: '选项1',
	            label: '黄金糕'
	          }, {
	            value: '选项2',
	            label: '双皮奶'
	          }, {
	            value: '选项3',
	            label: '蚵仔煎'
	          }, {
	            value: '选项4',
	            label: '龙须面'
	          }, {
	            value: '选项5',
	            label: '北京烤鸭'
	          }],
	          ssvalue: ''
	  
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
	  
	  gotoBookShow(a) {
	  	this.$router.replace({
	  		name: 'BookRecommend_show',
	  		query: { ebookid: a}
	  	})
	  },
		 readtask(a) {
			 // console.log(a);
			this.$router.replace({ name: 'Read' , query:{  taskid: a }})
		},
		 read(b,c,d,e) {
			this.$router.replace({ name: 'Read' , query:{ type: b,relation_id: c, relation_type: d, taskid: e}})
		},
		
		searchauthor(a) {
					
		  this.$router.push({ path: this.$route.path, query: { keywords: this.keywords,search_author: a, page: 1 }})
		},
		searchtranslator(a) {
					
		  this.$router.push({ path: this.$route.path, query: { keywords: this.keywords,search_translator: a, page: 1 }})
		},
	  search() {
			
	    this.$router.push({ path: this.$route.path, query: { keywords: this.keywords,search_author: this.search_author,search_translator: this.search_translator, page: 1 }})
	  },
	   handleCurrentChange(page) {
	    this.$router.push({ path: this.$route.path, query: { keywords: this.keywords,search_author: this.search_author, page: page }})
	  },
    fetchData() {
	    _g.openGlobalLoading()
      this.listLoading = true
			const params = {
					
					search_author: this.search_author,
					search_translator: this.search_translator,
					keywords: this.keywords,
					page: this.currentPage,
					pagesize: this.pagesize,
					userid: this.$store.state.user.userid,
			}
      getbookrecommendlist(params).then(response => {
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
	getsearch_author() {
	  let data = this.$route.query
	  if (data) {
	    if (data.search_author) {
	      this.search_author = data.search_author
	    } else {
	      this.search_author = ''
	    }
	  }
	}, 
	getsearch_translator() {
	  let data = this.$route.query
	  if (data) {
	    if (data.search_translator) {
	      this.search_translator = data.search_translator
	    } else {
	      this.search_translator = ''
	    }
	  }
	}, 
	init() {
	  this.getKeywords()
	  this.getsearch_author()
	  this.getsearch_translator()
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
<style rel="stylesheet/scss" lang="scss">
	.booklist{
	p {
		margin: 10px 0 0 0; font-size: 12px; 
	}
	p.desc {
		   line-height: 1.8;
	}
	.el-row {
		margin: 10px 0 0;
		padding: 0 15px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
		margin-bottom: 10px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #eee; border: 1px solid #ccc;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px; 
		// min-height: 260px; max-height: 290px;  
		 overflow: hidden;
		 height: 230px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	}
</style>
