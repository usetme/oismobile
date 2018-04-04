<template>
  <div class="pagecontent">
    <datetime title="月份选择" format="YYYY-MM" v-model="month" confirm-text="确认" cancel-text="取消"></datetime>
    <!--<img src="../assets/img/btn_search.png" class="defimg" @click="popshow=true">-->
      <button-tab :height="50">
        <button-tab-item selected @click.native="datashow=1">员工日程</button-tab-item>
        <button-tab-item @click.native="datashow=2">产品类型</button-tab-item>
        <button-tab-item @click.native="datashow=3">会议类型</button-tab-item>
      </button-tab>
      <ctable :data="datalist1" v-show="datashow==1"></ctable>
      <ctable :data="datalist2" v-show="datashow==2"></ctable>
      <ctable :data="datalist3" v-show="datashow==3"></ctable>
      <h4 v-show="datalist1.length===0||datalist2.length===0||datalist3.length===0">没有查到相关数据！</h4>
    <!--<div v-transfer-dom>-->
      <!--<popup v-model="popshow">-->
        <!--<div class="popupbottom">-->
          <!--<datetime title="月份选择" format="YYYY-MM" v-model="month" confirm-text="确认" cancel-text="取消"></datetime>-->
        <!--</div>-->
      <!--</popup>-->
     <!--</div>-->
  </div>
</template>
<script>
  import u from '../js/utility'
  import {TransferDom} from 'vux'
  export default {
    directives: {
      TransferDom
    },
    data () {
      return {
        popshow: false,
        visibility: false,
        month: u.getdate().substr(0, 7),
        datalist1: {},
        datalist2: {},
        datalist3: {},
        datashow: 1
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '日程数据')
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
        u.querywhere(that, '879036df-3a05-4539-8b02-a6c500a9524a', [{
          'Field': 'left(Schedule.PlanTime,7)',
          'Value': that.month
        }], 'datalist1')
        u.querywhere(that, '6d4f3a16-5a87-4719-8144-a6c5010ab301', [{
          'Field': 'left(Schedule.PlanTime,7)',
          'Value': that.month
        }], 'datalist2')
        u.querywhere(that, 'a58b7bfa-ba69-4812-b069-a6c5010adfd5', [{
          'Field': 'left(Schedule.PlanTime,7)',
          'Value': that.month
        }], 'datalist3')
      }
    }
  }
</script>
