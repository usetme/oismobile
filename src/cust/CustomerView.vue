<template>
  <div class="pagecontent">
    <group>
      <cell title=""><img src="../assets/img/chan.png"  @click="btnlink('CustomerAdd',mm.pk_Customer)"></cell>
      <cell title="客户姓名">{{mm.Name}}</cell>
      <cell title="性别">{{mm.Sex}}</cell>
      <cell title="会员卡号">{{mm.CardNo}}</cell>
      <cell title="会员编号">{{mm.Code}}</cell>
      <cell class="spcell"></cell>
      <cell title="农历生日">{{mm.BirthLunar}}</cell>
      <cell title="阴历生日">{{mm.Birthday}}</cell>
      <cell title="加入日期">{{mm.JoinDate}}</cell>
      <cell title="结婚日期">{{mm.MarryDate}}</cell>
      <cell class="spcell"></cell>
      <cell title="手机号码">{{mm.Mobile}}</cell>
      <cell title="电话">{{mm.Tel}}</cell>
      <cell class="spcell"></cell>
      <cell title="地址">{{mm.Province}}{{mm.City}}{{mm.Area}}</cell>
      <group title="详细地址">
        <x-textarea :max="0" v-model="mm.Address"></x-textarea>
      </group>
      <cell class="spcell"></cell>
      <cell title="特长">{{mm.Skill}}</cell>
      <cell title="客户来源">{{mm.GradeName}}</cell>
      <cell title="推荐人">{{mm.Name1}}</cell>
    </group>
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
        u.routeinit(vm, '客户信息')
      })
    },
    activated: function () {
      if (u.routereload()) {
        u.querymodel(this, '846abb6f-96bd-4bf8-a2e6-a6cf009a007d', this.$route.query.pk, 'mm')
      }
    },
    methods: {
      btnlink (linkname, pk) {
        if (linkname.indexOf('Customer')) {
          u.routergo(this, linkname, {pk: pk})
        } else {
          u.routergo(this, linkname, {custpk: pk})
        }
      }
    }
  }
</script>
