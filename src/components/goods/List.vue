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
          <el-input
          placeholder="please input good's name">
            <el-button slot="append" icon="el-icon-search"></el-button>
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
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteParams(slotProp.row.attr_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
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
      total: ''
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('failed to fetch goods list.')
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    openEditParamDiaolog(id) {},
    deleteParams(id) {}
  }
}
</script>

<style lang="scss" scoped>
</style>
