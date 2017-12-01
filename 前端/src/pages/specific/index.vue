<template>
  <div class="stock-table">
    <div class="stock-datepicker">
      <router-link :to="{ path: '/' }">
        <el-button type="primary" size="small">返回</el-button>
      </router-link>
    </div> 
    <el-table :data="data" v-loading="loading" stripe border>
      <el-table-column sortable prop="code" label="股份代号" />
      <el-table-column prop="name" label="股份名称" />
      <el-table-column sortable prop="amount" label="中央结算系统的持股量" width="200" />
      <el-table-column sortable prop="proportion" label="占上交所上市及交易A股总数的百分比" width="300">
        <template slot-scope="scope">
          <span>{{`${scope.row.proportion/100}%`}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dateT" label="日期">
        <template slot-scope="scope">
          <span>{{`${scope.row.date.getFullYear()}-${scope.row.date.getMonth()+1}-${scope.row.date.getDate()}`}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from '../../api'

export default {
  data () {
    return {
      code: 0,
      loading: false,
      data: []
    }
  },
  methods: {
    getData () {
      const { code } = this.$route.query
      this.code = code
      this.loading = true
      api.getMethod('getSpecific', { code }).then(res => {
        this.data = res.map(item => {
          item.amount = parseInt(item.amount)
          item.proportion = parseInt((item.proportion.slice(0, -1) * 100).toFixed(0))
          item.date = new Date(parseInt(item.dateT))
          return item
        })
        this.loading = false
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

