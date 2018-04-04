<template>
  <div class="pagecontent">
    <cell title="日程时间">{{mm.PlanTime}}</cell>
    <cell title="地点" primary="content">{{mm.City}}</cell>
    <cell title="客户" primary="content">{{mm.CustomerName}}</cell>
    <div style="height: 35px"></div>
    <cell title="日程类型">{{mm.ProductName}} {{mm.MeetingName}}</cell>
    <cell title="销售额(万元)">{{mm.Money}}</cell>
    <cell title="新客家庭户数">{{mm.NewNum}}</cell>
    <cell title="新客购买数">{{mm.NewBuyNum}}</cell>
    <cell title="老客家庭户数">{{mm.OldNum}}</cell>
    <cell title="老客购买数">{{mm.OldBuyNum}}</cell>
    <group title="会后总结"><x-textarea  @on-focus="onfocus" :readonly="true" :value="mm.EndMemo"></x-textarea></group>
    <group title="会前情况"><x-textarea  @on-focus="onfocus" :readonly="true" :value="mm.ReadyMemo"></x-textarea></group>
    <group title="计划说明"><x-textarea  @on-focus="onfocus" :readonly="true" :value="mm.Memo"></x-textarea></group>
    <ccomment></ccomment>
  </div>
</template>
<script>
  import u from '../js/utility'
  export default{
    data () {
      return {
        mm: {}
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '日程详情')
      })
    },
    activated: function () {
      let that = this
//      document.onkeydown = function (event) {
//        var e = event || window.event || arguments.callee.caller.arguments[0]
//        window.alert(e.keyCode)
//      }
      if (u.routereload()) {
        let pk = u.routepk(that)
        u.querymodel(that, 'e2b97753-d6ac-4bbd-acc2-a6b9015ec5c5', this.$route.query.pk, 'mm')
        u.getmodel(that, 'Comment', pk).then(function (r) {
          if (r.ok) {
            that.cc = r.data
          } else {
            u.alert(that, r.message)
          }
        })
      }
    },
    methods: {
      onfocus () {
        let textareas = document.querySelectorAll('textarea')
        for (let i in textareas) {
          if (typeof (textareas[i]) !== 'function' && typeof (textareas[i]) !== 'number') {
            if (textareas[i].readOnly === true) {
              textareas[i].blur()
            }
          }
        }
      }
    }
  }
</script>
