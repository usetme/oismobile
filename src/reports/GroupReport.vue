<template>
  <div class="report">
    <div class="report_title">尊敬的各位领导:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;截止<span>{{$route.params.time}}</span>,经销商当月回款总额为<span> {{totallist.总回款}} </span>万元，当日新增回款额为 <span>{{totallist.当日回款}} </span>万元，当日回款第一名的是<span v-for="(i,index) in numone"> {{i.省份}} </span>,回款额为<span v-for="(i,index) in numone" v-show="index === 0"> {{i.当日回款}} </span>万元，请查收，谢谢！</div>
    <p class="contentline"></p>
    <div id="main1" style="width: 100%;height:500px;"></div>
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
        ifload: true,
        useritem: JSON.parse(localStorage.getItem('user')),
        totallist: [],
        numone: []
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '')
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
        let querylist = [{
          'Logic': '',
          'LeftParenthesis': '',
          'Field': 'mm',
          'Condition': '=',
          'Value': that.$route.params.time.substr(0, 7) + '-01',
          'RightParenthesis': '',
          'Fix': '',
          'Parm': 'Y'
        }, {
          'Logic': '',
          'LeftParenthesis': 'and',
          'Field': 'dd',
          'Condition': '=',
          'Value': that.$route.params.time,
          'RightParenthesis': '',
          'Fix': '',
          'Parm': 'Y'
        }]
        u.querywhere(that, '2cf90718-14ab-4008-8929-a84d010dbfa6', querylist).then(function (r) {
          that.totallist = r.data.rows[0]
          that.methodscontrol('topinit', querylist)
        })
        u.querywhere(that, '349c7943-6987-48f4-9aa1-a848015f6b8f', querylist).then(function (r) {
          for (let i in r.data.rows) {
            if (r.data.rows[i].rank === 1) {
              that.numone.push(r.data.rows[i])
            }
          }
        })
      },
      methodscontrol (fnc, data) {
        let that = this
        if (that.ifload === true) {
          if (fnc === 'topinit') {
            that.topinit(data)
          }
        } else {
          return false
        }
      },
      topinit (querylist) {
        let that = this
        let myChart = echarts.init(document.getElementById('main1'))
        let option = {
          title: {
            text: '经销商当日回款Top20(万)',
            subtext: '总计' + that.totallist.当日回款 + '万'
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
              type: 'bar',
              data: []
            }
          ]
        }
        u.querywhere(that, 'bd9aa748-9c2d-4ed9-a0f1-a84801456e8a', querylist).then(function (r) {
          if (r.ok) {
            let cdata = r.data.rows
            for (let i in cdata) {
              option.yAxis.data.push(cdata[i].公司名称.substr(0, 5) + '..')
              option.series[0].data.push(cdata[i].回款)
            }
            myChart.setOption(option)
          } else {
            u.message(that, r.message)
          }
        })
      }
    }
  }
</script>
