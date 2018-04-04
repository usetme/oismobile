<template>
  <div class="pagecontent">
    <img src="../assets/img/btn_search.png" class="defimg" @click="popshow=true">
    <group title="计划说明"><x-textarea placeholder="请填写工作计划详细情况" v-model="mm.DetailPlan"></x-textarea></group>
      <group title="回款计划(万)">
        <x-number :fillable="true" title="硒萃金额" v-model="mm.Money1" :min="0"></x-number>
        <x-number :fillable="true" title="负电位金额" v-model="mm.Money3" :min="0"></x-number>
        <x-number :fillable="true" title="水机金额" v-model="mm.Money2" :min="0"></x-number>
        <x-number :fillable="true" title="养生仪金额" v-model="mm.Money4" :min="0"></x-number>
        <x-number :fillable="true" title="其它金额" v-model="mm.Money0" :min="0"></x-number>
        <x-number title="计划总额" v-model="total" :min="0" class="sinput put_special" :fillable="false" :step="0"></x-number>
      </group>
      <div v-show="divdatashow">
        <group title="执行情况"><x-textarea placeholder="请填写工作计划执行情况" v-model="mm.Detail"></x-textarea></group>
        <group title="亮点"><x-textarea placeholder="请说明本次工作计划的亮点" v-model="mm.Merit"></x-textarea></group>
        <group title="不足"><x-textarea placeholder="工作计划存在的不足" v-model="mm.Lack"></x-textarea></group>
      </div>
    <x-button type="primary" @click.native="btnsave" class="mybtn2">确认</x-button>
    <div v-transfer-dom>
      <popup v-model="popshow">
        <div class="popupbottom">
          <datetime title="月份选择" format="YYYY-MM" v-model="PlanMonth" confirm-text="确认" cancel-text="取消"></datetime>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import u from '../js/utility'
  import {TransferDom} from 'vux'
  export default{
    directives: {
      TransferDom
    },
    data () {
      return {
        PlanMonth: u.getdate().substr(0, 7),
        divdatashow: undefined,
        mm: {},
        popshow: false
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '工作计划管理', false, '新增工作计划')
      })
    },
    activated: function () {
      if (u.routereload()) {
        let that = this
        if (u.routereload()) {
          u.getmodel(that, 'SalePlan', this.$route.query.pk).then(function (r) {
            if (r.ok) {
              that.mm = r.data
              if (u.isnullorwhitespace(that.$route.query.pk)) {
                that.mm.PlanMonth = u.getdate().substr(0, 7)
              }
            } else {
              u.alert(that, r.message)
            }
          })
        }
      }
    },
    watch: {
      PlanMonth: function () {
        this.changetime()
      }
    },
    computed: {
      total: {
        get: function () {
          let that = this
          return (that.mm.Money0 + that.mm.Money1 + that.mm.Money2 + that.mm.Money3 + that.mm.Money4)
        },
        set: function (newValue) {
        }
      }
    },
    methods: {
      changetime: function () {
        this.divdatashow = this.PlanMonth + '-03' < u.gettime()
      },
      btnsave: function () {
        let that = this
        that.mm.PlanType = 1
        that.mm.Total = that.total
        that.mm.PlanMonth = that.PlanMonth
        u.getdata(that, 'SalePlan', 'AddUpdate', that.mm).then(function (r) {
          if (r.ok) {
            u.routerback(that, true, '保存成功', 200)
          } else {
            u.alert(that, r.message)
          }
        })
      },
      btnback: function () {
        u.routerback()
      }
    }
  }
</script>
