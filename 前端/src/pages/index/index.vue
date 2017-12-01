<template>
  <div class="stock-table">
    <el-form ref="form" class="stock-datepicker" label-width="116px">
      <el-form-item label="选择日期：">
        <el-date-picker v-model="datePicker" type="daterange" range-separator="至"
        start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" />
      </el-form-item>
      <el-form-item label="输入搜索条件：">
        <el-input v-model="code" placeholder="请输入股份代号或股份名称" class="search-input" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" v-loading="loading" stripe border
      :default-sort = "{prop: 'amount', order: 'descending'}">
      <el-table-column sortable prop="code" label="股份代号" />
      <el-table-column prop="name" label="股份名称" />
      <el-table-column sortable prop="amount" label="持股量差值" />
      <el-table-column label="查看该股近期表现" width="150" align="center">
        <template slot-scope="scope">
          <router-link :to="{ path: 'specific', query: { code: scope.row.code } }">
            <el-button type="primary" size="small">查看</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapState} from 'vuex'
import { UPDATEDATE, UPDATECODE } from './../../vuex/type.js'
import api from '../../api'
import moment from 'moment'

export default {
  computed: mapState({ 
		dateSection: store => store.Stock.dateSection,
		codeOrName: store => store.Stock.codeOrName
	}),
  data () {
    return {
      loading: false,
      data: [],
      datePicker: [],
      code: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() || time.getTime() < 1511222400000
        }
      }
    }
  },
  methods: {
    ...mapActions([UPDATEDATE, UPDATECODE]),
    getData () {
      this.loading = true
      const startTime = moment(this.dateSection[0]).valueOf() + 28800000
      const endTime = moment(this.dateSection[1]).valueOf() + 28800000

      api.getMethod('getData', { startTime, endTime, codeOrName: this.codeOrName }).then(res => {
        this.data = res
        this.loading = false
      })
    },
    reset () {
      this.code = ''
      this.UPDATECODE('')
      this.getData()
    }
  },
  watch: {
    datePicker () {
      this.UPDATEDATE(this.datePicker)
      this.getData()
    },
    code () {
      this.UPDATECODE(this.code)
    }
  },
  created () {
    this.datePicker = this.dateSection
    this.code = this.codeOrName
    this.getData()
  }
}
</script>

