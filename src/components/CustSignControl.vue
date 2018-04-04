<template>
  <div class="sign">
      <p v-if="currentdate===null||currentdate===''">上次签到:无</p>
      <p v-else>上次签到:{{currentdate}}</p>
    <div style="margin-left: 9em">
      <p v-if="currentdate===toady">
        <x-button mini plain @click.native="signcancel" class="signbtn">取消签到</x-button>
      </p>
      <p v-else>
        <x-button mini plain @click.native="signin">签到</x-button>
      </p>
    </div>
  </div>
</template>

<script>
  import u from '../js/utility'
  export default {
    props: {
      pk: {
        type: String,
        default: ''
      },
      signindate: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        toady: u.getdate(),
        currentdate: this.signindate,
        mm: {
          pk_Customer: this.pk
        }
      }
    },
    methods: {
      signin () {
        let that = this
        u.getdata(that, 'Connect', 'SignIn', that.mm).then(function (r) {
          if (r.ok) {
            that.bindsigndate()
          } else {
            u.alert(that, r.message)
          }
        })
      },
      signcancel () {
        let that = this
        u.getdata(that, 'Connect', 'SignInCancel', that.mm).then(function (r) {
          if (r.ok) {
            that.bindsigndate()
            setTimeout(function () {
              u.message(that, '已取消签到')
            }, 500)
          } else {
            u.message(that, r.message)
          }
        })
      },
      bindsigndate () {
        let that = this
        u.querymodel(that, '15266443-64b5-4b4d-9422-a77c00adb875', that.pk).then(function (r) {
          if (r.ok) {
            that.currentdate = r.data.LastSignInDate
          } else {
            u.message(that, r.message)
          }
        })
      }
    }
  }
</script>
<style scoped>
  .sign p {
    display: inline-block;
    font-size: 14px;
    float: left
  }

  .weui_btn + .weui_btn {
    margin-top: 0
  }
</style>
