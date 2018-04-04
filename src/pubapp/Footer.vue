<template>
  <div id="footer">
    <tabbar class="vux-demo-tabbar">
      <tabbar-item :selected="sel" link="/Schedule" @click.native="sell">
        <img slot="icon" src="../assets/img/day.png" v-show="!sel">
        <img slot="icon" src="../assets/img/day1.png" v-show="sel">
        <span slot="label">日程</span>
      </tabbar-item>
      <tabbar-item :selected="se" @click.native="see">
        <img slot="icon" src="../assets/img/app.png" v-show="!se">
        <img slot="icon" src="../assets/img/app1.png" v-show="se">
        <span slot="label">应用</span>
      </tabbar-item>
      <tabbar-item :selected="s" link="About" @click.native="ss">
        <img slot="icon" src="../assets/img/us.png" v-show="!s">
        <img slot="icon" src="../assets/img/us1.png" v-show="s">
        <span slot="label">关于</span>
      </tabbar-item>
    </tabbar>
    <div v-transfer-dom>
      <popup v-model="popupshow" height="80%">
      <div class="popup1">
      <!--<div class="abs" @click="btnlink('SalePlan')">-->
      <!--<img src="../assets/img/money.png" alt="">-->
      <!--<p class="rel">回款计划</p>-->
      <!--</div>-->
      <!--<div class="abs" @click="btnlink('WorkPlan')">-->
      <!--<img src="../assets/img/work.png" alt="">-->
      <!--<p class="rel">工作计划</p>-->
      <!--</div>-->
      <div class="abs" @click="btnlink('sdeCustomer')">
      <img src="../assets/img/meet.png" alt="">
      <p class="rel">经销商</p>
      </div>
      <div class="abs" @click="btnlink('sdeEmployee')">
      <img src="../assets/img/passager.png" alt="">
      <p class="rel">员工日程</p>
      </div>
      <div class="abs" @click="btnlink('sdeQuery1')">
      <img src="../assets/img/fin.png" alt="">
      <p class="rel">日程数据</p>
      </div>
      <div class="abs" @click="btnlink('sdeQuery2')">
      <img src="../assets/img/on.png" alt="">
      <p class="rel">会议效率</p>
      </div>
      <div class="abs" @click="btnlink('PlanDetail')">
      <img src="../assets/img/plandetail.png" alt="">
      <p class="rel">计划报表</p>
      </div>
      <div class="abs" @click="btnlink('saleChart1')">
      <img src="../assets/img/person.png" alt="">
      <p class="rel">回款图表</p>
      </div>
        <!--<router-link to="/RequestForArea">RequestForArea</router-link>-->
        <!--<router-link to="/RequestForTeacher">RequestForTeacher</router-link>-->
        <!--<router-link to="/TransferPage">TransferPage</router-link>-->
        <img src="../assets/img/close.png" alt="" class="img" @click="popupshow = false">
      </div>
      </popup>
    </div>
  </div>
</template>
<script>
  import { TransferDom } from 'vux'
  import u from '../js/utility'
  export default{
    directives: {
      TransferDom
    },
    data () {
      return {
        popupshow: false,
        pit: false,
        sel: true,
        se: false,
        s: false
      }
    },
    methods: {
      sell: function () {
        this.sel = true
        this.se = false
        this.s = false
      },
      see: function () {
        this.popupshow = true
        this.se = true
        this.sel = false
        this.s = false
      },
      ss: function () {
        this.se = false
        this.sel = false
        this.s = true
      },
      btnlink (linkname) {
        let that = this
        that.popupshow = false
        u.routergo(that, linkname)
      }
    }
  }
</script>
<style>
  @import '../css/mystyle.css';
</style>
