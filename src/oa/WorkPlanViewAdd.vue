<template>
  <div class="pagecontent">
    <cell title="计划月份">{{mm.PlanMonth}}</cell>
    <group title="计划说明">
      <ctextarea :max="0" v-model="mm.DetailPlan"></ctextarea>
    </group>
    <group title="计划金额(万)">
      <cell title="硒萃金额">{{mm.Money1}}</cell>
      <cell title="负电位金额">{{mm.Money3}}</cell>
      <cell title="水机金额">{{mm.Money2}}</cell>
      <cell title="养生仪金额">{{mm.Money4}}</cell>
      <cell title="其它金额">{{mm.Money0}}</cell>
      <cell title="计划总金额">{{mm.Total}}</cell>
      <cell class="spcell"></cell>
    </group>
    <group title="执行情况" class="viewadd"><x-textarea placeholder="请填写工作计划执行情况" v-model="mm.Detail"></x-textarea></group>
    <group title="亮点" class="viewadd"><x-textarea placeholder="请说明本次工作计划的亮点" v-model="mm.Merit"></x-textarea></group>
    <group title="不足" class="viewadd"><x-textarea placeholder="工作计划存在的不足" v-model="mm.Lack"></x-textarea></group>
    <div class="btngroup">
      <x-button type="primary" @click.native="btnback">返回</x-button>
      <x-button type="primary" @click.native="btnsave">确认</x-button>
    </div>
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
        u.routeinit(vm, '工作计划管理', false, '新增工作计划')
      })
    },
    activated: function () {
      let that = this
      that.mm.PlanType = 1
      if (u.routereload()) {
        let pk = u.routepk(that, 'pk')
        u.getmodel(that, 'SalePlan', pk).then(function (r) {
          if (r.ok) {
            that.mm = r.data
            if (pk === '') {
              that.mm.PlanMonth = u.getdate().substr(0, 7)
            } else {
            }
          } else {
            u.alert(that, r.message)
          }
        })
      }
    },
    computed: {
      total: function () {
        let that = this
        return (that.mm.Money0 + that.mm.Money1 + that.mm.Money2 + that.mm.Money3 + that.mm.Money4)
      }
    },
    methods: {
      btnback: function () {
        u.routerback()
      },
      btnsave: function () {
        let that = this
        that.mm.PlanType = 1
        that.mm.Total = that.total
        u.getdata(that, 'SalePlan', 'AddUpdate', that.mm).then(function (r) {
          if (r.ok) {
            u.routerback(that, true, '保存成功', 200)
          } else {
            u.alert(that, r.message)
          }
        })
      }
      // that.mlist = Lq.from(that.mlistall).where(`x => x.value1 =='${val}'`).toArray()
    }
  }
</script>
