<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="name">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="lesson_no" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.lesson_no}}</span>
        </template>
      </el-table-column>
      <el-table-column label="cat_id" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.cat_id}}
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

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
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
