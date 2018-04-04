<template>
  <div id="footer">
    <tabbar class="vux-demo-tabbar">
      <tabbar-item :selected="sel" link="/Customer" @click.native="sell">
        <img slot="icon" src="../assets/img/day.png" v-show="!sel">
        <img slot="icon" src="../assets/img/day1.png" v-show="sel">
        <span slot="label">客户</span>
      </tabbar-item>
      <tabbar-item :selected="se" @click.native="see">
        <img slot="icon" src="../assets/img/app.png" v-show="!se">
        <img slot="icon" src="../assets/img/app1.png" v-show="se">
        <span slot="label">应用</span>
      </tabbar-item>
      <tabbar-item :selected="s" link="/About" @click.native="ss">
        <img slot="icon" src="../assets/img/us.png" v-show="!s">
        <img slot="icon" src="../assets/img/us1.png" v-show="s">
        <span slot="label">关于</span>
      </tabbar-item>
    </tabbar>
    <popup v-model="popupshow" height="100%" class="pop">
      <div class="popup1">
        <div class="abs" @click="btnlink('Order')">
          <img src="../assets/img/order.png" alt="">
          <p class="rel">订单</p>
        </div>
        <div class="abs" @click="btnlink('Connect')">
          <img src="../assets/img/connect.png" alt="">
          <p class="rel">联系</p>
        </div>
        <img src="../assets/img/close.png" alt="" class="img" @click="popupshow = false">
      </div>
    </popup>
  </div>
</template>
<script>
  import {Tabbar, TabbarItem, Icon, Popup} from 'vux'
  import u from '../js/utility'
  export default{
    components: {
      Tabbar,
      TabbarItem,
      Icon,
      Popup
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
