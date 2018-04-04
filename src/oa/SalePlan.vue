<template>
  <div class="pagecontent">
    <img src="../assets/img/add2.png" class="defimg" @click="btnadd">
    <datetime title="按月查询" placeholder="按月份查询" format="YYYY-MM" v-model="queryvalue" confirm-text="确认" cancel-text="取消"></datetime>
    <cell title="按员工查询" class="special_wecell rightselect">
      <cselect :columns="2" pk="mCustomerWhereEmployee" v-model="selectvalue" @change="btnquery"></cselect>
    </cell>
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
        <card v-for="r in tabledata.rows">
          <div slot="content">
            <div class="cardname">
              <p @click="btnview(r.pk)">{{r.CustomerName}}</p>
            </div>
            <div>{{i.PlanMonth}}计划:{{i.Total}}万</div>
            <div>实际:{{i.Payment}}万</div>
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
        querypk: '994b06fe-a03d-438d-8124-a6d500f60680',
        selectvalue: ' ,',
        queryvalue: u.getdate().substr(0, 7)
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '回款计划')
      })
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
        u.addwhere(this, 'querylist', 'and', '', 'CreateUser', '=', vals[1], '', '', 'Y')
        u.addwhere(this, 'querylist', 'and', '', 'Month', '=', this.queryvalue, '', '', 'Y')
        u.vuxquerypage(this, false)
      },
      btnadd: function () {
        u.routergo(this, 'SalePlanAdd')
      },
      btnview: function (pk) {
        u.routergo(this, 'SalePlanView', {pk: pk})
      },
      loadMore () {
        let that = this
        u.vuxquerypage(that, true)
      }
    }
  }
</script>
