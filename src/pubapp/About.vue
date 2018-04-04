<template>
  <div class="pagecontent">
      <div class="bgus">
        <p class="changeuser"  @click="changeLogin"><img src="../assets/img/change.png">切换登录</p>
        <div class="bgus_title">
          <!--<input type="file">-->
          <img src="../assets/img/cust.png" class="logo">
          <span>{{datalist.DeptName}} {{datalist.UserName}}</span>
        </div>
      </div>
    <div class="hidelfloor">
      <p>
        <img src="../assets/img/helpu.png">
        <span>025-66608829</span>
      </p>
      <p>
        <a href="http://wpa.qq.com/msgrd?v=3&uin=380336397&site=qq&menu=yes">
        <img src="../assets/img/linkus.png">
        <span>在线帮助</span>
        </a>
      </p>
    </div>
    <x-button type="primary" @click.native="exit" class="mybtn2">退出登录</x-button>
  </div>
</template>
<script>
  import u from '../js/utility'
  export default {
    data () {
      return {
        datalist: []
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '', true)
      })
    },
    created: function () {
      let l = window.localStorage.getItem('user')
      l = JSON.parse(l)
      this.datalist = l
    },
    methods: {
      exit: function () {
        window.localStorage.clear()
        u.routergo(this, 'Login', {offline: 'n'})
        window.location.reload()
      },
      changeLogin: function () {
        let loginhome = window.localStorage.getItem('loginhome')
        u.alert(this, '该入口暂时关闭!')
//        window.localStorage.setItem('loginhome', (loginhome === 's' ? 'c' : 's'))
//        window.localStorage.clear()
//        u.routergo(this, 'Login')
      }
    }
  }
</script>
<style>
  .bgus{
    position: relative;
    width: 100%;
    height: 240px;
    background-image: url("../assets/img/head1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .bgus .logo{
    width:100px;
    height: 100px;
    border-radius: 50%;
    display: block;
  }
  .bgus .bgus_title{
    position: absolute;
    left: 38%;
    text-align: center;
    top:26%;
  }
  .bgus .bgus_title input{
    opacity: 0; filter:Alpha(opacity=0);
    position: absolute;
    left: 0%;
    text-align: center;
    width:100px;
    height: 100px;
    border-radius: 50%;
    display: block;
    top:0%;
  }
  .bgus .bgus_title span{
    color:#4e4e4e;
    display: inline-block;
    font-size: 14px;
  }
  .changeuser{
    height: 20px;
    width: 100px;
    background: rgba(0, 0, 0, 0.2);
    text-align: center;
    color:#fff;
    font-size: 14px;
    position: absolute;
    right: 20px;
    top:20px;
    border-radius: 10px;
    line-height: 20px;
  }
  .changeuser img{
    height: 20px;
    width: 22px;
    vertical-align: bottom;
  }

  .hidelfloor {
    width: 90%;
    height: 80px;
    position: relative;
    margin-left: 5%;
    border-radius: 10px;
    top: -16px;
    background-color: #fff;
  }
  .hidelfloor p:first-child{
    margin-left: 10%;
    border-right: 1px dashed #e0e0e0;
  }
  .hidelfloor p{
    width:40%;
    height: 90%;
    float: left;
    padding-top:8px;
    text-align: -webkit-center;
  }
  .hidelfloor img{
    width: 40px;
    display: block;
    height: 40px;
  }
  .hidelfloor span,.hidelfloor a{
    color:#b1b1b1;
    font-size: 12px;
    display: inline-block;
  }
</style>
