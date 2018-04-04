<template>
  <div>
    <img src="../assets/img/add.png" @click="btnadd" class="defimg">
    <x-input v-model="queryvalue" placeholder="请输入姓名/电话/手机" :show-clear="false">
      <x-button slot="right" type="default" mini @click.native="btnquery">查询</x-button>
    </x-input>
    <div class="pagecontent">
      <cselect :columns="2" pk="mCustomerWhereEmployee" v-model="selectvalue" @change="btnquery"></cselect>
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
            <card v-for="r in tabledata.rows">
              <div slot="content">
                  <div class="cardname">
                    <p @click="btnview(r.pk)">{{r.Name}}</p>
                    <csign :pk="r.pk" :signindate="r.LastSignInDate"></csign>
                  </div>
                  <div v-show="r.Mobile!==null||r.Tel!==null">{{r.Mobile}}{{r.Tel}}</div>
                  <div v-show="r.Province!==null">{{r.Province}}{{r.City}}{{r.Area}}{{r.Address}}</div>
                  <img src="../assets/img/tel.png">
                  <span @click="btnlink('Connect',r.pk)">联系记录</span>
              </div>
            </card>
          </div>
      </scroller>
    </div>
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
        querypk: '293b3153-6994-4488-8f44-a6ad00fafa35',
        queryvalue: '',
        selectvalue: ' ,'
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '', true)
      })
    },
    methods: {
      btnquery () {
        let vals = this.selectvalue.split(',')
        this.querylist = []
        if (this.queryvalue !== '') {
          u.addwhere(this, 'querylist', 'and', '(', 'Customer.Mobile', 'like', this.queryvalue, '')
          u.addwhere(this, 'querylist', 'or', '', 'Customer.Tel', 'like', this.queryvalue, '')
          u.addwhere(this, 'querylist', 'or', '', 'Customer.Name', 'like', this.queryvalue, ')')
        }
        if (vals[1].lastIndexOf('|') > 0) {
          u.addwhere(this, 'querylist', 'and', '', 'Employee.pk_Dept', 'SonDept', vals[0], '')
        } else {
          console.log(vals)
          u.addwhere(this, 'querylist', 'and', '', 'Employee.pk_Employee', '=', vals[1], '')
        }
        u.vuxquerypage(this, false)
      },
      loadMore () {
        let that = this
        u.vuxquerypage(that, true)
      },
      btnadd: function () {
        u.routergo(this, 'CustomerAdd')
      },
      btnview (pk) {
        u.routergo(this, 'CustomerView', {pk: pk})
      },
      btnlink (linkname, pk) {
        if (linkname.indexOf('Customer') > 0) {
          u.routergo(this, linkname, {pk: pk})
        } else {
          u.routergo(this, linkname, {custpk: pk})
        }
      }
    }
  }
</script>
