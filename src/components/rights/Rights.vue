<template>
  <div>
    <h3>Access Management</h3>
    <!-- breadcrumb nav -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Access Management</el-breadcrumb-item>
      <el-breadcrumb-item>Rights</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card section -->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="Access Item" prop="authName"></el-table-column>
        <el-table-column label="Path" prop="path"></el-table-column>
        <!-- multiple checks need to add column-key -->
        <el-table-column label="Access Level"
        prop="level"
        sortable
        column-key="level"
        :filters="[{ text: 'Level-1', value: '0' }, { text: 'Level-2', value: '1' }, { text: 'Level-3', value: '2' }]"
        :filter-method="filterTag"
        >
          <template v-slot="scope">
            <el-tag v-if="scope.row.level === '0'">Level-1</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">Level-2</el-tag>
            <el-tag type="warning" v-else-if="scope.row.level === '2'">Level-3</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Rights',
  data() {
    return {
      rightsList: []
    }
  },
  created () {
    this.getRightsList()
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('Failed to load access list')
      } else {
        // console.log(res)
        this.rightsList = res.data
      }
    },
    filterTag (value, row, column) {
      // console.log(row.level)
      const property = column.property
      return row[property] === value
    }
  }
}
</script>

<style lang="less" scoped>

</style>
