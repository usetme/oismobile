<template>
  <div class="pagecontent">
      <div id="popdiv"></div>
      <datetime title="日程时间" v-model="mm.PlanTime" :start-date="startdate" format="YYYY-MM-DD HH:mm" @on-change="plantimechange" confirm-text="确认" cancel-text="取消"></datetime>
      <x-address title="地点" v-model="cityaddress" :list="addressData" placeholder="-请选择-" class="address"></x-address>
      <ccust2 v-model="mm.pk_Customer" :title="schetitle"></ccust2>
    <div v-if="schestateus === 'beforeMeeting'||schestateus === 'afterMeeting'">
      <p class="contentline"></p>
      <cell title="会议类型" class="special_wecell">
        <cselect querypk="9fbd70ec-5af6-460c-b3a9-a84900a05e64" :columns=2 v-model="meetingvalue"></cselect>
      </cell>
      <x-input title="销售额(万元)" type="text" @on-blur="moneyblur" v-model="mm.Money"></x-input>
      <x-number title="新客家庭户数" :fillable="true" :min="0" v-model="mm.NewNum"></x-number>
      <x-number title="老客家庭户数" :fillable="true" :min="0" v-model="mm.OldNum"></x-number>
    </div>
    <div v-show="showstate('afterMeeting')">
      <x-number title="新客购买数" :fillable="true" :min="0" v-model="mm.NewBuyNum"></x-number>
      <x-number title="老客购买数" :fillable="true" :min="0" v-model="mm.OldBuyNum"></x-number>
    </div>
    <!--<div v-show="showstate('afterMeeting')&&readstate === 'Ypk'" class="bannumber_write">-->
      <!--<cell title="新客购买数" v-model="mm.NewBuyNum"></cell>-->
      <!--<cell title="老客购买数" v-model="mm.OldBuyNum"></cell>-->
    <!--</div>-->
    <div v-show="showstate('afterMeeting')">
      <p class="contentline"></p>
      <x-textarea title="会后总结" placeholder="本次会议进行总结..."  @on-focus="onfocus" v-model="mm.EndMemo":height="140" :max="200"></x-textarea>
    </div>
    <div v-show="showstate('beforeMeeting')">
      <p class="contentline"></p>
      <x-textarea title="会前情况" :placeholder="ifreadonly(mm.ReadyMemo)?'未提前做计划或准备，状态不可编辑!':'会前情况说明...'" @on-focus="onfocus" v-model="mm.ReadyMemo" :class="ifreadonly(mm.ReadyMemo)?'unwritearea':''" :readonly="ifreadonly(mm.ReadyMemo)" :height="140" :max="200"></x-textarea>
    </div>
    <div v-show="showstate('planMeeting')">
      <p class="contentline"></p>
      <x-textarea  title="计划说明" :placeholder="ifreadonly(mm.Memo)?'未提前做计划或准备，状态不可编辑!':'日程介绍或具体会议情况'" @on-focus="onfocus" v-model="mm.Memo" :class="ifreadonly(mm.Memo)?'unwritearea':''" :readonly="ifreadonly(mm.Memo)" :height="140" :max="200"></x-textarea>
     </div>
    <x-button type="primary" @click.native="btnsave" class="mybtn2">确认</x-button>
  </div>
</template>

<script>
  import u from '../js/utility'
  import $ from 'jquery'
  import cityjson from '../assets/city.json'
  import {ChinaAddressData, Value2nameFilter as value2name} from 'vux'
  export default{
    data () {
      return {
        readstate: '',
        startdate: u.getdate(),
        addressData: cityjson,
        cityaddress: [],
        schestateus: '',
        schetitle: '',
        mm: {},
        meetingvalue: ''
      }
    },
    activated: function () {
      let that = this
      let pk = u.routepk(that, 'pk')
      setTimeout(function () {
        that.chooseall()
      })
      that.mm = {}
      if (!u.isnullorwhitespace(pk)) {
        that.readstate = 'Ypk'
        u.getmodel(that, 'Schedule', pk).then(function (r) {
          if (r.ok) {
            that.mm = r.data
            setTimeout(function () {
              that.meetingvalue = that.mm.Product + ',' + that.mm.Meeting
            })
            that.cityaddress = r.data.City.split(' ')
          } else {
            u.alert(that, r.message)
          }
        })
      } else {
        if (that.$route.query.ctype === 'sdeMeeting') {
          that.mm.pk_Customer = that.$route.query.pk_custmoer
          that.mm.PlanTime = u.gettime().substr(0, 16)
        } else {
          that.mm.PlanTime = that.$route.query.plandate + u.gettime().substr(10, 6)
        }
        that.readstate = 'Npk'
        that.meetingvalue = ''
        that.cityaddress = ['choose1', 'choose2', 'choose3']
        u.routeinit(that, that.schetitle, false)
      }
    },
    mounted: function () {
      let div = document.querySelectorAll('.vux-popup-dialog, .vux-popup')[0]
      document.getElementById('popdiv').appendChild(div)
    },
    methods: {
      moneyblur (val) {
        let that = this
        that.mm.Money = ''
        for (let i in val) {
          if (val[i] === '.' || !isNaN(parseInt(val[i]))) {
            that.mm.Money += val[i]
          }
        }
      },
      chooseall () {
        let numbers = document.getElementsByClassName('vux-number-input')
        for (let i in numbers) {
          if (typeof (numbers[i]) === 'object') {
            numbers[i].addEventListener('focus', function () {
              numbers[i].type = 'text'
              numbers[i].selectionStart = 0
              numbers[i].selectionEnd = numbers[i].value.length
              setTimeout(function () {
                numbers[i].type = 'number'
              })
            })
          }
        }
      },
      onfocus () {
        let textareas = document.querySelectorAll('textarea')
        for (let i in textareas) {
          if (typeof (textareas[i]) !== 'function' && typeof (textareas[i]) !== 'number') {
            if (textareas[i].readOnly === true) {
              textareas[i].blur()
            }
          }
        }
      },
      showstate (title) {
        let that = this
        if (that.readstate === 'Ypk') {
          if (that.schestateus === 'planMeeting') {
            if (title === 'planMeeting') {
              return true
            }
          } else if (that.schestateus === 'beforeMeeting') {
            if (title === 'beforeMeeting' || title === 'planMeeting') {
              return true
            }
          } else {
            return true
          }
        } else {
          if (that.schestateus === title) {
            return true
          }
        }
      },
      ifreadonly (content) {
        let that = this
        if (!u.isnullorwhitespace(content)) {
          if (content.toString().length === 1) {
            document.onkeydown = function (e) {
              if (e.keyCode === 8) {
                e.preventDefault()
              }
            }
          } else {
            document.onkeydown = function (e) {
              if (e.keyCode === 8) {
                e.returnValue = true
              }
            }
          }
        }
        if (that.readstate === 'Ypk') {
          if (content === '') {
            if (that.schestateus === 'beforeMeeting' && that.mm.ReadyMemo === '') {
              return false
            } else if (that.schestateus === 'planMeeting' && that.mm.Memo === '') {
              return false
            } else {
              return true
            }
          }
        } else {
          document.onkeydown = function (e) {
            if (e.keyCode === 8) {
              e.returnValue = true
            }
          }
          return false
        }
      },
      getName () {
        return value2name(this.cityaddress, ChinaAddressData)
      },
      plantimechange: function (val) {
        let that = this
        if (u.settime(2) >= val.substr(0, 10)) {
          if (u.gettime() > val.substr(0, 10)) {
//        此刻时间(今明后)大于等于当前选择时间&&当前选择时间<大于此刻时间（会后总结）
            that.schetitle = '会后总结'
            that.schestateus = 'afterMeeting'
          } else {
//        此刻时间(今明后)大于等于当前选择时间&&当前选择时间小于等于此刻时间（会前计划）
            that.schetitle = '会前准备'
            that.schestateus = 'beforeMeeting'
          }
        } else {
//        此刻时间(今明后)小于当前选择时间（日程计划）
          that.schetitle = '日程计划'
          that.schestateus = 'planMeeting'
        }
        u.routeinit(that, that.schetitle, false)
      },
      btnsave: function () {
        let that = this
        let inputs = document.querySelectorAll('input')
        if (that.schestateus !== 'planMeeting') {
          let meetingarr = that.meetingvalue.split(',')
          that.mm.Product = meetingarr[0]
          that.mm.Meeting = meetingarr[1]
        }
        that.mm.City = that.getName()
        u.getdata(that, 'Schedule', 'AddUpdate', that.mm).then(function (r) {
          if (r.ok) {
            u.routerback(that, true, '保存成功', 200)
          } else {
            u.alert(that, r.message)
          }
        })
      }
    }
  }
</script>
<style>
  #app .bannumber_write .vux-number-selector{
    display: none;
  }
  #app .unwritearea .weui-textarea-counter,#app .unwritearea textarea{
    background: rgba(0,0,0,0.1);
  }
</style>
