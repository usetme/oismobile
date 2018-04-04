<template>
  <div class="pagecontent">
    <sticky><x-header>经销商</x-header></sticky>
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
              height="-80">
      <div class="cardcontent">
        <card v-for="r in tabledata.rows" @click="btnlink('sdeCustomerView',{pk:r.pk})">
          <div slot="content" class="cardcontent othercard">
            <div class="cardname">
              <img src="../assets/img/cust.png">
              <div class="nameandtel">
                <div class="spanwhite">{{r.Name}}</div>
                <div v-if="r.Mobile!==''||r.Tel!==''" class="card_style">{{r.Mobile}}{{r.Tel}}</div>
              </div>
            </div>
            <div class="card_content">
              <x-button @click.native="btnlink('sdeMeeting',{pk:r.pk})">会议安排</x-button>
              <x-button @click.native="btnlink('SalePlanDetail',{pk:r.pk,name:r.Name})">回款情况</x-button>
              <div v-if="r.Province!==''" class="card_address">{{r.Province}}{{r.City}}{{r.Address}}</div>
            </div>
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
        querypk: '6db37ba3-438c-427d-ae8d-a6e200c32f8b',
        selectvalue: ' ,'
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        u.routeinit(vm, '')
      })
    },
    methods: {
      btnquery () {
        let that = this
        let vals = this.selectvalue.split(',')
        this.querylist = []
        if (vals[1].lastIndexOf('|') > 0) {
          u.addwhere(this, 'querylist', 'and', '', 'Employee.pk_Dept', 'SonDept', vals[0], '')
        } else {
          u.addwhere(this, 'querylist', 'and', '', 'Employee.pk_Employee', '=', vals[1], '')
        }
        u.vuxquerypage(this, false)
        u.vuxquerypage(that, false)
      },
      btnlink (linkname, pk) {
        let that = this
        u.routergo(that, linkname, pk)
      },
      loadMore () {
        u.vuxquerypage(this, true)
      }
    }
  }
</script>
<style>
  #app .othercard {
    overflow: inherit
  }
  #app .othercard .cardname{
    overflow: inherit;
    width:200px;
  }
  #app .othercard .cardname .nameandtel{width: 110px}
</style>
