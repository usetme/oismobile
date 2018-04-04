<template>
  <div class="transfer">
    <div class="twarp">
      <p id="printword"></p>
      <p class="requset_title">您好!非常感谢您对天脉德源的支持和信任!为了解您对大区及各级市场人员所提供市场支持与服务方面的满意程度，我们将开展满意度调研工作，您的任何意见和建议都是公司的宝贵财富，并将激励我们不断改进、提高，最终为您提供更好的支持和服务！</p>
      <div class="transfer_content">
        <div class="tips">您共有<span>{{tips.tiplength}}</span>个对象需要评价，已评价<span>{{tips.finisharr}}</span>个</div>
          <ul class="transfer_content_card">
            <li v-for="(i,index) in datalist" :class="i.pk_customervote===null?'nowrite':''">
              <p class="transfer_name">{{i.Name}}</p>
              <p class="transfer_score">({{i.total===null||0?0:i.total}}/35分)</p>
              <p class="transferbtn" v-if="i.pk_customervote!==null" @click="addupdate(i)">去编辑</p>
              <p class="transferbtn" v-else @click="addupdate(i)">去填写</p>
              <span v-if="i.pk_customervote!==null">已填写</span>
              <span v-else>未填写</span>
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
  import u from './js/utility'
  export default {
    data () {
      return {
        datalist: [],
        tips: {},
        querylist: [],
        ctimer: '',
        words: '',
        index: 0,
        useritem: JSON.parse(localStorage.getItem('user'))
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        u.routeinit(vm, '')
      })
    },
    activated () {
      let that = this
      let namearr = []
      let userdata = {
        msgid: that.$route.params.msgid,
        usercode: that.useritem.UserCode,
        parmdate: u.gettime().substr(0, 10)
      }
      that.datalist = []
      that.index = 0
      clearTimeout(that.ctimer)
      u.getdata(that, 'User', 'IsOpenMySelfLink', userdata).then(function (r) {
        if (r.ok) {
          u.querywhere(that, '789a2129-7b0d-42d2-9102-a86500d76aad', [{
            'Parm': 'Y',
            'Field': 'pk_Customer',
            'Value': that.useritem.pk_User
          }]).then(function (r) {
            if (r.ok) {
              let finisharr = []
              that.datalist = r.data.rows
              for (let i in r.data.rows) {
                if (r.data.rows[i].pk_customervote !== null) {
                  finisharr.push(r.data.rows[i].pk_customervote)
                }
              }
              that.tips.tiplength = r.data.rows.length
              that.tips.finisharr = finisharr.length
            } else {
              u.message(that, '错误!')
            }
          })
          that.word = document.getElementsByClassName('requset_title')[0].innerText
          that.timer()
        } else {
          that.$vux.alert.show({
            title: '提示',
            content: '抱歉!不能从转发链接打开!确定后关闭页面！',
            onHide () {
              that.$wechat.closeWindow()
            }
          })
        }
      })
    },
    methods: {
      timer () {
        let that = this
        that.ctimer = setTimeout(this.timer, 120)
        if (that.$route.name !== 'TransferPage') {
          return
        }
        if (that.index === that.word.length) {
          return
        }
        let typePanel = document.getElementById('printword')
        typePanel.innerText = that.word.substring(0, that.index++)
        if (that.index % 3 === 0) {
          typePanel.className = ''
        } else if (that.index % 3 === 1) {
          typePanel.className = 'saying'
        }
      },
      addupdate (data) {
        let that = this
        u.routergo(that, data.memo === '大区总经理' ? 'RequestForArea' : 'RequestForTeacher', {
          pk_CustomerVote: data.pk_customervote,
          name: data.Name,
          pk_Customer: data.pk_customer
        })
      }
    }
  }
</script>
<style>
  .transfer .mycd{
    width: 25px;
    height: 25px;
    position: absolute;
    right:2%;
    top:10px
  }
  #video1{display: none}
  #app .transfer .nowrite {
    background: rgba(241, 2, 21,0.4);
  }
  .transfer .tips{
  }
  .requset_title {
    display: none
  }

  .transfer {
    height: 100%;
    width: 100%;
  }
  .transfer .twarp{
    position: relative;
    height: 100%;
    overflow: auto;
  }
  .transfer .transfer_content_card{
    width: 90%;
  }
  .transfer .transfer_content{
    text-align: -webkit-center;
    height: 100%;
  }
.transfer .tips{
    font-size: 16px;
    color:#333;
  }
  .transfer .tips span{
    color:rgba(241, 2, 21,1);
    font-weight: bold;
    font-size: 18px;
  }
  .transferbtn{
    margin-top: 5px;
    letter-spacing: 0;
    display: inline-block;
    float: right;
    height: 40px;
    width: 70px;
    font-size: 12px;
    border-radius: 20px;
    line-height: 40px;
    background:rgba(64,158,255,0.8);
  }
  .transfer .transfer_content_card li {
    list-style: none;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-align: -webkit-center;
    letter-spacing: 1px;
    background: rgba(103, 194, 58, 0.4);
    border: 1px solid #fff;
    margin-top:8px;
    color:#fff;
    border-radius: 10px;
  }
  .transfer .transfer_name{
    width: 54px;
    text-align: left;
    display: inline-block;
  }
  .transfer .transfer_content_card li span{
    letter-spacing: 0;
    right:40px;
    font-size: 12px;
    text-decoration: underline;
  }

  .transfer .transfer_content_card li .transfer_score {
    display: inline-block;
    letter-spacing: 0;
    font-size: 20px;
    color:red;
    font-weight: bold;
  }


</style>
