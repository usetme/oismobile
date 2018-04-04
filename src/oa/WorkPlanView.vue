<template>
  <div class="pagecontent">
      <cell title="计划月份">{{mm.PlanMonth}}</cell>
      <cell title="员工姓名" v-show="datashow">{{mm.EmployeeName}}</cell>
      <cell class="spcell"></cell>
    <group title="计划金额(万)">
      <cell title="硒萃金额">{{mm.Money1}}</cell>
      <cell title="负电位金额">{{mm.Money3}}</cell>
      <cell title="水机金额">{{mm.Money2}}</cell>
      <cell title="养生仪金额">{{mm.Money4}}</cell>
      <cell title="其它金额">{{mm.Money0}}</cell>
      <cell title="计划总金额">{{mm.Total}}</cell>
      <cell class="spcell"></cell>
    </group>
    <group title="计划说明"><ctextarea :max="0" v-model="mm.DetailPlan"></ctextarea></group>
    <div v-show="datashow">
      <cell class="spcell"></cell>
      <group title="执行情况"><ctextarea :max="0" v-model="mm.Detail"></ctextarea></group>
      <cell class="spcell"></cell>
      <group title="亮点"><ctextarea :max="0" v-model="mm.Merit"></ctextarea></group>
      <cell class="spcell"></cell>
      <group title="不足"><ctextarea :max="0" v-model="mm.Lack"></ctextarea></group>
    </div>
    <cell class="spcell"></cell>
    <div class="comment">
      <div v-for="i in oo">
        <span>{{i.评论人}}{{i.评论时间}}</span>
        <ctextarea :value="i.评论内容" :rows="2"></ctextarea>
      </div>
      <x-input placeholder="有啥想说的不用客气..." v-model="cc.Comments"></x-input>
      <x-button mini @click="addcomment">评论</x-button>
    </div>
  </div>
</template>
<script>
  import u from '../js/utility'
  export default {
    data () {
      return {
        datashow: undefined,
        cc: {},
        oo: {},
        mm: {}
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '工作计划信息')
      })
    },
    activated: function () {
      let that = this
      if (u.routereload()) {
        let pk = u.routepk(that)
        u.querymodel(that, '170ea738-2566-4008-a8ff-a6da00fc615a', this.$route.query.pk).then(function (r) {
          if (r.ok) {
            that.mm = r.data
            that.datashow = new Date(that.mm.PlanMonth) < new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
          } else {
            u.message(that, r.message)
          }
        })
        u.getmodel(that, 'Comment', pk).then(function (r) {
          if (r.ok) {
            that.cc = r.data
          } else {
            u.alert(that, r.message)
          }
        })
        u.querywhere(that, 'c781d6bf-0d16-4d7e-bc5d-a6e800aa397c', [{
          'Field': 'Comment.SourceId',
          'Value': that.$route.query.pk
        }]).then(function (r) {
          if (r.ok) {
            that.oo = r.data.rows
          } else {
            u.message(that, r.message)
          }
        })
      }
    },
    methods: {
      addcomment: function () {
        let that = this
        that.cc.SourceId = that.$route.query.pk
        u.getdata(that, 'Comment', 'AddUpdate', that.cc).then(function (r) {
          if (r.ok) {
            u.message(that, '评论成功！')
            setTimeout(function () {
              u.querywhere(that, 'c781d6bf-0d16-4d7e-bc5d-a6e800aa397c', [{
                'Field': 'Comment.SourceId',
                'Value': that.$route.query.pk
              }]).then(function (r) {
                if (r.ok) {
                  that.oo = r.data.rows
                  that.cc.Comments = ''
                } else {
                  u.message(that, r.message)
                }
              })
            }, 500)
          } else {
            u.alert(that, r.message)
          }
        })
      },
      modify: function () {
        let that = this
        u.routergo(that, 'WorkPlanAdd', {pk: this.$route.query.pk})
      }
    }
  }
</script>
