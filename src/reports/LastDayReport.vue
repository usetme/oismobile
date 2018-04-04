<template>
  <div class="report">
    <sticky>
      <x-header class="long_header" :left-options="{showBack: false}">经销商当月回款明细(截止{{$route.params.time.replace(/-/g,'.')+ '回款'}})
      </x-header>
    </sticky>
    <button-tab :height="50">
      <button-tab-item selected @click.native="datashow=1">图表汇总</button-tab-item>
      <button-tab-item @click.native="datashow=2">报表明细</button-tab-item>
    </button-tab>
    <div v-show="datashow===1" id="main1" style="width: 100%;height:300px"></div>
    <div v-show="datashow===1" id="main2" style="width: 100%;height:800px"></div>
    <div v-show="datashow===2" class="report_title">尊敬的各位领导:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;截止<span>{{$route.params.time}}</span>,经销商当月回款总额为<span> {{totallist1.总回款}} </span>万元，当日新增回款额为
      <span>{{totallist1.当日回款}} </span>万元，当日回款第一名的是<span v-for="(i,index) in numone"> {{i.省份}} </span>,回款额为<span
        v-for="(i,index) in numone" v-show="index === 0"> {{i.当日回款}} </span>万元，请查收，谢谢！
    </div>
    <x-table v-show="datashow===2" full-bordered style="background-color:#fff;">
      <thead>
      <tr style="color:red">
        <th>大区</th>
        <th>省份</th>
        <th>市级地区</th>
        <th>负责人</th>
        <th>期间回款</th>
        <th>小计</th>
      </tr>
      </thead>
      <tbody id="tb">
      <tr v-for="(i,index) in tabledata1">
        <td :rowspan="tabledata1.length" v-show="index === 0">{{i.大区}}</td>
        <td :rowspan="i.groups" v-show="indexarr.indexOf(index)>=0">{{i.省份}}</td>
        <td>{{i.市级地区===null?'':i.市级地区.substr(0, 4)}}</td>
        <td>{{i.经销商}}</td>
        <td>{{i.期间回款}}</td>
        <td :rowspan="i.groups" v-show="indexarr.indexOf(index)>=0" class="totalstyle1">{{i.省份汇总}}</td>
      </tr>
      <tr class="totalstyle">
        <td colspan="5">合计</td>
        <td>{{totallist.当日回款}}</td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>
<script>
  import u from '../js/utility'
  import $ from 'jquery'
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
        ifload: true,
        flag: 0,
        dest: [],
        userdata: JSON.parse(localStorage.getItem('user')),
        areasarr: [],
        datashow: 1,
        indexarr: [0],
        totallist: [],
        totallist1: [],
        tabledata1: [],
        numone: [],
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
        u.querywhere(that, 'bfeb974b-c098-4f59-82e2-a846010fd857', null).then(function (r) {
          console.log(r.data)
        })
        u.querywhere(that, '0fa49c3f-a8b0-4d4f-aa3b-a85000e5af68', that.querylist).then(function (r) {
          for (let i in r.data.rows) {
            if (r.data.rows[i].大区 === that.userdata.DeptName && r.data.rows[i].当日回款 !== 0) {
              that.tabledata1.push(r.data.rows[i])
            }
          }
          for (let i in that.tabledata1) {
            if (that.flag <= that.tabledata1.length) {
              that.flag++
              if (!u.isnullorwhitespace(that.tabledata1[that.flag])) {
                if (that.tabledata1[i].省份 !== that.tabledata1[that.flag].省份) {
                  that.indexarr.push(that.flag)
                }
              }
            }
          }
        })
        u.querywhere(that, '68fc4200-2527-4c20-b0d3-a8490110b20f', that.querylist).then(function (r) {
          for (let i in r.data.rows) {
            if (r.data.rows[i].大区 === that.userdata.DeptName) {
              that.totallist = r.data.rows[i]
            }
          }
          u.querywhere(that, '2cf90718-14ab-4008-8929-a84d010dbfa6', that.querylist).then(function (r) {
            that.totallist1 = r.data.rows[0]
          })
          u.querywhere(that, '349c7943-6987-48f4-9aa1-a848015f6b8f', that.querylist).then(function (r) {
            for (let i in r.data.rows) {
              if (r.data.rows[i].rank === 1) {
                that.numone.push(r.data.rows[i])
              }
            }
          })
          that.methodscontrol('initpie')
          that.methodscontrol('initchat')
        })
      },
      methodscontrol (fnc, data) {
        let that = this
        if (that.ifload === true) {
          if (fnc === 'initpie') {
            that.initpie()
          } else if (fnc === 'initchat') {
            that.initchat()
          }
        } else {
          return false
        }
      },
      JsonSort (json, key) {
        let that = this
        for (let j = 1, jl = json.length; j < jl; j++) {
          var temp = json[j]
          var val = temp[key]
          var i = j - 1
          while (i >= 0 && json[i][key] > val) {
            json[i + 1] = json[i]
            i = i - 1
          }
          json[i + 1] = temp
        }
        return json
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
        let map = {}
        for (let i = 0; i < that.tabledata1.length; i++) {
          let ai = that.tabledata1[i]
          if (!map[ai.省份]) {
            that.dest.push({
              id: ai.省份,
              name: ai.name,
              data: [ai]
            })
            map[ai.省份] = ai
          } else {
            for (let j = 0; j < that.dest.length; j++) {
              let dj = that.dest[j]
              if (dj.省份 === ai.省份) {
                dj.data.push(ai)
                break
              }
            }
          }
        }
        for (let i in that.dest) {
          option.series[0].data.push({value: that.dest[i].data[0].省份汇总, name: that.dest[i].id})
        }
        myChart.setOption(option)
      },
      initchat () {
        let that = this
        let myChart = echarts.init(document.getElementById('main2'))
        let option = {
          title: {
            text: '市级地区期间回款排名'
          },
          label: {
            normal: {
              show: true,
              position: 'right'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: []
          },
          series: [
            {
              name: [],
              type: 'bar',
              data: []
            }
          ]
        }
        u.querywhere(that, '0fa49c3f-a8b0-4d4f-aa3b-a85000e5af68', that.querylist).then(function (r) {
          for (let i in r.data.rows) {
            if (r.data.rows[i].大区 === that.userdata.DeptName && r.data.rows[i].当日回款 !== 0) {
              that.areasarr.push(r.data.rows[i])
            }
          }
          let ars = that.JsonSort(that.areasarr, '期间回款')
          for (let i in ars) {
            option.series[0].data.push(ars[i].期间回款)
            option.yAxis.data.push(ars[i].市级地区.substr(0, 8) + '..')
          }
          myChart.setOption(option)
        })
      }
    }
  }
</script>
<style>
  .totalstyle1 {
    font-weight: bold;
    color: red;
  }
</style>
