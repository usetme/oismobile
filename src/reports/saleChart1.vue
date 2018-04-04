<template>
  <div class="pagecontent">
    <div id="main0" style="width: 100%;height:400px;"></div>
    <div id="main1" style="width: 100%;height:400px;"></div>
    <div id="main2" style="width: 100%;height:400px;"></div>
    <div id="main3" style="width: 100%;height:400px;"></div>
    <div id="main4" style="width: 100%;height:400px;"></div>
    <div>经销商回款top20</div>
    <button-tab>
      <button-tab-item selected @click.native="datashow=1">本年回款(万)</button-tab-item>
      <button-tab-item @click.native="datashow=2">本月回款(万)</button-tab-item>
      <button-tab-item @click.native="datashow=3">当日回款(万)</button-tab-item>
    </button-tab>
    <ctable :data="datalist1" v-show="datashow==1"></ctable>
    <ctable :data="datalist2" v-show="datashow==2"></ctable>
    <ctable :data="datalist3" v-show="datashow==3"></ctable>
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
        datalist1: {},
        datalist2: {},
        datalist3: {},
        datashow: 1
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '回款图表')
      })
    },
    activated: function () {
      let that = this
      let querylist = [{
        'Logic': '',
        'LeftParenthesis': '',
        'Field': 'mm',
        'Condition': '=',
        'Value': u.getdate().substr(0, 7) + '-01',
        'RightParenthesis': '',
        'Fix': '',
        'Parm': 'Y'
      }, {
        'Logic': '',
        'LeftParenthesis': 'and',
        'Field': 'dd',
        'Condition': '=',
        'Value': u.getdate(),
        'RightParenthesis': '',
        'Fix': '',
        'Parm': 'Y'
      }]
      u.querychart(that, 'e06df64a-d170-4ae1-b879-a6d000e99928', null, 'line', document, echarts, 'main0')
      u.querychart(that, 'eed067a5-73ec-40c7-88ee-a6d000ee4170', null, 'bar', document, echarts, 'main1')
      u.querychart(that, 'f0135f61-912d-4bfa-bb13-a6d000eb52fd', null, 'pie', document, echarts, 'main2')
      u.querychart(that, '239afe76-0312-4e65-ac3c-a6f600c53e0b', null, 'pie', document, echarts, 'main3')
      u.querychart(that, '43b998d4-15cb-4b14-81d7-a6f600c5959f', null, 'pie', document, echarts, 'main4')
      u.querywhere(that, '5aef22e7-47bd-46a2-92ab-a6f600cf0dd9', null, 'datalist1')
      u.querywhere(that, '575d2651-0eba-4519-a2cd-a6f600cfceea', querylist, 'datalist2')
      u.querywhere(that, 'd5e97c0c-05cd-414a-8d38-a6f600d02401', null, 'datalist3')
    }
  }
</script>
