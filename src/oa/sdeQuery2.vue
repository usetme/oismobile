<template>
  <div class="pagecontent">
    <datetime title="月份选择" format="YYYY-MM" v-model="month" confirm-text="确认" cancel-text="取消"></datetime>
    <button-tab :height="50">
      <button-tab-item selected @click.native="datashow=1">与会数据</button-tab-item>
      <button-tab-item @click.native="datashow=2">成交比例</button-tab-item>
    </button-tab>
    <ctable :data="datalist1" v-show="datashow==1"></ctable>
    <ctable :data="datalist2" v-show="datashow==2"></ctable>
    <h4 v-show="datalist1.length===0||datalist2.length===0">没有查到相关数据！</h4>
  </div>
</template>
<script>
  import u from '../js/utility'
  export default {
    data () {
      return {
        popshow: false,
        month: u.getdate().substr(0, 7),
        datalist1: {},
        datalist2: {},
        datashow: 1
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '会议效率')
      })
    },
    activated: function () {
      this.btnquery()
    },
    watch: {
      month: function () {
        this.btnquery()
      }
    },
    methods: {
      btnquery: function () {
        let that = this
        u.querywhere(that, '844e3773-87bf-480d-ad22-a6c6009dab80', [{
          'Field': 'left(Schedule.PlanTime,7)',
          'Value': that.month
        }], 'datalist1')
        u.querywhere(that, 'a0859570-eb8c-432d-a9e3-a6c6009de908', [{
          'Field': 'left(Schedule.PlanTime,7)',
          'Value': that.month
        }], 'datalist2')
      }
    }
  }
</script>
