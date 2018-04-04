<template>
    <csearch
      v-model="textshow"
      placeholder="输入客商名称查找"
      @result-click="resultClick"
      :auto-fixed="false"
      :auto-scroll-to-top="true"
      @on-change="getResult"
      :results="results">
    </csearch>
</template>
<script>
  import u from '../js/utility'

  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        currentvalue: this.value,
        results: [],
        textshow: '',
        isclickpk: false
      }
    },
    watch: {
      textshow (newValue) {
        let that = this
        if (newValue === '' || newValue === null) {
          that.currentvalue = ''
        }
      },
      value (val, oldValue) {
        if (val !== this.currentvalue) {
          this.currentvalue = val
          this.getcustname()
        }
      }
    },
    methods: {
      resultClick (item) {
        this.textshow = item.title
        this.currentvalue = item.pk_customer
        this.getcustname()
        this.$emit('input', this.currentvalue)
        this.$emit('change', this.currentvalue)
      },
      getResult (val) {
        if (!this.isclickpk) {
          this.results = val ? this.getsearch(val) : []
        } else {
          this.isclickpk = false
        }
      },
      getsearch (val) {
        let rs = []
        let that = this
        u.querywhere(that, 'caffdf70-2bff-444a-9158-a6aa00dd957b', [{
          'Field': 'Customer.Name',
          'Condition': 'like',
          'Value': val
        }]).then(function (r) {
          if (r.ok) {
//            console.log(r.data)
            for (let row of r.data.rows) {
              rs.push({
                title: `${row.Name} ${(row.Mobile === '' || row.Mobile === null) ? '' : '手机:' + row.Mobile} `,
                pk_customer: row.pk
              })
            }
          } else {
            rs.push({
              title: r.message,
              pk_customer: ''
            })
          }
        })
        return rs
      },
      getcustname () {
        let that = this
        if (!u.isnullorwhitespace(this.currentvalue)) {
          u.getmodelcachef(that, 'Customer', this.currentvalue, this.showtext)
        } else {
          that.textshow = ''
        }
      },
      showtext (data) {
        if (!u.isnullorwhitespace(data)) {
          this.textshow = `${data.Name} ${(data.Mobile === '' || data.Mobile === null) ? '' : '手机:' + data.Mobile} `
        } else {
          this.textshow = '错误'
        }
      }
    }
  }
</script>
