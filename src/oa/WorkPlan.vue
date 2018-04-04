<template>
  <div class="pagecontent">
    <img src="../assets/img/add2.png" class="defimg" @click="btnadd">
    <cell title="按员工查询" class="special_wecell rightselect">
      <cselect :columns="2" pk="mCustomerWhereEmployee" v-model="selectvalue" @change="btnquery"></cselect>
    </cell>
    <datetime title="按月查询" placeholder="按月份查询" format="YYYY-MM" v-model="queryvalue" confirm-text="确认" cancel-text="取消"></datetime>
    <scroller lock-x scrollbar-y
              :use-pullup="true"
              :use-pulldown="true"
              :pulldown-config="status.pulldownconfig"
              :pullup-config="status.pullupconfig"
              @on-pullup-loading="loadMore"
              @on-pulldown-loading="btnquery"
              v-model="status"
              ref="scroller"
              height="-130">
      <div class="cardcontent">
        <card v-for="r in tabledata.rows" @click.native="btnview(r)">
          <div slot="content" class="cardcontent">
            <div class="cardname">
              <img src="../assets/img/empolyee.png">
              <div class="nameandtel">
                <div :class="sdecolor(r)">{{r.EmployeeName}}</div>
                <div :class="sdecolor(r)">{{r.PlanMonth}}</div>
                <div class="card_style">{{r.DetailPlan}}</div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </scroller>
  </div>
</template>
<script>
  import u from '../js/utility'
  export default {
    data () {
      return {
        status: u.defscroller(),
        pagenum: 1,
        tabledata: [],
        querylist: [],
        querypk: '23a11b18-c35b-4c71-8712-a6d500f62acb',
        selectvalue: ' ,',
        queryvalue: u.getdate().substr(0, 7)
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '工作计划')
      })
    },
    activated: function () {
      if (u.routereload()) {
        this.btnquery()
      }
    },
    watch: {
      queryvalue (val) {
        this.btnquery()
      }
    },
    methods: {
      btnquery () {
        let vals = this.selectvalue.split(',')
        this.querylist = []
        if (vals[1].lastIndexOf('|') > 0) {
          u.addwhere(this, 'querylist', 'and', '', 'Employee.pk_Dept', 'SonDept', vals[0], '')
          u.addwhere(this, 'querylist', 'and', '', 'SalePlan.PlanMonth', '', this.queryvalue, '')
        } else {
          u.addwhere(this, 'querylist', 'and', '', 'Employee.pk_Employee', '=', vals[1], '')
          u.addwhere(this, 'querylist', 'and', '', 'SalePlan.PlanMonth', '>', u.dateadd(new Date(this.queryvalue + '-01'), -360), '')
        }
        u.vuxquerypage(this, false)
      },
      btnadd: function () {
        u.routergo(this, 'WorkPlanAdd')
      },
      btnview: function (i) {
        if (new Date() < new Date(new Date(i.PlanMonth).getFullYear(), new Date(i.PlanMonth).getMonth(), 3)) {
          u.routergo(this, 'WorkPlanAdd', {pk: i.pk})
        } else if (new Date() > new Date(new Date(i.PlanMonth).getFullYear(), new Date(i.PlanMonth).getMonth(), 3) && i.State === 0) {
          u.routergo(this, 'WorkPlanViewAdd', {pk: i.pk})
        } else if (new Date() > new Date(new Date(i.PlanMonth).getFullYear(), new Date(i.PlanMonth).getMonth(), 3) && i.State === 1) {
          u.routergo(this, 'WorkPlanView', {pk: i.pk})
        }
      },
      sdecolor: function (i) {
        if (i.EmployeeName === u.getuser().UserName && new Date() < new Date(new Date(i.PlanMonth).getFullYear(), new Date(i.PlanMonth).getMonth(), 3)) {
          return 'spangreen'
        } else if (i.EmployeeName === u.getuser().UserName && new Date() > new Date(new Date(i.PlanMonth).getFullYear(), new Date(i.PlanMonth).getMonth(), 3) && i.State === 0) {
          return 'spanyellow'
        } else if (i.EmployeeName === u.getuser().UserName && new Date() > new Date(new Date(i.PlanMonth).getFullYear(), new Date(i.PlanMonth).getMonth(), 3) && i.State === 1) {
          return 'spanwhite'
        }
      },
      loadMore () {
        u.vuxquerypage(this, true)
      }
    }
  }
</script>
<style>
  .rightselect .vux-cell-box{margin-right: -15px}
</style>
