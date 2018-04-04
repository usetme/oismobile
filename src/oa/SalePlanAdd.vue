<template>
  <div class="pagecontent">
    <ccust2 v-model="mm.pk_Customer"></ccust2>
    <img src="../assets/img/btn_search.png" class="defimg" @click="popshow=true">
      <x-number :fillable="true" title="硒萃金额" v-model="mm.Money1" :min="0" class="sinput"></x-number>
      <x-number :fillable="true" title="负电位金额" v-model="mm.Money3" :min="0" class="sinput"></x-number>
      <x-number :fillable="true" title="水机金额" v-model="mm.Money2" :min="0" class="sinput"></x-number>
      <x-number :fillable="true" title="养生仪金额" v-model="mm.Money4" :min="0" class="sinput"></x-number>
      <x-number :fillable="true" title="其它金额" v-model="mm.Money0" :min="0" class="sinput"></x-number>
      <x-number title="计划总额" v-model="total" :min="0" class="sinput put_special" :fillable="false" :step="0"></x-number>
    <group title="回款详情"><x-textarea placeholder="请总结回款详情" v-model="mm.DetailPlan"></x-textarea></group>
    <x-button type="primary" @click.native="btnsave" class="mybtn2">确认</x-button>
    <div v-transfer-dom>
      <popup v-model="popshow">
        <div class="popupbottom">
          <datetime title="月份选择" format="YYYY-MM" v-model="mm.PlanMonth" confirm-text="确认" cancel-text="取消"></datetime>
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
        mm: {},
        popshow: false
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '回款计划管理', false, '新增回款计划')
      })
    },
    activated: function () {
      let that = this
      if (u.routereload()) {
        u.getmodel(that, 'SalePlan', this.$route.query.pk).then(function (r) {
          if (r.ok) {
            that.mm = r.data
            if (u.isnullorwhitespace(that.$route.query.pk)) {
              that.mm.PlanMonth = u.gettime().substr(0, 7)
            }
          } else {
            u.alert(that, r.message)
          }
        })
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
      btnsave: function () {
        let that = this
        that.mm.Total = that.total
        that.mm.PlanType = 0
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
