<template>
  <div>
    <h3>Goods Params</h3>
    <!-- breadcrumb nav -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Goods Params List</el-breadcrumb-item>
      <el-breadcrumb-item>Goods Params</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card section -->
    <el-card>
      <el-alert
        title="Caution: Only 3rd class category can be added params."
        type="warning"
        :closable="false"
        show-icon>
      </el-alert>
      <!-- choose good cates -->
      <el-row class="cates_option">
        <span>Choose good category: </span>
        <el-cascader
          clearable
          :options="cateList"
          :props="cateProps"
          v-model="selectedCateKeys"
          @change="cascaderChange"
          change-on-select
          expand-trigger="hover"></el-cascader>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="Dynamic Params" name="many">
          <el-button type="primary" icon="el-icon-plus" :disabled="isBtnDisabled">Dynamic Params</el-button>
        </el-tab-pane>
        <el-tab-pane label="Configuration" name="only">
          <el-button type="primary" icon="el-icon-plus" :disabled="isBtnDisabled">Configs</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Params',
  data() {
    return {
      cateList: [],
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedCateKeys: [],
      activeName: 'many'
    }
  },
  created () {
    this.getCateList()
  },
  mounted () {
    setInterval(function() {
      document.querySelectorAll('.el-cascader-node__label').forEach(el => {
        el.onclick = function() {
          if (this.previousElementSibling) this.previousElementSibling.click()
        }
      })
    }, 1000)
  },
  methods: {
    async getCateList () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) return this.$message.error('Failed to get category list.')
      this.cateList = res.data
      console.log(this.cateList)
    },
    async cascaderChange () {
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        this.$message.error('please select a 3rd clss.')
        return false
      }
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
        params: {
          sel: this.activeName
        }
      })
      if (res.meta.status !== 200) return this.$message.error('Failed to load params data.')
      console.log(res)
    },
    handleTabClick(tab, event) {
      console.log(tab, event)
      console.log(this.activeName)
    }
  },
  computed: {
    isBtnDisabled () {
      if (this.selectedCateKeys.length !== 3) {
        return true
      } else {
        return false
      }
    },
    cateId () {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cates_option{
  margin: 15px;
}
</style>
