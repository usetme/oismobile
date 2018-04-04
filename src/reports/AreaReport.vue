<template>
  <div class="report">
    <sticky>
      <x-header :left-options="{showBack: false}">经销商{{$route.params.time.replace(/-/g,'.') + '回款'}}</x-header>
    </sticky>
    <button-tab :height="50">
      <button-tab-item @click.native="datashow=1" selected>当日回款</button-tab-item>
      <button-tab-item @click.native="datashow=2">月度Top50</button-tab-item>
    </button-tab>
    <div v-show="datashow===1">
      <div class="report_title">
        尊敬的各位领导:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;截止<span>{{$route.params.time}}</span>,<span> {{userdata.DeptName}} </span><div  v-show="totallist1.当日回款!==null">当日回款
        <span> {{totallist.当日回款}} </span>万元</div>，经销商当月回款总额为<span> {{totallist1.总回款}} </span>万元，<div  v-show="totallist1.当日回款!==null">当日新增回款额为
        <span>{{totallist1.当日回款}} </span>万元，当日回款第一名的是<span v-for="(i,index) in numone"> {{i.省份}} </span>,回款额为<span
        v-for="(i,index) in numone" v-show="index === 0"> {{i.当日回款}} </span>万元</div><span v-show="totallist1.当日回款===null">当日无新增回款。</span>
      </div>
      <!--<div id="main1" style="width: 100%;height:300px" v-show="totallist1.当日回款!==null"></div>-->
      <x-table full-bordered style="background-color:#fff;" v-show="totallist1.当日回款!==null">
        <thead>
        <tr style="color:red">
          <th>大区</th>
          <th>市级地区</th>
          <th>负责人</th>
          <th>回款金额</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(i,index) in tabledata1">
          <td :rowspan="tabledata1.length" v-show="index === 0">{{i.大区}}</td>
          <td>{{i.市级地区===null?'':i.市级地区.substr(0, 5)}}</td>
          <td>{{i.负责人}}</td>
          <td>{{i.当日回款}}</td>
        </tr>
        <tr class="totalstyle">
          <td colspan="3">合计</td>
          <td>{{totallist.当日回款}}</td>
        </tr>
        <tr>
          <td colspan="4">其他大区小计:</td>
        </tr>
        <tr v-for="s in othertotal">
          <td colspan="3">{{s.大区}}</td>
          <td class="totalstyle">{{s.当日回款}}</td>
        </tr>
        </tbody>
      </x-table>
      <br>
      <h4>如对数据有疑问,请联系信息部(张卫斌13382018176);财务部(袁婷婷15301596655)！</h4>
    </div>
    <x-table v-show="datashow===2" full-bordered style="background-color:#fff;">
      <thead class="fontimportant">
      <tr>
        <th>市级地区</th>
        <th>占比</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in month50">
        <td>{{i.市级地区}}</td>
        <td>{{i.占比}}</td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>
<script>
  import u from '../js/utility'
  var echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/line')
  require('echarts/lib/chart/pie')
  require('echarts/lib/component/grid')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data () {
      return {
        datashow: 1,
        ifload: true,
        month50: [],
        userdata: JSON.parse(localStorage.getItem('user')),
        totallist: [],
        othertotal: [],
        numone: [],
        totallist1: [],
        tabledata1: [],
        querylist: [{
          'Logic': '',
          'LeftParenthesis': '',
          'Field': 'mm',
          'Condition': '=',
          'Value': this.$route.params.time.substr(0, 7) + '-01',
          'RightParenthesis': '',
          'Fix': '',
          'Parm': 'Y'
        }, {
          'Logic': '',
          'LeftParenthesis': 'and',
          'Field': 'dd',
          'Condition': '=',
          'Value': this.$route.params.time,
          'RightParenthesis': '',
          'Fix': '',
          'Parm': 'Y'
        }]
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '', false)
      })
    },
    activated: function () {
      let that = this
      let cuserdata = {
        msgid: that.$route.params.msgid,
        usercode: that.userdata.UserCode,
        parmdate: that.$route.params.time
      }
      u.getdata(that, 'User', 'IsOpenMySelfLink', cuserdata).then(function (r) {
        if (r.ok) {
          that.chartload()
        } else {
          that.ifload = false
          that.$vux.alert.show({
            title: '提示',
            content: '抱歉!不能从转发链接打开!确定后关闭页面！',
            onHide () {
              that.$wechat.closeWindow()
            }
          })
        }
      })
    },
    methods: {
      chartload () {
        let that = this
        u.querywhere(that, 'cddb1e72-a22e-43c4-8e5f-a85000bdae81', that.querylist).then(function (r) {
          for (let i in r.data.rows) {
            if (r.data.rows[i].大区 === that.userdata.DeptName && r.data.rows[i].当日回款 !== 0) {
              that.tabledata1.push(r.data.rows[i])
            }
          }
        })
        u.querywhere(that, '349c7943-6987-48f4-9aa1-a848015f6b8f', that.querylist).then(function (r) {
          for (let i in r.data.rows) {
            if (r.data.rows[i].rank === 1) {
              that.numone.push(r.data.rows[i])
            }
          }
        })
        u.querywhere(that, '2cf90718-14ab-4008-8929-a84d010dbfa6', that.querylist).then(function (r) {
          that.totallist1 = r.data.rows[0]
        })
        u.querywhere(that, '575d2651-0eba-4519-a2cd-a6f600cfceea', that.querylist).then(function (r) {
          if (r.ok) {
            that.month50 = r.data.rows
          } else {
            u.message(that, r.message)
          }
        })
        u.querywhere(that, '68fc4200-2527-4c20-b0d3-a8490110b20f', that.querylist).then(function (r) {
          for (let i in r.data.rows) {
            if (r.data.rows[i].大区 === that.userdata.DeptName) {
              that.totallist = r.data.rows[i]
            } else {
              that.othertotal.push(r.data.rows[i])
            }
          }
          that.methodscontrol('initpie')
        })
      },
      methodscontrol (fnc, data) {
        let that = this
        if (that.ifload === true) {
          if (fnc === 'initpie') {
            // that.initpie()
          }
        } else {
          return false
        }
      },
      initpie () {
        let that = this
        let myChart = echarts.init(document.getElementById('main1'))
        let option = {
          legend: {},
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}<br/>{c}万'
          },
          series: [
            {
              selected: {},
              selectedOffset: 5,
              label: {
                normal: {
                  show: true,
                  formatter: '{b}\n{c}万'
                }
              },
              name: '',
              radius: '55%',
              type: 'pie',
              center: ['50%', '50%'],
              data: [
                {value: '', name: ''}
              ]
            }
          ]
        }
        for (let i in that.tabledata1) {
          option.series[0].data.push({value: that.tabledata1[i].当日回款, name: that.tabledata1[i].负责人})
        }
        myChart.setOption(option)
      }
    }
  }
</script>
<style>
  .totalstyle {
    font-weight: bold;
    color: red;
  }
</style>
