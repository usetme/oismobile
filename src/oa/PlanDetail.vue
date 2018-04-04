<template>
  <div class="pagecontent">
    <datetime title="月份选择" format="YYYY-MM" v-model="month" confirm-text="确认" cancel-text="取消"></datetime>
    <button-tab :height="50">
        <button-tab-item selected @click.native="datashow=1">经销商完成情况</button-tab-item>
        <button-tab-item @click.native="datashow=2">大区完成情况</button-tab-item>
        <button-tab-item @click.native="datashow=3">员工完成情况</button-tab-item>
      </button-tab>
      <ctable :data="datalist1" v-show="datashow==1"></ctable>
      <ctable :data="datalist2" v-show="datashow==2"></ctable>
      <ctable :data="datalist3" v-show="datashow==3"></ctable>
      <h4 v-show="datalist1.length===0||datalist2.length===0||datalist3.length===0">没有查到相关数据！</h4>
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
        datalist3: {},
        datashow: 1
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '计划完成情况')
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
        u.querywhere(that, '538a9b8a-3cb9-44d1-a74c-a6e900a3663d', [{
          'Parm': 'Y',
          'Field': 'Month',
          'Value': that.month
        }], 'datalist1')
        u.querywhere(that, '4830a07c-9ccc-4e64-8c9e-a6e900bdd780', [{
          'Parm': 'Y',
          'Field': 'Month',
          'Value': that.month
        }], 'datalist2')
        u.querywhere(that, '882156ad-ed71-4543-b1ce-a6e900be216e', [{
          'Parm': 'Y',
          'Field': 'Month',
          'Value': that.month
        }], 'datalist3')
      }
    }
  }
</script>
<style>
  #app .pagecontent .weui-cell, .weui-cell{padding:10px 15px;}
</style>
