<template>
  <div class="search">
    <div class="custmer_img" @click="btnchoosequery"><span>筛选</span><img src="../assets/img/chose.png"></div>
    <div class="search_div">
      <x-input title="客商选择" placeholder="请选择客商信息..." :disabled="disabled"  @on-focus="onFocus" ref="search" v-model="textshow"></x-input>
      <!--<img src="../assets/img/icon_search.png" alt="">-->
    </div>
    <div class="customer_outside" @click="btncloseout"></div>
    <div class="customer_choosediv">
      <img src="../assets/img/close2.png" class="btnclose" @click="btncancel">
      <div class="customer_choosediv_card">
        <div class="custmer_floorname">可直接输入客商名称查询</div>
        <x-input class="searchinput" v-model="cc.customer"></x-input>
      </div>
      <div class="customer_choosediv_card">
        <p class="carline"></p>
        <div class="custmer_floorname">按部门(大区)</div>
        <checker v-model="cc.dept" radio-required default-item-class="demo1-item" selected-item-class="demo1-item-selected">
          <checker-item :value="i" v-for="(i,index) in arealist" :key="i">{{i}}</checker-item>
        </checker>
        <p class="carline"></p>
      </div>
      <div class="customer_choosediv_card">
        <div class="custmer_floorname">按员工</div>
        <checker v-model="cc.empolyee" radio-required default-item-class="demo1-item" selected-item-class="demo1-item-selected">
          <checker-item :value="i" v-for="(i,index) in arealist1" :key="i">{{i}}</checker-item>
        </checker>
        <p class="carline"></p>
      </div>
      <!--<div class="customer_choosediv_card">-->
        <!--<div class="custmer_floorname">按省份</div>-->
        <!--<checker v-model="cc.province" radio-required default-item-class="demo1-item" selected-item-class="demo1-item-selected">-->
          <!--<checker-item :value="i" v-for="(i,index) in arealist2" :key="i">{{i}}</checker-item>-->
        <!--</checker>-->
        <!--<p class="carline"></p>-->
      <!--</div>-->
      <div class="search_btngroup">
        <x-button @click.native="cc={}">重置</x-button>
        <x-button @click.native="btnsave">确定</x-button>
      </div>
    </div>
    <div class="custmer_table">
      <div v-for="(r,index) in datalist.rows" class="customer_card" @click="btnchosevalue(r)">
        <span class="name">{{r.Name}}</span>
        <span class="mobile">{{r.Mobile}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import u from '../js/utility'
  import $ from 'jquery'
  export default {
    props: {
      disabled: {type: Boolean},
      value: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        cc: {},
        querylist: [],
        currentvalue: this.value,
        textshow: '',
        datalist: [],
        arealist: ['南部大区', '河南大区', '西北大区', '东北大区', '中部大区'],
        arealist1: ['毕胜', '封钦行', '张伟', '杨胜虎', '崔庆锁'],
        arealist2: ['四川省', '江苏省']
      }
    },
    activated: function () {
      this.cc = {}
      $('.custmer_table,.custmer_img,.customer_choosediv').animate({right: '110%'})
      setTimeout(function () {
        $('.customer_outside').hide()
      }, 500)
      this.querylist = []
      this.btnquery()
    },
    watch: {
      textshow (newValue) {
        let that = this
        if (newValue === '' || newValue === null) {
          that.currentvalue = ''
        }
        if (u.isnullorwhitespace(newValue)) {
          this.$emit('input', '')
        }
      },
      value (val, oldValue) {
        let that = this
        if (val !== that.currentvalue) {
          that.currentvalue = val
          if (!u.isnullorwhitespace(this.currentvalue)) {
            u.getmodelcachef(that, 'Customer', that.currentvalue, that.showtext)
          } else {
            that.textshow = ''
          }
        }
      }
    },
    methods: {
      btncancel () {
        $('.customer_choosediv').animate({right: '110%'})
        this.cc = {}
      },
      btncloseout () {
        $('.custmer_table,.custmer_img,.customer_choosediv').animate({right: '110%'})
        setTimeout(function () {
          $('.customer_outside').hide()
        }, 500)
      },
      onFocus () {
        let vuxheader = document.getElementsByClassName('vux-header')[0]
        this.$refs.search.blur()
        $('.customer_outside').show()
        setTimeout(function () {
          $('.custmer_table').animate({right: '10%'})
        }, 200)
        setTimeout(function () {
          $('.custmer_img').animate({right: '60px'})
        }, 500)
      },
      btnchoosequery () {
        $('.customer_choosediv').animate({right: '10%'})
      },
      btnchosevalue (val) {
        this.$emit('input', val.pk)
        this.textshow = val.Name + ' ' + val.Mobile
        this.btncloseout()
      },
      showtext (data) {
        if (!u.isnullorwhitespace(data)) {
          this.textshow = `${data.Name} ${(data.Mobile === '' || data.Mobile === null) ? '' : '手机:' + data.Mobile} `
        } else {
          this.textshow = '错误'
        }
      },
      btnquery () {
        let that = this
        u.querywhere(that, '6db37ba3-438c-427d-ae8d-a6e200c32f8b', that.querylist).then(function (r) {
          if (r.data.rows.length === 0) {
            u.message(that, '该条件组查不到数据,重新添加条件!', 'message')
            that.cc = {}
          } else {
            that.datalist = r.data
          }
        })
      },
      btnsave () {
        let that = this
        this.querylist = [{
          'Field': 'Dept.Name',
          'Condition': 'like',
          'Value': that.cc.dept
        }, {
          'Field': 'Employee.Name',
          'Condition': 'like',
          'Value': that.cc.empolyee
        }, {
          'Field': 'Customer.Province',
          'Condition': 'like',
          'Value': that.cc.province
        }, {
          'Field': 'Customer.Name',
          'Condition': 'like',
          'Value': that.cc.customer
        }]
        that.btnquery()
        $('.customer_choosediv').animate({right: '110%'})
      }
    }
  }
</script>
<style>
  .pagecontent .customer_choosediv_card .weui-input {
    text-align: left;
    margin-left: 0
  }
  .pagecontent .customer_choosediv_card .weui-input::-webkit-input-placeholder{
    color:#888
  }
  .customer_choosediv {
    padding-top: 50px;
    box-shadow: -10px 10px 60px #000;
    z-index: 9999;
    height: 100%;
    width: 70%;
    position: fixed;
    top: 0;
    right: 110%;
    border-left: 1px solid #eee;
    background: rgba(255, 255, 255, 1);
  }

  .search .customer_outside {
    z-index: 1000;
    display: none;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .search .custmer_table {
    padding-top: 50px;
    z-index: 1000;
    overflow-y: auto;
    height: 93%;
    width: 90%;
    position: fixed;
    top: 0;
    right: 100%;
    background-color: #fff;
  }

  .custmer_img {
    height: 18px;
    position: fixed;
    top: 50px;
    z-index: 9999;
    right: 100%;
  }

  .custmer_img img {
    display: inline-block;
    width: 14px;
  }
  .search .btnclose{
    width: 20px;
    position: absolute;
    right: 2%;
    top:8%
  }
  .custmer_img span {
    height: 18px;
    line-height: 18px;
    display: inline-block;
    font-size: 13px;
  }

  .customer_card {
    min-height: 30px;
    border-bottom:1px dashed #eee;
    font-size: 13px;
    padding: 8px 10px;
    background-image: url("../assets/img/cust.png");
    background-size: 40px;
    background-position-y: 7px;
    background-position-x: 4px;
    padding-left: 60px;
    background-repeat: no-repeat;
  }

  .customer_card .name {
    color: #f23030;
    font-size: 16px;
    width: 100%;
    display: inline-block;
  }

  .vux-checker-item {
    padding: 10px;
    float: left;
    border-radius: 10px;
    background-color: #f0f2f5;
    margin: 5px;
  }

  .demo1-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
  }

  .demo1-item-selected {
    border: 1px solid #58B7FF;
  }

  .custmer_floorname {
    font-size: 15px;
    padding: 5px 10px;
  }

  .vux-tap-active {
    font-size: 12px
  }

  .search_btngroup {
    padding-top: 30px;
    clear: both;
  }

  .search_btngroup .weui-btn {
    line-height: 44px;
    font-size: 14px;
    width: 50%;
    float: left;
    border-radius: 0;
  }

  .search_btngroup .weui-btn + .weui-btn {
    margin-top: 0;
    background-color: #58B7FF;
    color: #fff;
  }

  .search .weui-btn:after {
    display: none;
  }

  .customer_choosediv_card {
    margin-top: 10px;
    overflow: hidden;
  }
  .customer_choosediv_card .searchinput{
    width: 89%;
    /*border: 1px solid #d5d5d5;*/
    border-radius: 10px;
    overflow: hidden;
    background: #f0f2f5 !important;
    font-size: 12px;
    -webkit-box-align: center;
  }
  .customer_choosediv_card .searchinput .weui-cell__bd{
    width: 88%;
  }
  .customer_choosediv_card .weui-cell{
    padding:5px 15px
  }

  #app .search_input{
    background-color:#fff ;
    height: 1em;
  }
  #app .search_input .weui-input{
    padding-left:4%;
    display: -webkit-box;
    text-align: left;
    width: 70%;
    border-radius: 16px;
    height: 32px;
    margin-left: 0;
    overflow: hidden;
    background: #EFEFF4;
    font-size: 12px;
    -webkit-box-align: center;
  }
  #app .search_input .weui-cell__hd{
    display: none !important;
  }
  .search_div{
    position: relative;
  }
  .search_div img{
    width: 18px;
    position: absolute;
    top: 28%;
    left: 6%;
  }
  #app .search .vux-tap-active{
    padding:0 10px
  }
  .carline{
    background-color: #f8f8f8;
    height: 10px;
  }
  .vux-checker-box{
    overflow: hidden;
  }
  ::-webkit-input-placeholder {
    color: #999;
    font-weight: inherit;
    font-size: 14px;
  }
  .pagecontent .search .weui-input{
    margin-left: 0;
    font-size: 12px;
  }

</style>
