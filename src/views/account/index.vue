<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="searchForm" :model="searchForm" label-width="120px">
        <el-row>
          <el-col :xs="24" :sm="8" class="dateType">
            <el-form-item label="账号名称">
              <el-input v-model="searchForm.title" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="{span:8, offset:8}" class="right">
            <el-button type="primary" icon="el-icon-search" @click="search">
              查询
            </el-button>
            <el-button icon="el-icon-refresh" @click="reset">
              重置
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-container">
      <el-button type="primary" size="small" icon="el-icon-plus" class="table-add-btn" @click="operate('add')">
        新建
      </el-button>
      <el-table
        :data="tableData"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          type="index"
          width="50"
        />
        <el-table-column
          show-overflow-tooltip
          property="title"
          label="账号名称"
          width="250"
        />
        <el-table-column
          show-overflow-tooltip
          property="updateTime"
          label="最后一次修改"
          width="250"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="operate('look', scope.row)"
            >
              查看
            </el-button>
            <el-button
              size="mini"
              @click="operate('edit', scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              @click="operate('delete', scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :pagination="pagination" @search="search" />
    </div>
  </div>
</template>
<script>
import API from '@/api'
import Pagination from '@/components/Pagination'
export default {
  name: 'Account',
  components: {
    Pagination
  },
  data() {
    return {
      searchForm: {},
      options: [],
      tableData: [],
      pagination: {},
    }
  },
  activated() {
    this.search(true)
  },
  created() {
    this.search(true)
  },
  methods: {
    async search(e) {
      e && (this.pagination.currentPage = 1)
      const res = await API.getAccountList({...this.searchForm})
      this.tableData = res.data.list
      this.pagination = res.data.pagination
    },
    operate(oprType, row) {
      switch (oprType) {
        case 'add':
          break
        case 'look':
          break
        case 'edit':
          break
        case 'delete':
          this.delete(row)
          break
        default:
          break
      }
    },
    reset() {
      this.searchForm = {}
    },
    delete(row) {
      const id = row.id
      this.$confirm(`确定删除该记录?`, '提示', {
        type: 'warning'
      }).then(async() => {
        await API.deleteAccount({id})
        this.search()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch(() => {})
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
