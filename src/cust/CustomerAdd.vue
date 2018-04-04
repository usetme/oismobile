<template>
  <div class="pagecontent">
    <div id="popdiv"></div>
    <x-input title="客户姓名" v-model="mm.Name"></x-input>
    <cell title="性别">
      <checker v-model="mm.Sex" default-item-class="check-item" selected-item-class="check-item-selected">
        <checker-item v-for="sex in ['男','女']" :value="sex">{{sex}}</checker-item>
      </checker>
    </cell>
    <x-input title="手机号码" is-type="china-mobile" name="mobile" keyboard="number" v-model="mm.Mobile"></x-input>
    <x-address title="地址" v-model="simpleaddress" :list="addressData" :placeholder="addressholder"></x-address>
    <group title="详细地址">
      <x-textarea v-model="mm.Address"></x-textarea>
    </group>
    <p class="btn">
      <x-button plain type="primary" @click.native="btnsave">确定</x-button>
    </p>
  </div>
</template>
<script>
  import u from '../js/utility'
  import {ChinaAddressData, Value2nameFilter as value2name} from 'vux'
  export default{
    data () {
      return {
        mm: {},
        addressData: ChinaAddressData,
        simpleaddress: [],
        addressholder: '-请选择-'
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '客户管理', false, '客户新增')
      })
    },
    activated: function () {
      let that = this
      let pk = u.routepk(that, 'pk')
      u.getmodel(that, 'Customer', pk).then(function (r) {
        if (r.ok) {
          that.mm = r.data
          if (pk === '') {
            that.addressholder = '-请选择-'
          } else {
            that.addressholder = that.mm.Province + ' ' + that.mm.City + ' ' + that.mm.Area
          }
        } else {
          u.alert(that, r.message)
        }
      })
    },
    mounted: function () {
      let div = document.querySelectorAll('.vux-popup-dialog, .vux-popup')[0]
      document.getElementById('popdiv').appendChild(div)
    },
    methods: {
      btnsave: function () {
        let that = this
        if (that.addressholder !== '[-请选择-]') {
          let a = value2name(that.simpleaddress, ChinaAddressData).split(' ')
          console.log(that.addressholder)
          that.mm.Province = a[0]
          that.mm.City = a[1]
          that.mm.Area = a[2]
        } else {
          let a = that.addressholder.split(' ')
          that.mm.Province = a[0]
          that.mm.City = a[1]
          that.mm.Area = a[2]
        }
        u.getdata(that, 'Customer', 'AddUpdate', that.mm).then(function (r) {
          if (r.ok) {
            u.routerback(that, true, '保存成功', 200)
          } else {
            u.alert(that, r.message)
          }
        })
      }
    }
  }
</script>

