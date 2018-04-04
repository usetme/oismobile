<template>
  <div class="request">
    <sticky>
      <x-header>经销商满意度调查</x-header>
    </sticky>
    <div class="warp">
      <div class="request_content">
        <p class="request_content_title">
          以下为针对大区整体及大区经理服务市场的满意度调研，每项满分5分，评分等级：非常满意5分，比较满意4.5分，基本满意4.0分，需要改进3.0分，不满意1.0分。
        </p>
        <div class="request_content_querstion">
          <div class="question_card">
            <span>1、大区制定与推进的有关您市场各项计划(月/季/年)的合理性</span>
            <div class="question_checker">
            <checker v-model="mm.Item1" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
              <checker-item :value="i" v-for="(i,index) in score">{{ i }}分</checker-item>
            </checker>
            </div>
          </div>
          <div class="question_card">
            <span>2、大区解读与制定的各项营销政策、方法的准确性与适用性</span>
            <div class="question_checker">
              <checker v-model="mm.Item2" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
                <checker-item :value="i" v-for="(i,index) in score">{{ i }}分</checker-item>
              </checker>
            </div>
          </div>
          <div class="question_card">
            <span>3、大区安排的有关您市场各项培训与学习的满意度</span>
            <div class="question_checker">
              <checker v-model="mm.Item3" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
                <checker-item :value="i" v-for="(i,index) in score">{{ i }}分</checker-item>
              </checker>
            </div>
          </div>
          <div class="question_card">
            <span>4、大区给予您市场运营管理的指导与建议</span>
            <div class="question_checker">
              <checker v-model="mm.Item4" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
                <checker-item :value="i" v-for="(i,index) in score">{{ i }}分</checker-item>
              </checker>
            </div>
          </div>
          <div class="question_card">
            <span>5、大区总体的工作效率与工作态度</span>
            <div class="question_checker">
              <checker v-model="mm.Item5" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
                <checker-item :value="i" v-for="(i,index) in score">{{ i }}分</checker-item>
              </checker>
            </div>
          </div>
          <div class="question_card">
            <span>6、大区给予您市场日常营销支持的频率与实际取得的成效</span>
            <div class="question_checker">
              <checker v-model="mm.Item6" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
                <checker-item :value="i" v-for="(i,index) in score">{{ i }}分</checker-item>
              </checker>
            </div>
          </div>
          <div class="question_card">
            <span>7、大区给予您市场有关市场大活动的组织与协调</span>
            <div class="question_checker">
              <checker v-model="mm.Item7" radio-required default-item-class="demo2-item" selected-item-class="demo2-item-selected">
                <checker-item :value="i" v-for="(i,index) in score">{{ i }}分</checker-item>
              </checker>
            </div>
          </div>
          <div class="question_card">
            <span>8、您对于大区的其他建议或意见</span>
            <x-textarea  :show-counter="false" :rows="3" autosize v-model="mm.Memo1"></x-textarea>
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
          return (that.mm.Item1 + that.mm.Item2 + that.mm.Item3 + that.mm.Item4 + that.mm.Item5 + that.mm.Item6 + that.mm.Item7)
        },
        set: function (newValue) {
        }
      }
    },
    methods: {
      btnsave () {
        let that = this
        let arr = [that.mm.Item1, that.mm.Item2, that.mm.Item3, that.mm.Item4, that.mm.Item5, that.mm.Item6, that.mm.Item7]
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
<style>
  #printword{
    color:#fff
  }
  .saying:after {
    content: "|";
    font-family: Arial, sans-serif;
    font-size: 1.2em;
    line-height: 0;
    display: inline-block;
    vertical-align: baseline;
    opacity: 1;
    animation: caret 500ms infinite;
  }
  .request{
    height: 100%;
    width: 100%;
  }
  .request .demo2-item {
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    display: inline-block;
    border-radius: 50%;
    line-height: 40px;
    text-align: center;
  }
  .demo2-item-selected {
    border-color: transparent !important;
    background: rgb(232, 54, 50) !important;
    color:#fff;
    font-weight: bold;
  }
  .request .warp {
    padding-bottom: 50px;
    height: 100%;
  }
  .request .requset_title{
    display: none;
  }
  .request .requset_title,#printword {
    min-height: 155px;
    padding-top: 74px;
    background-image: url("assets/img/questbg2.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    text-align: center;
    color: #fff;
    font-size: 15px;
    font-weight: bold
  }
  .request .requset_title span{
    text-indent:25px;
    letter-spacing: 0.5px;
    font-family: cursive;
    display: block;
    padding:5px;
    font-size: 18px;
    color:#fff
  }
  .request .request_content{
    padding-top:10px;
    background-image: url("assets/img/questbg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    background-color: #e83632;
  }
  .request .request_content .request_content_title{
    text-indent:25px;
    color: #333;
  }
  #app .request .weui-cells__title {
    color: azure;
    font-weight: bold;
  }

  #app .request .weui-cell, .request .weui-cells {
    background: transparent;
  }

  .request .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before {
    color: #58B7FF;
  }

  .request .weui-cell:before {
    display: none
  }

  #app .request .vux-tap-active {
    padding: 0
  }

  .request .vux-checker-item {
    margin: 5px 10px;
  }

  .request .vux-checker-item:last-child, .request .vux-checker-item:first-child {
    margin-right: 0
  }

  #app .request .vux-x-textarea {
    border-bottom: none;
  }

  #app .request .vux-tap-active {
    margin-right: 5%
  }
  #app  .request .mybtn2{
    background-color:rgb(232, 54, 50)
  }
  #app .request .vux-tap-active:last-child {
    margin-right: 0
  }

  .request .vux-checker-box {
    width: 326px;
  }

  .request .question_card {
    margin-top: 20px;
    padding: 4px;
  }

  .request .question_checker {
    text-align: -webkit-center
  }

  .request .question_card span {
    padding-left:10px;
    text-align: inherit;
    font-size: 18px;
    color:#333;
    font-weight: bold;
  }

  .request textarea {
    background: transparent;
    border: 1px solid rgb(232, 54, 50);
    color: #333
  }
</style>
