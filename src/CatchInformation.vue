<template>
  <div class="catchinformation">
      <div class="catch_head">
        <img src="./assets/img/logo1.png" style="width: 40%;margin-right: 8%;margin-left:2%">
        <div class="tips">
            <span>留下您的信息，</span>
            <span>让德源做您的健康专家~</span>
        </div>
      </div>
      <div class="catch_table">
        <x-input title="姓名" v-model="mm.name"></x-input>
        <x-input type="number" title="年龄" v-model="mm.age"></x-input>
        <div class="catch_line"></div>
        <div style="padding:10px 15px;">
          <span>性别</span>
        <checker v-model="mm.sex" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
          <checker-item value="nan">男</checker-item>
          <checker-item value="nv">女</checker-item>
        </checker>
        </div>
        <x-input type="number" title="电话" v-model="mm.mobile"></x-input>
        <x-address title="居住城市" v-model="cityaddress" :list="addressData" placeholder="-请选择-" class="address"></x-address>
        <div class="catch_line"></div>
        <div style="padding:10px 15px;">
          <span>职业</span>
          <checker v-model="mm.job" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
            <checker-item value="retire">退休</checker-item>
            <checker-item value="civilservant">公务员</checker-item>
            <checker-item value="manager">企业管理人员</checker-item>
            <checker-item value="worker">职员</checker-item>
            <checker-item value="boss">私营业主</checker-item>
            <checker-item value="other">其他</checker-item>
          </checker>
        </div>
        <x-input title="您曾用过哪些硒产品" v-model="mm.product"></x-input>
        <x-input title="您的问题和建议" v-model="mm.Memo1"></x-input>
        <div class="catch_line"></div>
        <h3 class="catch_h3">关于您的需求，我们会根据您的信息并进行综合分析后，尽快和您取得联系。德源，致力于成为您的家庭健康专家！</h3>
        <x-button type="primary" @click.native="btnsave" class="mybtn2" style="margin-top: 10px">提交</x-button>
      </div>
  </div>
</template>

<script>
  import {ChinaAddressData, Value2nameFilter as value2name} from 'vux'
  import cityjson from './assets/city.json'
  import u from './js/utility'

  export default {
    data () {
      return {
        mm: {},
        cityaddress: [],
        addressData: cityjson
      }
    },
    mounted () {
      this.mm = {}
      this.cityaddress = []
    },
    methods: {
      btnsave () {
        let that = this
        // let address = value2name(this.cityaddress, ChinaAddressData).split(' ')
        // this.mm.privince = address[0]
        // this.mm.city = address[1]
        // this.mm.area = address[2]
        u.getdata(that, 'CustomerDetail', 'AddUpdate', that.mm).then(function (r) {
          if (r.ok) {
            // u.toast(that, '添加成功,两秒后自动关闭')
            setTimeout(function () {
              // that.$wechat.closeWindow()
            }, 2000)
          } else {
            u.alert(that, r.message)
          }
        })
      }
    }
  }
</script>
<style>
  .catchinformation{
    overflow: hidden;
  }
.catchinformation .demo1-item {
  border: 1px solid #eee;
  padding: 5px 15px;
}
.catchinformation .demo1-item-selected {
  border: 1px solid #58B7FF;
}
  .catchinformation .weui-label{
    font-size: 14px;
  }
  .catchinformation .weui-cells{
    margin-top:0px
  }
  #app .weui-cell, .weui-cell{
    background-color: transparent;
  }
  .catchinformation .vux-checker-box{
    width: 80%;
    vertical-align: bottom;
    display: inline-block;
    margin-left: 4%;
  }
  #app .catchinformation  .vux-tap-active{
    border-radius: 0;
  }
.catchinformation .weui-input{
  text-align: right;
}
  .catch_h3{
    text-align: center;
    font-size: 13px;
  }
  .catch_line{
    height: 10px;
    background-color:#fff
  }
  .catch_head{
    overflow: hidden;
  }
  .catch_head img,.catch_head .tips{
    float: left;
  }
  .catch_head .tips{
    width: 50%;
    padding-top: 4%;
    font-size: 13px;
  }
  .catch_head .tips span{
    display: block;
  }
</style>
