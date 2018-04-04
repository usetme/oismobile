<template>
  <div class="report">
    <sticky>
      <x-header :left-options="{showBack: false}">{{$route.params.time}}回款</x-header>
      <x-header :left-options="{showBack: false}" class="totalwindow">当日回款
        <countup :end-val="setmoney!==null?setmoney:0" :duration="2" :decimals="2" class="demo1"></countup>
        万元
        <span class="totalmoney"><span @click="methodscontrol('btnrefresh')">刷新</span></span>
      </x-header>
    </sticky>
    <button-tab :height="50">
      <button-tab-item selected @click.native="datashow=1,todayshow=false">当月回款</button-tab-item>
      <button-tab-item @click.native="methodscontrol('chartinit','当日回款')">当日回款</button-tab-item>
      <button-tab-item @click.native="methodscontrol('chartinit','总回款')">月度Top50</button-tab-item>
    </button-tab>
    <h3 v-show="todayshow&&totallist1.当日回款===null" class="totalstyle">当日无新增回款！</h3>
    <div id="main" style="width: 100%;height:400px" v-show="datashow===2"></div>
    <x-table full-bordered v-show="todayshow&&totallist1.当日回款!==null" style="background-color:#fff;">
      <thead>
      <tr style="color:red">
        <th>大区</th>
        <th>市级地区</th>
        <th>负责人</th>
        <th>回款金额</th>
        <th>总回款</th>
      </tr>
      </thead>
      <tbody v-for="i in tabledata1">
      <tr v-for="(s,index) in i.data">
        <td v-show="index === 0" :rowspan="i.data.length" style="background-color: #f8f8f8">{{s.大区}}</td>
        <td>{{s.市级地区===null?'':s.市级地区.substr(0, 5)}}</td>
        <td>{{s.负责人}}</td>
        <td>{{s.当日回款}}</td>
        <td v-show="index === 0" :rowspan="i.data.length" style="font-weight: bold;color:red">{{s.总回款}}</td>
      </tr>
      </tbody>
    </x-table>
    <div v-show="datashow===1">
      <div class="report_title">尊敬的各位领导:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;截止<span>{{$route.params.time}}</span>,经销商当月回款总额为<span> {{totallist1.总回款}} </span>万元<div v-show="totallist1.当日回款!==null">，当日新增回款额为
        <span>{{totallist1.当日回款}} </span>万元，当日回款第一名的是<span v-for="(i,index) in numone"> {{i.省份}} </span>,回款额为<span
          v-for="(i,index) in numone" v-show="index === 0"> {{i.当日回款}} </span>万元</div><span v-show="totallist1.当日回款===null"> ,当日无新增回款。</span>
      </div>
      <x-table full-bordered style="background-color:#fff;">
        <thead>
        <tr style="color:red">
          <th>大区</th>
          <th>省份</th>
          <th>总回款</th>
          <th>计划额</th>
          <th>完成率</th>
          <th>当日回款</th>
        </tr>
        </thead>
        <tbody v-for="i in tabledata">
        <tr v-for="(s,index) in i.data">
          <td :rowspan="i.data.length" v-show="index===0" style="background-color: #f8f8f8">{{s.大区}}<br>小计:<span class="totalstyle">{{s.小计}}</span></td>
          <td>{{s.省份}}</td>
          <td>{{s.总回款}}</td>
          <td>{{s.计划额}}</td>
          <td>{{s.完成率}}</td>
          <td>{{s.当日回款}}</td>
        </tr>
        </tbody>
        <tr class="totalstyle" v-for="i in totallist.rows" style="background-color: #fff">
          <td colspan="2">总计</td>
          <td>{{i.总回款}}</td>
          <td>{{i.计划额}}</td>
          <td>{{i.完成率}}</td>
          <td>{{i.当日回款}}</td>
          <td></td>
        </tr>
      </x-table>
      <br>
      <h4>如对数据有疑问,请联系信息部(张卫斌13382018176);财务部(袁婷婷15301596655)！</h4>
    </div>
    <x-table v-show="!todayshow&&datashow===2" full-bordered style="background-color:#fff;">
      <thead class="fontimportant">
      <tr>
        <th>市级地区</th>
        <th>回款</th>
        <th>占比</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in month50">
        <td>{{i.市级地区}}</td>
        <td>{{i.回款}}</td>
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
        todayshow: false,
        ifload: true,
        month50: [],
        numone: [],
        setmoney: 0,
        totallist: [],
        totallist1: [],
        useritem: JSON.parse(localStorage.getItem('user')),
        datashow: 1,
        tabledata: [],
        tabledata1: [],
        indexarr: [0],
        flag: 0,
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
      let userdata = {
        msgid: that.$route.params.msgid,
        usercode: that.useritem.UserCode,
        parmdate: that.$route.params.time
      }
      u.getdata(that, 'User', 'IsOpenMySelfLink', userdata).then(function (r) {
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
        u.querywhere(that, '349c7943-6987-48f4-9aa1-a848015f6b8f', that.querylist).then(function (r) {
          for (let i in r.data.rows) {
            if (r.data.rows[i].rank === 1) {
              that.numone.push(r.data.rows[i])
            }
          }
        })
        that.methodscontrol('gettotal')
        u.querywhere(that, '68fc4200-2527-4c20-b0d3-a8490110b20f', that.querylist).then(function (r) {
          var littletotal = r.data.rows
          u.querywhere(that, 'cddb1e72-a22e-43c4-8e5f-a85000bdae81', that.querylist).then(function (r) {
            let map = {}
            for (let i = 0; i < r.data.rows.length; i++) {
              for (let s in littletotal) {
                if (littletotal[s].大区 === r.data.rows[i].大区) {
                  r.data.rows[i].总回款 = littletotal[s].当日回款
                  break
                }
              }
              var ai = r.data.rows[i]
              if (!map[ai.大区]) {
                that.tabledata1.push({
                  大区: ai.大区,
                  data: [ai]
                })
                map[ai.大区] = ai
              } else {
                for (let j = 0; j < that.tabledata1.length; j++) {
                  let dj = that.tabledata1[j]
                  if (dj.大区 === ai.大区) {
                    dj.data.push(ai)
                    break
                  }
                }
              }
            }
          })
          if (r.ok) {
            var littletotal1 = r.data.rows
            u.querywhere(that, '349c7943-6987-48f4-9aa1-a848015f6b8f', that.querylist).then(function (r) {
              if (r.ok) {
                let a = r.data.rows
                let cdata = r.data.rows
                let map = {}
                for (let i = 0; i < cdata.length; i++) {
                  for (let s in littletotal1) {
                    if (littletotal1[s].大区 === r.data.rows[i].大区) {
                      r.data.rows[i].小计 = littletotal1[s].总回款
                      break
                    }
                  }
                  let ai = cdata[i]
                  if (!map[ai.大区]) {
                    that.tabledata.push({
                      大区: ai.大区,
                      data: [ai]
                    })
                    map[ai.大区] = ai
                  } else {
                    for (let j = 0; j < that.tabledata.length; j++) {
                      let dj = that.tabledata[j]
                      if (dj.大区 === ai.大区) {
                        dj.data.push(ai)
                        break
                      }
                    }
                  }
                }
              } else {
                u.message(that, r.message)
              }
            })
          } else {
            u.message(that, r.message)
          }
        })
        u.querywhere(that, '575d2651-0eba-4519-a2cd-a6f600cfceea', that.querylist).then(function (r) {
          if (r.ok) {
            that.month50 = r.data.rows
          } else {
            u.message(that, r.message)
          }
        })
      },
      JsonSort (json, key) {
        for (let j = 1, jl = json.length; j < jl; j++) {
          let temp = json[j]
          let val = temp[key]
          let i = j - 1
          while (i >= 0 && json[i][key] > val) {
            json[i + 1] = json[i]
            i = i - 1
          }
          json[i + 1] = temp
        }
        return json
      },
      methodscontrol (fnc, data) {
        let that = this
        if (that.ifload === true) {
          if (fnc === 'btnrefresh') {
            that.btnrefresh()
          } else if (fnc === 'gettotal') {
            that.gettotal()
          } else if (fnc === 'chartinit') {
            that.chartinit(data)
          }
        } else {
          return false
        }
      },
      btnrefresh () {
        this.setmoney = 0
        this.methodscontrol('gettotal')
      },
      gettotal () {
        let that = this
        u.querywhere(that, '2cf90718-14ab-4008-8929-a84d010dbfa6', that.querylist).then(function (r) {
          that.totallist = r.data
          that.totallist1 = r.data.rows[0]
          that.setmoney = r.data.rows[0].当日回款
        })
      },
      chartinit (title) {
        let that = this
        that.datashow = 2
        setTimeout(function () {
          if (title === '当日回款') {
            that.todayshow = true
            u.querywhere(that, '68fc4200-2527-4c20-b0d3-a8490110b20f', that.querylist).then(function (r) {
              u.initchart(that, 'pie', echarts, r.data, document, 'main', title)
            })
          } else {
            u.querywhere(that, 'e3f75c8e-8fcd-435c-b36f-a85800e15251', that.querylist).then(function (r) {
              let myChart = echarts.init(document.getElementById('main'))
              let coption = {
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
                    name: title,
                    radius: '55%',
                    type: 'pie',
                    center: ['50%', '50%'],
                    data: [
                      {value: '', name: ''}
                    ]
                  }
                ]
              }
              for (let i in r.data.rows) {
                coption.series[0].data.push({
                  value: r.data.rows[i].月度回款,
                  name: r.data.rows[i].名称
                })
              }
              myChart.setOption(coption)
            })
            that.todayshow = false
          }
        })
      },
      total (title) {
        if (title === '小计') {
          return 'totalstyle'
        }
      }
    }
  }
</script>
<style>
  .totalstyle {
    font-weight: bold;
    color: red;
    background-color: #f8f8f8
  }

  .demo1 {
    font-size: 20px;;
    color: red;
  }

  .report .totalmoney {
    font-size: 10px;
    text-align: center;
    display: block;
  }

  .totalmoney span {
    text-decoration: underline;
    color: blue;
    margin-left: 4px;
  }

  .totalwindow {
    z-index: 999;
    display: inline-block;
    background-color: #ffffff;
  }

  #app .totalwindow .vux-header-title {
    height: 18px;
    font-size: 10px !important;
    line-height: 18px;
  }

  .fontimportant {
    font-size: 18px;
    font-weight: bold;
    color: red;
  }
</style>
