<template>
  <div class="csearch">
    <div class="customer-outside" @click="btncloseoutside" v-show="datashow!==0"></div>
    <div class="inputdiv">
      <x-input placeholder="客商查询..." class="csearch_input"  @on-focus="onFocus" ref="csearch" v-model="custmer_name"></x-input>
      <img src="../assets/img/icon_search.png" alt="">
    </div>
    <div class="csearch_condition">
      <p @click="btndatashow(1)"><span>{{area}}</span></p>
      <p @click="btndatashow(3)" class="csearch_dept"><span>{{area2}}</span></p>
      <p @click="btndatashow(2)"><span>{{area1}}</span></p>
      <p @click="btncloseout" class="btnclose" v-show="datashow===0"><span>关闭窗口</span></p>
      <checker v-model="area" radio-required default-item-class="demo1-item" @on-change="deptchange" selected-item-class="demo1-item-selected" v-show="datashow==1">
        <checker-item :value="i" v-for="(i,index) in arealist" :key="i">{{i}}</checker-item>
      </checker>
      <checker v-model="area1" radio-required default-item-class="demo1-item" selected-item-class="demo1-item-selected" v-show="datashow==2">
        <checker-item :value="i" v-for="(i,index) in arealist1" :key="i">{{i}}</checker-item>
      </checker>
      <checker v-model="area2" radio-required default-item-class="demo1-item" selected-item-class="demo1-item-selected" v-show="datashow==3">
        <checker-item :value="i" v-for="(i,index) in arealist2" :key="i">{{i}}</checker-item>
      </checker>
      <div class="csearch_btngroup" v-show="datashow!==0">
        <x-button @click.native="btnreload">重置</x-button>
        <x-button @click.native="btnsave">确定</x-button>
      </div>
    </div>
    <div class="customer_content">
      <card v-for="r in datalist.rows" class="custmer_content" @click.native="btnchosevalue(r)">
        <div slot="content" class="cardcontent">
          <div class="cardname">
            <img src="../assets/img/cust.png">
            <div class="nameandtel">
              <div class="spanwhite">{{r.Name}}</div>
              <div>{{r.Mobile}}</div>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
  import u from '../js/utility'
  import $ from 'jquery'
  export default {
    data () {
      return {
        datashow: 0,
        custmer_name: '',
        area: '按部门(大区)',
        area1: '按员工',
        area2: '按大区下省份',
        datalist: [],
        arealist: ['南部大区', '东部大区', '西部大区', '北部大区', '中部大区'],
        arealist1: ['毕胜', '封钦行', '张伟', '杨胜虎', '崔庆锁'],
        arealist2: ['底特律', '四川省', '弗罗里达', '江苏省', '香港', '台湾澳门', '拉斯维加斯']
      }
    },
    watch: {
      datashow (val) {
        if (val !== 0) {
          $('.csearch .customer_content').css({overflowY: 'hidden'})
        } else {
          $('.csearch .customer_content').css({overflowY: 'auto'})
        }
      }
    },
    mounted: function () {
      let that = this
      $(document).ready(function () {
        $('.csearch_condition p').click(function () {
          $(this).find('span').attr('class', 'bordernone')
          $(this).siblings().find('span').removeClass('bordernone')
          if (that.datashow === 0) {
            $('.csearch_condition p').find('span').removeClass('bordernone')
            return
          }
        })
      })
      u.querywhere(that, 'caffdf70-2bff-444a-9158-a6aa00dd957b', []).then(function (r) {
        that.datalist = r.data
      })
    },
    methods: {
      btndatashow (num) {
        this.datashow === num ? this.datashow = 0 : this.datashow = num
      },
      btncloseout () {
        this.btnreload()
        $('.csearch').removeClass('search-focused')
        $('.custmer_content,.csearch_condition,.customer_content').hide()
      },
      btncloseoutside () {
        this.datashow = 0
        $('.csearch_condition p').find('span').removeClass('bordernone')
      },
      btnreload () {
        this.datashow = 0
        this.area = '按部门(大区)'
        this.area1 = '按员工'
        this.area2 = '按大区下省份'
        $('.csearch_condition p').find('span').removeClass('bordernone')
      },
      deptchange () {
        $('.csearch_dept').trigger('click')
      },
      onFocus () {
        let that = this
        $('.csearch').addClass('search-focused')
        setTimeout(function () {
          that.$refs.csearch.blur()
          $('.custmer_content,.csearch_condition,.customer_content').show()
        }, 200)
      },
      btnchoosequery () {
        $('.customer_choosediv').animate({right: '10%'})
      },
      btnchosevalue (val) {
        this.custmer_name = val.Name + ' ' + val.Mobile
        this.btncloseout()
      },
      btnsave () {
        $('.csearch_condition p').find('span').removeClass('bordernone')
        this.datashow = 0
      }
    }
  }
</script>
<style>
  .csearch{
    background-color: #f8f8f8;
  }
  .csearch .custmer_content {
    display: none
  }

  .csearch .bordernone {
    padding-bottom:12px;
    border:2px solid #eee !important;
    background-color: #fff !important;
    border-bottom-color: transparent !important;
  }
  .csearch .customer_choosediv {
    box-shadow: -10px 10px 60px #58B7FF;
    z-index: 99;
    height: 100%;
    width: 70%;
    position: fixed;
    top: 0;
    right: 110%;
    border-left: 1px solid #eee;
    background: rgba(255, 255, 255, 0.9);
  }

  .csearch  .customer-outside {
    z-index: 998;
    height: 100%;
    width: 100%;
    position: fixed;
    left:0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .csearch .custmer_table {
    z-index: 10;
    overflow-y: auto;
    height: 100%;
    width: 90%;
    position: fixed;
    top: 0;
    right: 100%;
    background-color: #fff;
  }

  .csearch .customer_content {
    overflow-y: auto;
    height: 100%;
    padding-top: 50px;
    display: none;
  }

  .csearch.custmer_img {
    height: 18px;
    position: fixed;
    top: 0;
    z-index: 99;
    right: 100%;
  }

  .csearch .custmer_img img {
    display: inline-block;
    width: 14px;
  }

  .csearch .custmer_img span {
    height: 18px;
    line-height: 18px;
    display: inline-block;
    font-size: 13px;
  }

  .csearch .customer_card {
    font-size: 13px;
    padding: 8px 10px;
    background-image: url("../assets/img/cust.png");
    background-size: 20px 20px;
    background-position-y: 7px;
    background-position-x: 4px;
    padding-left: 30px;
    background-repeat: no-repeat;
  }

  .csearch .customer_card .name {
    font-size: 14px;
    width: 60px;
    display: inline-block;
  }

  .csearch .vux-checker-box {
    z-index: 100000000;
    position: relative;
    background-color: #fff;
    overflow: hidden;
  }

  .csearch .vux-checker-item {
    border-radius:0;
    width: 40%;
    display: inline-block;
    background-color: inherit;
    border-bottom: solid 1px #fff;
    float: left;
    padding: 10px;
    margin: 5px;
  }

  .csearch .demo1-item {
    border-color:transparent;
    padding: 5px 15px;
  }

  .csearch .demo1-item-selected {
    border: 1px solid #58B7FF;
  }


  .csearch .custmer_floorname {
    font-size: 15px;
    padding: 5px 10px;
  }

  .csearch .vux-tap-active {
    font-size: 12px
  }

  .csearch_btngroup {
    background-color: #fff;
    clear: both;
  }

  .csearch_btngroup .weui-btn {
    border:none;
    float: left;
    background-color: #fff;
    border-top:1px solid #eee;
    height: 3.3em;
    line-height: 3.3;
    width: 50%;
    border-radius: 0;
  }
  .csearch_btngroup .weui-btn:after{
    display: none;
  }
  .csearch_btngroup .weui-btn + .weui-btn {
    margin-top: 0;
    background-color: #58B7FF;
    color: #fff;
  }

  .csearch .weui-btn:after {
    /*display: none;*/
  }

  .csearch .customer_choosediv_card {
    margin-top: 10px;
    overflow: hidden;
  }
  .csearch .customer_choosediv_card .csearchinput{
    display: -webkit-box;
    width: 88%;
    border: 1px solid #d5d5d5;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    font-size: 12px;
    -webkit-box-align: center;
  }
  .csearch .customer_choosediv_card .csearchinput .weui-cell__bd{
    width: 88%;
  }
  .csearch  .customer_choosediv_card .weui-cell{
    padding:5px 15px
  }
  .csearch .customer_choosediv_card_input{
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }

  .csearch .inputdiv {
    z-index: 999;
    position: relative;
    /*position: fixed;*/
    top: 0;
    display: inline-block;
    width: 100%;
  }

  #app .csearch .csearch_input {
    background-color: #EFEFF4;
    height: 1em;
  }
  #app .csearch .csearch_input .weui-input{
    text-align: left;
    margin-left: 0;
    padding-left:10%;
    display: -webkit-box;
    width: 90%;
    border-radius: 16px;
    height: 32px;
    overflow: hidden;
    background: #fff;
    font-size: 12px;
    -webkit-box-align: center;
  }
  #app .csearch  .csearch_input .weui-cell__hd{
    display: none !important;
  }
  .csearch .inputdiv img{
    width: 18px;
    position: absolute;
    top: 28%;
    left: 6%;
  }
  #app .csearch .vux-tap-active{
    padding:0 10px
  }
  .search-focused{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 999999;
  }















  /*---------------------------------------------------------------------宇宙分割线----------------------------------------------------------------------*/
  .csearch_condition{
    display: none;
    top:46px;
    z-index:999;
    clear: both;
    border-bottom:1px solid #eee;
    width: 100%;
    height: 42px;
    line-height: 42px;
    position: fixed;
    font-size: 0;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff
  }
  .csearch_condition p{
    width: 25%;
    display: inline-block;
    padding: 0 6px;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    margin: 7px 0;
    vertical-align: middle;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
  }
  .csearch_condition .btnclose span{
    border:1px solid #58B7FF;
    color:#58B7FF
  }
  .csearch_condition p span{
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    width: 200%;
    color: #232326;
    height: 200%;
    background-color: #f0f2f5;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    border: solid 1px #f0f2f5;
    -moz-transform: scale(.5, .5);
    -ms-transform: scale(.5, .5);
    -webkit-transform: scale(.5, .5);
    transform: scale(.5, .5);
    -moz-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    font-size: 24px;
    line-height: 54px;
    vertical-align: middle;
  }
  .csearch .nameandtel{
    width: 200px;
  }
</style>
