<template>
  <div class="pagecontent">
    <inline-calendar
      v-model="selectdate"
      :render-on-value-change="false" :show-last-month="false" @on-change="onSelect" :show-next-month="false" :render-function="buildSlotFn"
      :weeks-list="['日', '一', '二', '三', '四', '五', '六']">
    </inline-calendar>
    <div class="defdaily">
      <p v-show="datelist.indexOf(selectdate) === -1">{{selectdate}}无计划日程...</p>
      <img src="../assets/img/add.png" @click="btnadd">
    </div>
    <div class="cardcontent" v-show="datelist.indexOf(selectdate) !== -1">
      <swipeout class="vux-1px-tb">
        <swipeout-item transition-mode="follow"  v-for="(r,index) in datalist.rows"  :key="index">
          <div slot="right-menu">
            <swipeout-button type="warn" @click.native="btndelete(r)">删除</swipeout-button>
          </div>
          <div slot="content">
            <card @click.native="btnview(r)">
              <div slot="content" class="cardcontent">
                <div class="cardname">
                  <img src="../assets/img/record.png">
                  <div class="nameandtel">
                    <div :class="sdecolor(r)" v-if="r.CustomerName!==undefined">{{r.CustomerName}}</div>
                    <div v-if="r.Mobile!==''||r.Tel!==''" class="card_style">{{r.ProductName}}{{r.MeetingName}}</div>
                  </div>
                </div>
              </div>
            </card>
          </div>
        </swipeout-item>
      </swipeout>
    </div>
  </div>
</template>
<script>
  import u from '../js/utility'
  export default{
    data () {
      return {
        ifdelete: true,
        mm: {},
        datelist: [],
        selectdate: '',
        useCustomFn: true,
        buildSlotFn: () => '',
        datalist: []
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '', true)
      })
    },
    activated () {
      if (u.routereload()) {
        this.bindCalendar()
        this.onSelect()
      }
    },
    created: function () {
      this.selectdate = u.getdate()
      this.bindCalendar()
      this.onSelect()
    },
    methods: {
      bindCalendar () {
        let that = this
        this.buildSlotFn = (line, index, data) => {
          for (let i = 0; i < that.datelist.length; i++) {
            if (!data.disabled && data.year + '-' + (data.month_str - 10 < 0 ? '0' + data.month_str : data.month_str) + '-' + (data.day - 10 < 0 ? '0' + data.day : data.day) === that.datelist[i]) {
              return '<div style="display:inline-block;width:5px;height:5px;background-color:#58B7FF;border-radius:50%;"></div>'
            }
          }
        }
        u.querywhere(that, '06d8686d-4298-45cc-94b9-a69e010d2a16', null).then(function (r) {
          if (r.ok) {
            that.datelist = Array.from(r.data.rows).map(s => s.plandate)
          } else {
            u.message(that, r.message)
          }
        })
      },
      btnadd: function () {
        if (u.getdate() <= this.selectdate) {
          u.routergo(this, 'ScheduleAdd', {plandate: this.selectdate})
        } else {
          u.message(this, '只能添加<br>' + u.getdate() + '后的日期', 'warn')
        }
      },
      btnview: function (r) {
        if (r.CreateUser === u.getuser().pk_User && u.settime(-1) < r.PlanTime.substr(0, 10)) {
          u.routergo(this, 'ScheduleAdd', {pk: r.pk})
        } else {
          u.routergo(this, 'ScheduleView', {pk: r.pk})
        }
      },
      btndelete (r) {
        let that = this
        that.$vux.confirm.show({
          title: '注意',
          content: '确认删除吗?',
          onConfirm () {
            u.getdata(that, 'Schedule', 'Delete', {pk: r.pk}).then(function (r) {
              if (r.ok) {
                u.message(that, '删除成功！')
                setTimeout(function () {
                  that.onSelect()
                  that.bindCalendar()
                }, 500)
              } else {
                u.alert(that, r.message)
              }
            })
          }
        })
      },
      onSelect (val) {
        let that = this
        u.querywhere(that, '06d8686d-4298-45cc-94b9-a69e010d2a17', [{
          'Field': 'PlanDate',
          'Parm': 'Y',
          'Value': that.selectdate
        }], 'datalist')
      },
      sdecolor: function (r) {
        return u.sdecolor(r)
      }
    }
  }
</script>
<style>
 #app .calendar-header {
   height: 50px;
   line-height: 50px;
   border-bottom: 1px dashed #58B7FF;
 }
 .inline-calendar a {
   color: #58B7FF;
   font-size: 24px;
 }

 #app .calendar-year > span, #app .calendar-month > span {
   top: 3px
 }

 #app .vux-prev-icon, #app .vux-next-icon {
   border-color: #58B7FF;
   border-width: 1px;
 }

 #app .inline-calendar th {
   font-size: 16px;
   color: #808080;
   font-weight: lighter;
   height: 40px;
 }

 #app .inline-calendar td {
   width: 40px;
   height: 40px;
   border: 1px dashed #eee
 }

 .inline-calendar tbody .is-disabled {
   border: none;
   height: 0;
   /*background-color: #eee*/
 }


 #app .inline-calendar td.is-today {
   color: #58B7FF
 }

 .inline-calendar td {
   color: #aaaaaa
 }

 #app .inline-calendar td.current > span {
   background-color: #58B7FF
 }
</style>
