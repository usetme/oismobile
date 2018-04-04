<template>
  <div class="pagecontent">
    <img src="../assets/img/add.png" alt="" @click="btnadd" class="defimg">
    <ccust v-model="employpk" @change="btnquery"></ccust>
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
              <p @click="btnview(r.pk)">{{$index+1}}{{r.name}}</p>
            </div>
            <div v-show="r.billdate!==null">{{r.billdate}</div>
            <div v-show="r.product!==null">{{r.product}}</div>
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
        querypk: '23914c47-dca7-42b3-aa48-a6cd00e22007',
        queryvalue: '',
        employpk: '',
        salepk: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '购买列表')
      })
    },
    activated: function () {
      if (u.routereload()) {
        this.employpk = u.routepk(this, 'employpk')
        this.btnquery()
      }
    },
    methods: {
      btnquery () {
        this.querylist = []
        if (!u.isnullorwhitespace(this.employpk)) {
          u.addwhere(this, 'querylist', '', '', 'Sale.pk_Customer', '=', this.employpk, '')
        }
        u.vuxquerypage(this, false)
      },
      loadMore () {
        let that = this
        u.vuxquerypage(that, true)
      },
      btnadd: function () {
        u.routergo(this, 'SaleAdd', {employpk: this.employpk})
      },
      btnview (pk) {
        u.routergo(this, 'SaleView', {pk: pk})
      }
    }
  }
</script>
