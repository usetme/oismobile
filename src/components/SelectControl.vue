<template>
  <div class="poppick_style">
  <popup-picker class="disinlineblock" :data="itemlists" :columns="columns" show-name v-model="currentvalue"></popup-picker>
  </div>
</template>

<script>
  import u from '../js/utility'
  export default {
    props: {
      value: {
        type: String,
        default: ' ,'
      },
      columns: {
        type: Number,
        default: 1
      },
      defaultvalue: Array,
      userdata: String,
      querypk: String,
      pk: String
    },
    data () {
      return {
        currentvalue: this.value,
        itemlists: [],
        enablechange: false
      }
    },
    watch: {
      value: function (val, oldValue) {
        if (u.isnullorwhitespace(val)) {
          val = ''
        }
        if (val.split(',') === this.currentvalue) {
          return
        }
        this.currentvalue = val.split(',')
      },
      currentvalue: function (val, oldValue) {
        if (oldValue === val) {
          return
        }
        this.valuechange(val)
      }
    },
    created: function () {
      if (!u.isnullorwhitespace(this.querypk)) {
        u.querydatacachef(this, 'QueryQuery', 'Query', {pk: this.querypk}, this.dataload, false)
      } else if (!u.isnullorwhitespace(this.pk)) {
        if (this.pk.indexOf('WhereEmployee') >= 0) {
          this.columns = 2
          u.querydatacachef(this, 'QueryQuery', 'ConsultItem', {pk: this.pk}, this.dataload, false)
        } else {
          u.querydatacachef(this, 'QueryQuery', 'Query', {
            pk: '687fdd76-42d6-4759-a8d7-a7b000e34458',
            lists: [{'Field': 'pk_Def', 'Parm': 'Y', 'Value': this.pk}]
          }, this.dataload, false)
        }
      } else {
        u.message('SelectControl缺少pk')
      }
    },
    mounted () {

    },
    methods: {
      valuechange: function (val) {
        if (this.enablechange) {
          this.$emit('change', val)
        }
        if (val.length === 1) {
          val = val[0]
        } else if (val.length === 2) {
          val = val[0] + ',' + val[1]
        }
        this.$emit('input', val)
      },
      dataload: function (data) {
        let that = this
        let rows = u.copyjson(data).rows
        that.enablechange = true
        if (that.columns === 1) {
          that.itemlists = [{value: '', name: '请选择'}].concat(rows)
          if (!u.isnullorwhitespace(that.defaultvalue)) {
            that.currentvalue = that.defaultvalue
          } else {
            that.currentvalue = ['']
          }
        } else if (that.columns === 2) {
          rows.forEach(function (e) {
            if (e.parent === '0') {
              e.parent = 0
            }
          })
          if (!u.isnullorwhitespace(that.pk) && that.pk.indexOf('WhereEmployee') > 0) {
            that.itemlists = [{value: ' ', name: '授权数据', parent: 0}, {value: '', name: '全部', parent: ' '}].concat(rows)
          } else {
            that.itemlists = [{value: ' ', name: '请选择', parent: 0}, {value: '', name: '请选择', parent: ' '}].concat(rows)
          }
          if (that.columns === 2) {
            that.currentvalue = [' ', '']
          } else if (!u.isnullorwhitespace(that.defaultvalue)) {
            that.currentvalue = that.defaultvalue
          } else {
            that.currentvalue = [' ', '']
          }
        } else {
          return
        }
      }
    }
  }
</script>
<style>
  .poppick_style{
    width: 100%;
    height: 40px;
    background-color: #fff;
  }
  .poppick_style  .vux-popup-picker-select span{
    font-size: 14px;
    color: #999;
    font-weight: inherit;
  }
  .poppick_style .vux-popup-picker-select-box.weui_cell_bd:after{
    border-width: 0px 1px 1px 0px;
    height: 4px;
    width: 4px;
    border-color:#58B7FF;
  }
</style>
