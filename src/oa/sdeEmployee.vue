<template>
  <div class="pagecontent">
    <datetime title="月份查询" format="YYYY-MM" v-model="queryvalue" confirm-text="确认" cancel-text="取消"></datetime>
    <cell title="按员工查询" class="specail_cell">
      <cselect :columns="2" pk="mCustomerWhereEmployee" v-model="selectvalue" @change="btnquery"></cselect>
    </cell>
    <!--<img src="../assets/img/btn_search.png" class="defimg" @click="popshow=true">-->
    <h3 v-if="querylist.length === 0">没有查到相关数据！</h3>
    <scroller lock-x scrollbar-y
              :use-pullup="true"
              :use-pulldown="true"
              :pulldown-config="status.pulldownconfig"
              :pullup-config="status.pullupconfig"
              @on-pullup-loading="loadMore"
              @on-pulldown-loading="btnquery"
              v-model="status"
              ref="scroller"
              height="-155"
              v-else>
      <div class="cardcontent">
        <card v-for="r in tabledata.rows" @click.native="sdeopen(r)">
          <div slot="content" class="cardcontent">
            <div class="cardname">
              <img src="../assets/img/empolyee.png">
              <div class="nameandtel">
                <div class="spanwhite">{{r.EmployeeName}}</div>
                <div v-if="r.PlanTime!==''" class="card_style">{{r.PlanTime}}</div>
                <div v-if="r.ProductName!==''" class="card_style">{{r.ProductName}}</div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </scroller>
    <div v-transfer-dom>
      <popup v-model="popshow">
        <div class="popupbottom">
          <cselect title="按员工查询" :columns="2" pk="mCustomerWhereEmployee" v-model="selectvalue" @change="btnquery"></cselect>
          <datetime title="月份查询" format="YYYY-MM" v-model="queryvalue" confirm-text="确认" cancel-text="取消"></datetime>
        </div>
      </popup>
    </div>
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
        status: u.defscroller(),
        pagenum: 1,
        tabledata: [],
        querylist: [],
        querypk: 'd38ff1f7-4edd-461b-b8fb-a6ad0102fffd',
        selectvalue: ' ,',
        queryvalue: u.getdate().substr(0, 7),
        popshow: false
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '个人日程')
      })
    },
    watch: {
      queryvalue: function () {
        this.btnquery()
      }
    },
    methods: {
      btnquery: function () {
        let vals = this.selectvalue.split(',')
        this.querylist = []
        u.addwhere(this, 'querylist', 'and', '', 'Employee.pk_Employee', '=', vals[1], '', '')
        u.addwhere(this, 'querylist', 'and', '', 'left(Schedule.PlanTime,7)', '=', this.queryvalue, '', '')
        u.vuxquerypage(this, false)
      },
      sdecolor: function (r) {
        return u.sdecolor(r)
      },
      sdeopen: function (r) {
        let that = this
        if (r.CreateUser === u.getuser().pk_User && r.State === 0) {
          u.routergo(that, 'ScheduleAdd', {pk: r.pk})
        } else {
          u.routergo(that, 'ScheduleView', {pk: r.pk})
        }
      },
      loadMore () {
        let that = this
        u.vuxquerypage(that, true)
      }
    }
  }
</script>
<style>
 .specail_cell .vux-cell-box{margin-right: -16px}
</style>
