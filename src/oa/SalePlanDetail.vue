<template>
  <div class="pagecontent">
    <h4></h4>
    <div id="main"></div>
    <x-table style="background-color: #fff">
      <thead>
      <tr>
      <th :colspan="title.titlelength" class="bold">{{title.content}}({{this.$route.query.name}})</th>
      </tr>
      <tr>
        <th v-for="i in datalist1.columns">{{i.title}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in datalist1.rows">
        <td>{{i.日期}}</td>
        <td>{{i.收款金额}}</td>
        <td>{{i.货款}}</td>
        <td>{{i.配件款}}</td>
        <td>{{i.运费}}</td>
        <td>{{i.保证金}}</td>
        <td>{{i.其他}}</td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>
<script>
  import u from '../js/utility'
  var echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/line')
  require('echarts/lib/component/grid')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data () {
      return {
        datalist1: {},
        title: {
          content: '',
          titlelength: ''
        },
        charcd: 0
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '回款详情')
      })
    },
    activated: function () {
      let that = this
      that.charcd = 0
      let pk = that.$route.query.pk
      u.querychart(that, '9921ce6c-ae4e-4b83-a550-a6e20155c0d6', [{
        'Parm': 'Y',
        'field': 'pk',
        'Value': pk
      }], 'line', document, echarts).then(function (r) {
        if (r.ok) {
          let myChart = echarts.init(document.getElementById('main'))
          myChart.setOption(r.data)
        } else {
          that.charcd = 1
          u.message(that, r.message)
        }
      })
      u.querywhere(that, 'c2f82866-03ab-4728-9dfc-a6e20156cc8a', [{
        'Parm': 'Y',
        'field': 'pk',
        'Value': pk
      }]).then(function (r) {
        if (r.ok) {
          that.datalist1 = r.data
          that.title.content = r.data.title
          that.title.titlelength = r.data.columns.length
        } else {
        }
      })
    },
    created: function () {
    }
  }
</script>
