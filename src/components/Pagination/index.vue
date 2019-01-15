<template>
  <div class="paginator-warp">
    <el-pagination
      :current-page="pagination.currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
const defaultPagination = {
  currentPage: 1,
  pageSize: 20,
  total: 0
}
export default {
  props: {
    pagination: {
      type: Object,
      default() {
        return defaultPagination
      }
    }
  },
  mounted() {
    this.pagination.pageSize = this.pagination.pageSize || defaultPagination.pageSize
    this.pagination.currentPage = this.pagination.currentPage || defaultPagination.currentPage
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.$emit('search')
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.$emit('search')
    }
  },
}
</script>
<style lang="scss" scoped>
  .paginator-warp{
    float: right;
    margin-top: 20px;
    margin-right: 10px;
  }
</style>

