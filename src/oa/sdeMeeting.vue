<template>
  <div class="pagecontent">
    <sticky><x-header>会议安排</x-header></sticky>
    <datetime title="月份" format="YYYY-MM" v-model="queryvalue" @on-change="btnquery" confirm-text="确认" cancel-text="取消"></datetime>
    <img src="../assets/img/add2.png" class="defimg" @click="btnadd">
    <!--<ccust2 v-model="customervalue" @change="btnquery"></ccust2>-->
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
            <div slot="content" class="cardcontent">
              <div class="cardname">
                <img src="../assets/img/meetingcard.png">
                <div class="nameandtel" style="width: inherit">
                  <div :class="sdecolor(r)" v-if="r.CustomerName!==undefined">{{r.EmployeeName}}</div>
                  <div v-if="r.PlanTime!==''">{{r.PlanTime}}</div>
                  <div v-if="r.Mobile!==''||r.Tel!==''" class="card_style">{{r.ProductName}}{{r.MeetingName}}</div>
                </div>
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
        querypk: 'd38ff1f7-4edd-461b-b8fb-a6ad0102fffd',
        selectvalue: ' ,',
        queryvalue: u.getdate().substr(0, 7),
        customervalue: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '')
      })
    },
    activated () {
      if (u.routereload()) {
        this.btnquery()
      }
    },
    methods: {
      btnquery: function () {
        this.querylist = []
        u.addwhere(this, 'querylist', '', '', 'Schedule.pk_Customer', '=', this.$route.query.pk, '')
        u.addwhere(this, 'querylist', 'and', '', 'left(Schedule.PlanTime,7)', '=', this.queryvalue, '', '')
        u.vuxquerypage(this, false)
      },
      btnadd: function () {
        u.routergo(this, 'ScheduleAdd', {pk_custmoer: this.$route.query.pk, ctype: 'sdeMeeting'})
      },
      sdecolor: function (r) {
        return u.sdecolor(r)
      },
      loadMore () {
        let that = this
        u.vuxquerypage(that, true)
      }
    }
  }
</script>
