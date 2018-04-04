<template>
  <div class="pagecontent">
    <img src="../assets/img/add.png"  @click="btnadd" class="defimg">
    <ccust v-model="custpk" @change="btnquery"></ccust>
    <scroller lock-x scrollbar-y
              :use-pullup="true"
              :use-pulldown="true"
              :pulldown-config="status.pulldownconfig"
              :pullup-config="status.pullupconfig"
              @on-pullup-loading="loadMore"
              @on-pulldown-loading="btnquery"
              v-model="status"
              ref="scroller"
              height="-130">
      <div class="cardcontent">
        <card v-for="r in tabledata.rows" @click.native="btnview(r.pk)">
          <div slot="content">
            <div class="cardname">
              <p @click="btnview(r.pk)">{{r.Name}}</p>
            </div>
            <div v-show="r.conntime!==null">本次联系时间:{{r.conntime}}</div>
            <div v-show="r.NextTime!==null">下次联系时间:{{r.NextTime}}</div>
            <div v-show="r.conntype!==null">联系类型:{{r.conntype}}</div>
          </div>
        </card>
      </div>
    </scroller>
  </div>
</template>
<script>
  import u from '../js/utility'
  export default {
    data () {
      return {
        status: u.defscroller(),
        pagenum: 1,
        tabledata: [],
        querylist: [],
        querypk: '8f1c4b0d-715d-4cd3-9491-a6cd009b33eb',
        queryvalue: '',
        custpk: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '联系列表')
      })
    },
    activated: function () {
      if (u.routereload()) {
        this.custpk = u.routepk(this, 'custpk')
        this.btnquery()
      }
    },
    methods: {
      btnquery () {
        this.querylist = []
        if (!u.isnullorwhitespace(this.custpk)) {
          u.addwhere(this, 'querylist', '', '', 'Connect.pk_Customer', '=', this.custpk, '')
        }
        u.vuxquerypage(this, false)
      },
      loadMore () {
        let that = this
        u.vuxquerypage(that, true)
      },
      btnadd: function () {
        u.routergo(this, 'ConnectAdd', {custpk: this.custpk})
      },
      btnview (pk) {
        u.routergo(this, 'ConnectView', {pk: pk})
      }
    }
  }
</script>

