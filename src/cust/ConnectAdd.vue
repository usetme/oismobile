<template>
  <div class="pagecontent">
    <div id="popdiv"></div>
    <group title="经销商"><ccust v-model="mm.pk_Customer"></ccust></group>
    <cell title="联系类型"><cselect pk="bda0f04a-f424-405e-a3d7-9a9c00ee079e" v-model="mm.ConnType"></cselect></cell>
    <p class="pageline"></p>
    <group title="联系时间">
      <datetime title="本次联系时间" placeholder="请选择" v-model="mm.ConnTime" format="YYYY-MM-DD" confirm-text="确认" cancel-text="取消"></datetime>
      <datetime title="下次联系时间" placeholder="请选择" v-model="mm.NextTime" format="YYYY-MM-DD" confirm-text="确认" cancel-text="取消"></datetime>
    </group>
    <p class="pageline"></p>
    <group title="通话内容"><x-textarea v-model="mm.Memo"></x-textarea></group>
    <p class="btn"><x-button plain type="primary" @click.native="btnsave">确认</x-button></p>
  </div>
</template>
<script>
  import u from '../js/utility'
  export default {
    data () {
      return {
        mm: {}
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '联系记录')
      })
    },
    activated: function () {
      let that = this
      if (u.routereload()) {
        u.getmodel(that, 'Connect', this.$route.query.pk).then(function (r) {
          if (r.ok) {
            that.mm = r.data
            if (u.isnullorwhitespace(that.$route.query.pk) && !u.isnullorwhitespace(that.$route.query.custpk)) {
              that.mm.pk_Customer = that.$route.query.custpk
            }
          } else {
            u.alert(that, r.message)
          }
        })
      }
    },
    mounted: function () {
      let div = document.querySelectorAll('.vux-popup-dialog, .vux-popup')[0]
      document.getElementById('popdiv').appendChild(div)
    },
    methods: {
      btnsave: function () {
        let that = this
        u.getdata(that, 'Connect', 'AddUpdate', that.mm).then(function (r) {
          if (r.ok) {
            u.routerback(that, true, '保存成功', 200)
          } else {
            u.alert(that, r.message)
          }
        })
      }
    }
  }
</script>
