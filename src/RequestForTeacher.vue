<template>
  <div class="request">
    <sticky>
      <x-header>经销商满意度调查</x-header>
    </sticky>
    <div class="warp">
      <div class="request_content">
        <p class="request_content_title">
          以下为针对推广经理/讲师服务市场的满意度调研，每项满分5分，评分等级：非常满意5分，比较满意4.5分，基本满意4.0分，需要改进3.0，不满意1.0分。
        </p>
        <div class="request_content_querstion">
          <div class="question_card">
            <span>1、您认为他/她对于产品知识的熟练度和专业度如何</span>
            <div class="question_checker">
              <checker v-model="mm.Item8" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
                <checker-item :value="i" v-for="(i,index) in score">{{ i }}分</checker-item>
              </checker>
            </div>
          </div>
          <div class="question_card">
            <span>2、您认为他/她在现场的授课技能如何</span>
            <div class="question_checker">
              <checker v-model="mm.Item9" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
                <checker-item :value="i" v-for="(i,index) in score">{{ i }}分</checker-item>
              </checker>
            </div>
          </div>
          <div class="question_card">
            <span>3、您认为他/她重点服务您所在市场活动的成效与结果如何</span>
            <div class="question_checker">
              <checker v-model="mm.Item10" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
                <checker-item :value="i" v-for="(i,index) in score">{{ i }}分</checker-item>
              </checker>
            </div>
          </div>
          <div class="question_card">
            <span>4、您认为他/她对于本行业及企业的系统营销能力掌握程度如何</span>
            <div class="question_checker">
              <checker v-model="mm.Item11" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
                <checker-item :value="i" v-for="(i,index) in score">{{ i }}分</checker-item>
              </checker>
            </div>
          </div>
          <div class="question_card">
            <span>5、您认为他/她给予您市场运营管理的指导与建议如何</span>
            <div class="question_checker">
              <checker v-model="mm.Item12" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
                <checker-item :value="i" v-for="(i,index) in score">{{ i }}分</checker-item>
              </checker>
            </div>
          </div>
          <div class="question_card">
            <span>6、您认为他/她解决市场问题的及时性、有效性如何</span>
            <div class="question_checker">
              <checker v-model="mm.Item13" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
                <checker-item :value="i" v-for="(i,index) in score">{{ i }}分</checker-item>
              </checker>
            </div>
          </div>
          <div class="question_card">
            <span>7、您认为他/她解决市场问题的及时性、有效性如何</span>
            <div class="question_checker">
              <checker v-model="mm.Item14" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
                <checker-item :value="i" v-for="(i,index) in score">{{ i }}分</checker-item>
              </checker>
            </div>
          </div>
          <div class="question_card">
            <span>8、您对于他/她的其他建议或意见</span>
            <x-textarea  :show-counter="false" :rows="3" autosize v-model="mm.Memo2"></x-textarea>
          </div>
        </div>
        <x-button type="primary" @click.native="btnsave" class="mybtn2">确认</x-button>
        <div style="height: 50px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import u from './js/utility'
  export default {
    data () {
      return {
        mm: {},
        score: [5, 4.5, 4, 3, 1]
      }
    },
    activated () {
      let that = this
      u.getmodel(that, 'CustomerVote', that.$route.query.pk_CustomerVote).then(function (r) {
        if (r.ok) {
          that.mm = r.data
        } else {
          u.alert(that, r.message)
        }
      })
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '')
      })
    },
    computed: {
      total: {
        get: function () {
          let that = this
          return (that.mm.Item8 + that.mm.Item9 + that.mm.Item10 + that.mm.Item11 + that.mm.Item12 + that.mm.Item13 + that.mm.Item14)
        },
        set: function (newValue) {
        }
      }
    },
    methods: {
      btnsave () {
        let that = this
        let arr = [that.mm.Item8, that.mm.Item9, that.mm.Item10, that.mm.Item11, that.mm.Item12, that.mm.Item13, that.mm.Item14]
        for (let i in arr) {
          if (arr[i] === 0) {
            return u.alert(that, '第' + (parseInt(i) + 1) + '项没有填写!')
          }
        }
        that.mm.pk_Employee = that.$route.query.name
        that.mm.pk_Customer = that.$route.query.pk_Customer
        that.mm.pk_CustomerVote = that.$route.query.pk_CustomerVote
        that.mm.Total = that.total
        u.getdata(that, 'CustomerVote', 'AddUpdate', that.mm).then(function (r) {
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
