<template>
  <div class="login">
    <flexbox orient="vertical" class="login-flex">
      <img src="../assets/img/logo.png" width="25%" height="25%">
      <h1 class="crmlogo">OIS</h1>
      <div class="login-flex_input">
        <x-input title="用户" v-model="user"></x-input>
        <x-input title="密码" v-model="pwd" type="password"></x-input>
        <x-button plain type="primary" class="login-btn" @click.native="submit">登录</x-button>
      </div>
    </flexbox>
  </div>
</template>
<script>
  import u from '../js/utility'
  export default{
    data () {
      return {
        user: '',
        pwd: ''
      }
    },
    activated: function () {
      u.routeinit(this)
      if (this.$route.query.offline === 'n') {
        window.localStorage.removeItem('user')
      } else {
        let that = this
        let l = window.localStorage.getItem('user')
        l = JSON.parse(l)
        if (l === null) {
        } else {
          if (l.LoginTime <= u.datetimeadd(new Date(), -24)) {
            window.localStorage.removeItem('user')
          } else {
            let loginhome = window.localStorage.getItem('loginhome')
            if (loginhome === 's') {
              u.routergo(that, 'Schedule', false)
            } else if (loginhome === 'c') {
              u.routergo(that, 'Customer', false)
            } else {
              u.alert('没有当前入口类型！')
            }
          }
        }
      }
    },
    methods: {
      submit: function () {
        let that = this
        let userdata = {usercode: that.user, password: that.pwd}
        u.getdata(that, 'User', 'Login', userdata).then(function (r) {
          if (r.ok) {
            let loginhome = window.localStorage.getItem('loginhome')
            window.localStorage.setItem('user', JSON.stringify(r.data))
            if (loginhome === 's') {
              u.routergo(that, 'Schedule', false)
            } else if (loginhome === 'c') {
              u.routergo(that, 'Customer', false)
            } else {
              u.alert(that, '没有入口类型,请联系管理员！')
            }
          } else {
            u.message(that, r.message)
          }
        })
      }
    }
  }
</script>
<style scoped>
  .weui-btn_plain-primary {
    color: #fff;
    border: 1px solid #fff;
  }

  .weui-cell {
    color: #fff;
    padding: 16px 26px;
  }
</style>
