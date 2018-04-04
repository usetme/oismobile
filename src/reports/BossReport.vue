<template>
  <div class="report">
    <div class="report_title"><span class="bold">您好,储总:</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;截止<span>{{$route.params.time}}</span>,德源经销商当月回款总额为<span> {{dytotal.总回款}} </span>万元,当日新增回款额为<span> {{dytotal.当日回款===null?0:dytotal.当日回款}} </span>万元<br>(注:经销商总回款为
      <span> {{totallist.总回款}} </span> 万元,其中德源回款 <span>{{dytotal.总回款}}</span> 万元,天脉回款 <span>{{(totallist.总回款 - dytotal.总回款).toFixed(2)}}</span>
      万元)
    </div>
    <p class="contentline"></p>
    <x-table full-bordered style="background-color:#fff;">
      <thead>
      <tr>
        <th colspan="5" class="bold"><span class="fontimportant">德源</span>经销商<span class="fontimportant">{{this.$route.params.time.substr(5,2)}}</span>月回款汇总表
        </th>
      </tr>
      <tr style="font-size: 13px">
        <th colspan="4">截止{{this.$route.params.time.replace(/-/g,'.')}}</th>
      </tr>
      <tr>
        <th>区域</th>
        <th>省份</th>
        <th>总回款</th>
        <th>当日回款</th>
      </tr>
      </thead>
      <tbody v-for="i in tabledata">
      <tr v-for="(s,index) in i.data">
        <td v-show="index === 0" :rowspan="i.data.length" class="bold">{{s.大区}}<br>小计:<span class="totalstyle">{{s.小计}}</span></td>
        <td>{{s.省份}}</td>
        <td>{{s.总回款}}</td>
        <td>{{s.当日回款}}</td>
      </tr>
      </tbody>
      <tr>
        <td colspan="2">总计</td>
        <td>{{dytotal.总回款}}</td>
        <td>{{dytotal.当日回款}}</td>
        <td></td>
      </tr>
    </x-table>
    <br>
    <h4>如对数据有疑问,请联系信息部(张卫斌13382018176);财务部(袁婷婷15301596655)！</h4>
  </div>
</template>
<script>
  import u from '../js/utility'
  export default {
    data () {
      return {
        dytotal: [],
        tabledata: [],
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
        u.querywhere(that, '491602c8-36d9-4428-b871-a85800b8f080', querylist).then(function (r) {
          var littletotal = r.data.rows
          u.querywhere(that, '8d72961d-1efe-487d-8513-a858009cff22', querylist).then(function (r) {
            let cdata = r.data.rows
            let map = {}
            for (let i = 0; i < cdata.length; i++) {
              for (let s in littletotal) {
                if (littletotal[s].大区 === r.data.rows[i].大区) {
                  r.data.rows[i].小计 = littletotal[s].总回款
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
          })
        })
        u.querywhere(that, '2cf90718-14ab-4008-8929-a84d010dbfa6', querylist).then(function (r) {
          that.totallist = r.data.rows[0]
        })
        u.querywhere(that, '3cc48de8-64a4-4b58-9007-a85800aa1ae9', querylist).then(function (r) {
          that.dytotal = r.data.rows[0]
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
      }
    }
  }
</script>
<style>
  #app .bold {
    font-weight: bold;
    color: #333
  }
</style>
