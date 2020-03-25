<template>
  <div>
    <h3>Goods List</h3>
    <!-- breadcrumb nav -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Goods List</el-breadcrumb-item>
      <el-breadcrumb-item>Goods</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card section -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="please input good's name" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">New good</el-button>
        </el-col>
      </el-row>
      <!-- table -->
      <el-table :data="goodsList" border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="Goods Name" prop="goods_name"></el-table-column>
        <el-table-column label="Goods Price(RMB)" prop="goods_price" width="120px"></el-table-column>
        <el-table-column label="Goods weight" prop="goods_weight" width="120px"></el-table-column>
        <el-table-column label="Created Time" prop="add_time" width="180px">
          <template v-slot="slotValue">{{slotValue.row.add_time | timeFormat}}</template>
        </el-table-column>
        <el-table-column label="Operatoin" width="120px">
          <template v-slot="slotProp">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="openEditParamDiaolog(slotProp.row.attr_id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteParams(slotProp.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- pagination -->
      <el-pagination
        @size-change="handlePsizeChange"
        @current-change="handleCurPChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      total: 0
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('failed to fetch goods list.')
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    openEditParamDiaolog(id) {},
    async deleteParams(id) {
      const confirmRes = await this.$confirm('You\' gonna delete this good, r u sure?', 'Confirmation', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).catch(err => err)
      if (confirmRes !== 'confirm') {
        return this.$message.info('cancel deletion')
      } else {
        const { data: res } = await this.$http.delete(`goods/${id}`)
        if (res.meta.status !== 200) return this.$message.error('deletion failed.')
        this.$message.warning('good deleted.')
        this.getGoodsList()
      }
    },
    handlePsizeChange(newPsize) {
      this.queryInfo.pagesize = newPsize
      this.getGoodsList()
    },
    handleCurPChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
