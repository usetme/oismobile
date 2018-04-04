<template>
  <div class="pagecontent">
    <group>
      <cell title=""><img src="../assets/img/chan.png" @click="btnedit"></cell>
      <cell title="客户姓名">{{mm.CustomerName}}</cell>
      <cell title="员工姓名">{{mm.EmployeeName}}</cell>
      <cell title="联系类型">{{mm.TypeName}}</cell>
      <cell class="spcell"></cell>
      <cell title="本次联系时间">{{mm.ConnTime}}</cell>
      <cell title="下次联系时间">{{mm.NextTime}}</cell>
      <cell class="spcell"></cell>
    </group>
    <group title="通话内容">
      <x-textarea :max="0" v-model="mm.Memo" :rows="6"></x-textarea>
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
        u.routeinit(vm, '联系信息')
      })
    },
    activated: function () {
      u.querymodel(this, 'b589ea93-d5a7-4695-9858-a6cd00e0fca0', this.$route.query.pk, 'mm')
    },
    methods: {
      btnedit: function () {
        u.routergo(this, 'ConnectAdd', {pk: this.mm.pk_Connect})
      }
    }
  }
</script>
