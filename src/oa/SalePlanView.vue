<template>
  <div class="pagecontent">
    <group>
      <cell title=""><img src="../assets/img/chan.png" alt="" @click="modify"></cell>
      <cell title="计划月份">{{mm.PlanMonth}}</cell>
      <cell title="经销商">{{mm.CustomerName}}</cell>
      <cell title="员工姓名">{{mm.EmployeeName}}</cell>
      <cell class="spcell"></cell>
    </group>
    <group title="计划金额(万)">
      <cell title="硒萃金额">{{mm.Money1}}</cell>
      <cell title="负电位金额">{{mm.Money3}}</cell>
      <cell title="水机金额">{{mm.Money2}}</cell>
      <cell title="养生仪金额">{{mm.Money4}}</cell>
      <cell title="其它金额">{{mm.Money0}}</cell>
      <cell title="计划总金额">{{mm.Total}}</cell>
      <cell class="spcell"></cell>
    </group>
    <group title="回款详情"><ctextarea placeholder="" v-model="mm.DetailPlan" :max="0"></ctextarea></group>
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
        mm: {},
        cc: {},
        oo: {},
        pitshow: undefined
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '回款计划信息')
      })
    },
    activated: function () {
      let that = this
      if (that.$route.query.pk === undefined) {
        that.$route.query.pk = that.mm.pk_SalePlan
      }
//      由于route data用法没了，只能通过判断route里参数在下个页面退回的时候进行重新赋值
      if (u.routereload()) {
        u.querymodel(that, 'c75c8183-086c-40c1-a746-a6da00fbc2a8', that.$route.query.pk, 'mm')
        u.getmodel(that, 'Comment', that.$route.query.pk).then(function (r) {
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
    watch: {
      '$route': function () {
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
        if (u.getuser().pk_User === that.mm.CreateUser) {
          u.routergo(that, 'SalePlanAdd', {pk: that.$route.query.pk})
        } else {
          u.message(that, '您没有权限编辑他人计划！')
        }
      }
    }
  }
</script>
