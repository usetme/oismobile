/**
 * 上半部分是项目特有，下半部分公用
 *  Created by LiveSW on 2016/10/19.
 */
import $ from 'webpack-zepto'
import map from 'array-map'
import find from 'array-find'

export default {
  routerreload: true,
  routereload: function () {
    let r = this.routerreload
    return r
  },
  routerback: function (that, isreload, message, timeout) {
    if (isreload !== undefined) {
      this.routerreload = isreload
    } else {
      this.routerreload = false
    }
    if (message !== undefined && message !== '') {
      this.message(that, message)
    }
    if (timeout !== undefined) {
      setTimeout(function () {
        window.history.back()
      }, timeout)
    } else {
      window.history.back()
    }
  },
  routergo: function (that, routename, parmjson, isreload) {
    if (isreload !== undefined) {
      this.routerreload = isreload
    } else {
      this.routerreload = true
    }
    if (parmjson !== undefined) {
      /* query是路由跳转刷新参数永存 params反之 */
      that.$router.push({name: routename, query: parmjson})
    } else {
      that.$router.push({name: routename})
    }
  },
  sdecolor: function (i) {
    let self = this
    if (i.State === 0) {
      return 'spangreen'
    } else if (i.State === 1) {
      return 'spanyellow'
    } else {
      if (self.settime(-1) < i.PlanTime.substr(0, 10) && self.isnullorwhitespace(i.EndMemo)) {
        return 'spanred'
      } else {
        return 'spanwhite'
      }
    }
  },
  routepk: function (that, routekey) {
    let routerpk = ''
    if (routekey !== undefined) {
      routerpk = that.$route.query[routekey]
      if (routerpk === undefined) {
        // console.log(routerpk + '路由未定义')
        routerpk = ''
      }
      routerpk = routerpk === (':' + routekey) ? '' : routerpk
    }
    return routerpk
  },
  routeinit: function (that, title, footshow, newtitle) {
    if (footshow === undefined) {
      that.$root.$children[0].footshow = false
    } else {
      that.$root.$children[0].footshow = footshow
    }
    if (title === undefined || title === '') {
      that.$root.$children[0].headershow = false
    } else {
      that.$root.$children[0].headershow = true
      that.$root.$children[0].headertitle = title
    }
  },
  alert: function (that, message) {
    if (that !== undefined) {
      that.$vux.alert.show(message)
    }
  },
  message: function (that, message, type) {
    if (that !== undefined) {
      that.$vux.toast.show({
        text: message,
        type: type
      })
    }
  },
  loading: function (that, message) {
    if (that !== undefined) {
      that.$vux.loading.show({
        message: message
      })
    }
  },
  loadinghide: function (that) {
    if (that !== undefined && that.$root.loading !== undefined) {
      // that.$root.loading = false
      that.$vux.loading.hide()
    }
  },
  cityvalue: function (name, list) {
    let rs = map(name, (one, index) => {
      let parent = ''
      if (index === 2) {
        parent = find(list, item => { return item.name === name[1] }) || {value: '__'}
        return find(list, item => { return item.name === one && item.parent === parent.value })
      } else {
        return find(list, item => {
          return item.name === one
        })
      }
    })
    return map(rs, one => {
      return one ? one.value : '__'
    }).join(' ')
  },
  cityname: function (value, list) {
    let rs = map(value, (one, index) => {
      return find(list, item => {
        return item.value === one
      })
    })
    return map(rs, one => {
      return one.name
    }).join(' ').replace('--', '')
  },
  bindweixin: function (that, pk, list, value) {
    let self = this
    this.getdata(that, 'WeiXin', 'vpObject', {pk: pk}, false).then(function (r) {
      if (r.ok) {
        self.bindobjectcache(that, r, self, pk, list, value)
      } else {
        this.message(that, r.message)
        console.log(r.message)
      }
    })
  },
  defscroller () {
    return {
      pullupStatus: 'default',
      pulldownStatus: 'default',
      pulldownconfig: {
        content: '下拉加载',
        downContent: '下拉加载',
        upContent: '下拉刷新',
        loadingContent: '加载中...'
      },
      pullupconfig: {
        content: '上拉加载',
        downContent: '上拉加载',
        upContent: '',
        loadingContent: '加载中...'
      }
    }
  },
  vuxquerypage: function (that, loadmore) {
    if (that.$refs.scroller === null) {
      this.message(that, 'scroller未null')
      return
    }
    setTimeout(() => {
      if (!loadmore) {
        that.pagenum = 1
        that.tabledata = []
      } else {
        that.pagenum += 1
      }
      this.querypage(that, that.querypk, 10, that.pagenum, that.querylist).then(function (r) {
        if (r.ok) {
          that.$nextTick(() => {
            that.$refs.scroller.donePullup()
            that.$refs.scroller.donePulldown()
            that.$refs.scroller.reset()
          })
          if (!loadmore) {
            that.tabledata = r.data
            if (r.data.rows.length === 0) {
            }
          } else {
            that.tabledata.rows = Array.concat(that.tabledata.rows, r.data.rows)
          }
          that.pullupmessage = ''
          if (r.data.rows.length < 10) {
            if (r.data.rows.length === 0) {
              that.$vux.toast.show({text: '没有更多数据!'})
            } else if (that.pagenum === 1) {
              that.pullupmessage = ''
            } else {
              that.pullupmessage = '没有更多数据'
            }
            // that.$refs.scroller.disablePullup()
            // that.pullupEnabled = false
          } else {
            that.pullupmessage = '上拉加载更多'
            // that.pullupEnabled = true
          }
        } else {
          // self.message(that, message)
          console.log(r.message)
        }
      })
    }, 500)
  },
  querycomments: function (that, soureid, lists) {
    if (lists === undefined) {
      return this.getdata(that, 'Comment', 'GetList', {pk: soureid})
    } else {
      return this.getdata(that, 'Comment', 'GetList', {pk: soureid}).then(function (r) {
        if (r.ok) {
          that[lists] = r.data
        } else {
          this.message(that, r.message)
          console.log(r.message)
        }
      })
    }
  },
  getdata: function (that, operate, operatetype, userdata, loading) {
    if (loading !== false) {
      that.$vux.loading.show({
        text: '正在加载...'
      })
    }
    var ticket = ''
    if (this.isnullorwhitespace(userdata)) {
      userdata = {pk: 'nodata'}
    }
    if (operate !== 'User' && operatetype !== 'Login') {
      var user = window.localStorage.getItem('user')
      if (user === null) {
        console.log('未登陆')
        this.message(that, '未登陆')
      } else {
        ticket = JSON.parse(user).Ticket
      }
    }
    let self = this
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://m.tmjk.cn/livemobile.ashx',
        type: 'post',
        dataType: 'json',
        data: {
          param: JSON.stringify({
            operate: operate,
            operatetype: operatetype,
            userticket: ticket,
            localtime: this.gettime(),
            data: userdata
          })
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          self.message(that, '网络中断或服务不存在')
          console.log('交互operate:' + operate + ',operatetype:' + operatetype + ',userticket:' + ticket + ',data' + JSON.stringify(userdata))
        },
        success: function (data, textStatus) {
          resolve(data)
          if (data.message === '已离线请登录') {
            self.message(that, data.message)
            setTimeout(() => {
              if (that !== undefined) {
                let router = that.$router
                if (router !== undefined) {
                  router.push({name: 'Login', query: {offline: 'n'}})
                }
              }
            }, 500)
          }
        },
        complete: function (XMLHttpRequest, textStatus) {
          if (loading !== false) {
            that.$vux.loading.hide()
          }
        }
      })
    })
    return promise
  },
  /**
   * 上半部分是项目特有，下半部分公用
   */
  newid () {
    let date = new Date()
    var guid = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + date.getMilliseconds().toString()
    let user = this.getuser()
    if (user !== null) {
      guid = guid + user.UserCode
    }
    let lg = guid.length
    if (lg >= 32) {
      guid = guid.substr(0, 32)
    } else {
      for (let i = 1; i <= 32 - lg; i++) {
        guid += Math.floor(Math.random() * 16.0).toString(16)
      }
    }
    return guid.substr(0, 8) + '-' + guid.substr(8, 4) + '-' + guid.substr(12, 4) + '-' + guid.substr(16, 4) + '-' + guid.substr(20)
  },
  getuser: function () {
    let user = window.localStorage.getItem('user')
    if (user != null) {
      return JSON.parse(user)
    } else {
      return null
    }
  },
  getmodel: function (that, operate, pk, mm, wintitle) {
    if (!this.isnullorwhitespace(wintitle)) {
      that['winvisible'] = true
      that['wintitle'] = wintitle
    }
    return this.querydata(that, operate, 'GetModel', {pk: (this.isnullorwhitespace(pk) ? '' : pk)}, mm, true)
  },
  getmodelf: function (that, operate, pk, ufun, loading) {
    return this.querydataf(that, operate, 'GetModel', {pk: (this.isnullorwhitespace(pk) ? '' : pk)}, ufun, loading)
  },
  getmodelcache (that, operate, pk, mm) {
    return this.querydatacache(that, operate, 'GetModel', {pk: (this.isnullorwhitespace(pk) ? '' : pk)}, mm)
  },
  getmodelcachef: function (that, operate, pk, ufun, loading) {
    return this.querydatacachef(that, operate, 'GetModel', {pk: (this.isnullorwhitespace(pk) ? '' : pk)}, ufun, loading)
  },
  querydata: function (that, operate, operatetype, userdata, datas, loading) {
    let retrunvalue = this.getdata(that, operate, operatetype, userdata, loading)
    if (datas === undefined) {
      return retrunvalue
    } else {
      let self = this
      return retrunvalue.then(function (r) {
        if (r.ok) {
          that[datas] = r.data
        } else {
          self.message(that, r.message)
          console.log(r.message)
        }
      })
    }
  },
  querydataf: function (that, operate, operatetype, userdata, ufun, loading) {
    let returnvalue = this.getdata(that, operate, operatetype, userdata, loading)
    if (ufun === undefined) {
      return returnvalue
    } else {
      let self = this
      return returnvalue.then(function (r) {
        if (r.ok) {
          ufun(r.data)
        } else {
          self.message(that, r.message)
          console.log(r.message)
        }
      })
    }
  },
  querydatacache: function (that, operate, operatetype, userdata, datas) {
    let cachepk = 'querydatacache' + operate + operatetype + JSON.stringify(userdata).replace(/^\s+|\s+$/g, '')
    let data = window.localStorage.getItem(cachepk)
    if (data != null) {
      that[datas] = JSON.parse(data)
    } else {
      let self = this
      return this.getdata(that, operate, operatetype, userdata, false).then(function (r) {
        if (r.ok) {
          let d = r.data
          if (!self.isnullorwhitespace(r.data)) {
            window.localStorage.setItem(cachepk, JSON.stringify(d))
          }
          that[datas] = d
        } else {
          self.message(that, r.message)
          console.log(r.message)
        }
      })
    }
  },
  querydatacachef: function (that, operate, operatetype, userdata, ufun, loading) {
    let cachepk = 'querydatacachef' + operate + operatetype + JSON.stringify(userdata).replace(/^\s+|\s+$/g, '')
    let data = window.localStorage.getItem(cachepk)
    if (data != null) {
      ufun(JSON.parse(data))
    } else {
      let self = this
      return this.getdata(that, operate, operatetype, userdata, false).then(function (r) {
        if (r.ok) {
          let d = r.data
          if (!self.isnullorwhitespace(r.data)) {
            window.localStorage.setItem(cachepk, JSON.stringify(d))
          }
          ufun(d)
        } else {
          self.message(that, r.message)
          console.log(r.message)
        }
      })
    }
  },
  querywhere: function (that, querypk, querylists, datas) {
    return this.querypage(that, querypk, 0, 0, querylists, datas)
  },
  querypage: function (that, querypk, pagesize, pagenum, querylists, datas) {
    let self = this
    let returnvalue = this.getdata(that, 'QueryQuery', 'Query', {
      pk: querypk,
      pagenum: pagenum,
      pagesize: pagesize,
      lists: querylists
    })
    if (datas === undefined) {
      return returnvalue
    } else {
      returnvalue.then(function (r) {
        if (r.ok) {
          that[datas] = r.data
          // if (pagenum === 1 && pagetotal !== undefined) {
          //   that[pagetotal] = r.data.total
          // }
          // if (tableexpand !== undefined) {
          //   that[tableexpand] = r.data.expands.length > 0
          // }
        } else {
          self.message(that, r.message)
        }
      })
      return null
    }
  },
  querychart: function (that, querypk, querylists, charttype, doc, chart, id, stack) {
    let self = this
    stack = (stack === undefined) ? '' : stack
    let param = {
      pk: querypk,
      pagenum: 0,
      lists: querylists,
      type: charttype,
      stack: stack
    }
    let returnvalue = this.getdata(that, 'QueryQuery', 'Chart', param)
    if (id === undefined || doc === undefined || chart === undefined) {
      return returnvalue
    } else {
      returnvalue.then(function (r) {
        if (r.ok) {
          let myChart = chart.init(doc.getElementById(id))
          myChart.setOption(r.data)
        } else {
          that.charcd = 1
          self.message(that, r.message)
        }
      })
      return null
    }
  },
  initchart (that, type, echarts, datalist, doc, id, title) {
    let coption = {
      legend: {
      },
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
    let myChart = echarts.init(doc.getElementById(id))
    for (let i in datalist.rows) {
      if (title === '完成率') {
        coption.series[0].data.push({value: datalist.rows[i].完成率.replace(/%/g, ''), name: datalist.rows[i].大区})
      } else if (title === '总回款') {
        coption.series[0].data.push({
          value: datalist.rows[i].月度回款,
          name: datalist.rows[i].名称
        })
      } else if (title === '当日回款') {
        coption.series[0].data.push({value: datalist.rows[i].当日回款, name: datalist.rows[i].大区})
      } else if (title === '计划额') {
        coption.series[0].data.push({value: datalist.rows[i].计划额, name: datalist.rows[i].大区})
      }
    }
    myChart.setOption(coption)
  },
  querymodel: function (that, querypk, pk, mm) {
    let returnvalue = this.getdata(that, 'QueryQuery', 'Model', {pk: querypk, value: pk})
    if (mm === undefined) {
      return returnvalue
    } else {
      let self = this
      return returnvalue.then(function (r) {
        if (r.ok) {
          that[mm] = r.data
        } else {
          self.message(that, r.message)
          console.log(r.message)
        }
      })
    }
  },
  dateadd: function (date, day) {
    date.setDate(date.getDate() + day)
    return this.getdate(date)
  },
  datetimeadd: function (date, hour) {
    date.setHours(date.getHours() + hour)
    return this.gettime(date)
  },
  gettime: function (date) {
    if (date === undefined) {
      date = new Date()
    }
    var year = date.getFullYear()
    var month = date.getMonth()
    var data = date.getDate()
    var hours = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    var time = year + '-' + this.fnW((month + 1)) + '-' + this.fnW(data) + ' ' + this.fnW(hours) + ':' + this.fnW(minute) + ':' + this.fnW(second)
    return time
  },
  settime (dayCount) {
    let self = this
    if (self.isnullorwhitespace(dayCount)) {
      dayCount = 0
    }
    let dd = new Date()
    dd.setDate(dd.getDate() + dayCount)
    let y = dd.getFullYear()
    let m = dd.getMonth() + 1
    if (m.toString().length === 1) {
      m = '0' + m
    }
    let d = dd.getDate()
    if (d.toString().length === 1) {
      d = '0' + d
    }
    return y + '-' + m + '-' + d
  },
  getdate: function (date) {
    if (date === undefined) {
      date = new Date()
    }
    var year = date.getFullYear()
    var month = date.getMonth()
    var data = date.getDate()
    var time = year + '-' + this.fnW((month + 1)) + '-' + this.fnW(data)
    return time
  },
  fnW: function (str) {
    return str > 9 ? str : '0' + str
  },
  isnullorwhitespace: function (val) {
    if (val === undefined || val === null || val === '') {
      return true
    } else {
      return false
    }
  },
  addwhere: function (that, querylist, lg, lp, field, condition, value, rp, fix, parm, need) {
    if (value !== '' || condition.indexOf('null') >= 0 || fix === 'Y' || parm === 'Y') {
      that[querylist] = that[querylist].concat([
        {
          'Logic': lg,
          'LeftParenthesis': lp,
          'Field': field,
          'Condition': condition,
          'Value': value,
          'RightParenthesis': rp,
          'Fix': fix,
          'Parm': parm
        }])
    } else if (need === 'Y') {
      this.message(that, '条件中有必输字段')
    }
  },
  ischs: function (val) {
    var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
    // ：^[\u4e00-\u9fa5],{0,}$
    if (reg.test(val)) {
      return true
    } else {
      return false
    }
  },
  isnumorchar: function (val) {
    var reg = new RegExp('^\\w+$')
    if (reg.test(val)) {
      return true
    } else {
      return false
    }
  },
  isnum: function (val) {
    var reg = new RegExp('^[0-9]*$')
    if (reg.test(val)) {
      return true
    } else {
      return false
    }
  },
  ischar: function (val) {
    var reg = new RegExp('^[A-Za-z]+$')
    if (reg.test(val)) {
      return true
    } else {
      return false
    }
  },
  todecimal (val, ws) {
    if (this.isnullorwhitespace(ws)) {
      ws = 2
    } else if (this.isnum(ws)) {
      if (ws < 1) {
        ws = 1
      }
    } else {
      ws = 2
    }
    if (isNaN(val)) {
      return 0
    } else {
      return Math.round(val * Math.pow(10, ws)) / Math.pow(10, ws)
    }
  },
  toyn (val) {
    if (val === true) {
      return 'Y'
    } else if (val === false) {
      return 'N'
    } else {
      return 'N'
    }
  },
  copyjson: function (val) {
    return JSON.parse(JSON.stringify(val))
  },
  arraysum (arr, field) {
    let s = 0
    arr.forEach(function (row, index) {
      s = s + row[field]
    })
    return s
  },
  listadd (lists, list, pkname) {
    this.listremove(lists, list[this.isnullorwhitespace(pkname) ? 'pk' : pkname], pkname)
    lists.push(list)
    return lists
  },
  listvalue (lists, pk, pkname) {
    let ls = []
    if (this.isnullorwhitespace(pkname)) {
      ls = lists.filter(c => c.pk === pk)
    } else {
      ls = lists.filter(c => c[pkname] === pk)
    }
    if (ls.length === 1) {
      return ls[0]
    } else {
      return null
    }
  },
  listremove (lists, pk, pkname) {
    let self = this
    let index = lists.findIndex(function (value, index, arr) {
      if (self.isnullorwhitespace(pkname)) {
        return value.pk === pk
      } else {
        return value[pkname] === pk
      }
    })
    if (index !== -1) {
      return lists.splice(index, 1)
    }
  }
}
