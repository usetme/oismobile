<template>
  <div class="mycomment">
    <!--<div class="emotion" v-show="emotionshow===true">-->
      <!--<emotion is-gif  v-for="item in list" @click.native="btnemotion">{{item}}</emotion>-->
    <!--</div>-->
    <div class="comment_footer" v-show="onFocus===false">
      <x-input placeholder="写评论.." @on-focus="btnfocus" v-model="cc.Comments"></x-input>
      <img src="../assets/img/comicon.png" @click="btnview" v-show="cc.Comments===''||cc.Comments===undefined">
      <badge :text="oo.length<10?oo.length:'10+'" class="single" v-show="cc.Comments===''||cc.Comments===undefined"></badge>
      <x-button mini @click.native="btnadd" v-show="cc.Comments!==''&&cc.Comments!==undefined">发布</x-button>
    </div>
    <div class="comment_footer2" v-show="onFocus===true">
      <x-input placeholder="留下优质的评论吧.." v-model="cc.Comments"  @on-blur="btnblur" class='input2'></x-input>
      <!--<img src="../assets/img/laugh.png" class="comment_footer2_img" @click="btnemotionshow">-->
      <x-button mini @click.native="btnadd">发布</x-button>
    </div>
    <div class="comment">
      <div class="comment_content" v-for="i in oo">
        <img src="../assets/img/cust.png">
        <div class="content">
          <span>{{i.评论人}}{{i.评论时间}}</span>
          <ctextarea :value="i.评论内容" :rows="2"></ctextarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import u from '../js/utility'

  export default {
    data () {
      return {
        emotionshow: false,
        oo: [],
        cc: {},
        list: ['微笑', '流泪', '害羞', '大哭', '尴尬', '呲牙', '握手'],
        onFocus: false,
        interval: '',
        bfscrolltop: document.body.scrollTop
      }
    },
    mounted: function () {
      let that = this
      let input2 = document.getElementsByClassName('weui-input')[1]
//      捕获手机软键盘完成事件
      input2.onkeydown = function (e) {
        if (e.keyCode === 13) {
          that.btnadd()
        }
      }
    },
    watch: {
      onFocus (val) {
        let input2 = document.getElementsByClassName('weui-input')[1]
        if (val === true) {
          setTimeout(function () {
            input2.focus()
          }, 300)
        }
      }
    },
    activated: function () {
      let that = this
      if (u.routereload()) {
        u.querywhere(that, 'c781d6bf-0d16-4d7e-bc5d-a6e800aa397c', [{
          'Field': 'Comment.SourceId',
          'Value': that.$route.query.pk
        }]).then(function (r) {
          if (r.ok) {
            that.oo = r.data.rows
          } else {
            u.message(that, r.message)
          }
        })
      }
    },
    methods: {
      btnemotionshow () {
        if (this.emotionshow === false) {
          this.emotionshow = true
        } else {
          this.emotionshow = false
        }
      },
      btnemotion () {
        let that = this
        that.emotionshow = false
      },
      btnview () {
        let pagecontent = document.getElementsByClassName('pagecontent')[0].offsetHeight
        let comment = document.getElementsByClassName('comment')[0].offsetHeight
        let vuxview = document.getElementById('vux_view_box_body')
        vuxview.scrollTop = pagecontent - comment
      },
      btnfocus () {
        let that = this
        that.interval = setInterval(function () {
          that.onFocus = true
          document.body.scrollTop = document.body.scrollHeight
        }, 200)
      },
      btnblur () {
        let that = this
        setTimeout(function () {
          that.onFocus = false
          clearInterval(that.interval)
          document.body.scrollTop = that.bfscrolltop
        }, 200)
      },
      btnadd () {
        let that = this
        that.cc.SourceId = that.$route.query.pk
        u.getdata(that, 'Comment', 'AddUpdate', that.cc).then(function (r) {
          if (r.ok) {
            u.message(that, '评论成功！')
            setTimeout(function () {
              u.querywhere(that, 'c781d6bf-0d16-4d7e-bc5d-a6e800aa397c', [{
                'Field': 'Comment.SourceId',
                'Value': that.$route.query.pk
              }]).then(function (r) {
                if (r.ok) {
                  that.oo = r.data.rows
                  that.cc.Comments = ''
                  that.onFocus = false
                } else {
                  u.message(that, r.message)
                }
              })
            }, 500)
          } else {
            u.alert(that, r.message)
          }
        })
      }
    }
  }
</script>
<style>
  .comment_footer2 {
    position: relative;
  }

  .comment_footer2 .comment_footer2_img {
    top: 5px;
    right: 46px;
    width: 30px;
    height: 30px;
    position: absolute;
  }

  .comment_footer2 .vux-x-input .weui-icon {
    padding-left: 0
  }

  .comment_footer2 .weui-cell__ft {
    display: none;
  }

  #app .comment_footer {
    position: relative;
  }

  #app .comment {
    margin-top: 40px;
  }

  #app .comment_content {
    overflow: hidden;
    background-color: #fff;
  }

  #app .comment_content img {
    margin: 10px;
    float: left;
    width: 34px;
    height: 34px;
  }

  #app .comment_content .content {
    margin-left: -10px;
    float: left;
  }

  #app .comment_content .content span {
    display: inline-block;
    padding-left: 16px;
    color: #406599;
    font-size: 13px;
  }

  #app .comment_footer .single {
    position: absolute;
    right: 0;
    top: 0
  }

  #app .comment_footer, #app .comment_footer2 {
    z-index: 999;
    overflow: hidden;
    border-top: 1px solid #eee;
    position: fixed;
    height: 40px;
    background-color: #fff;
    width: 100%;
    bottom: 0
  }

  #app .comment_footer .weui-cell, #app .comment_footer2 .weui-cell {
    padding: 0
  }

  #app .comment_footer .weui-cell input {
    float: left;
    background-color: #f6f6f6;
    margin-left: 10px;
    padding-left: 34px;
    text-align: left;
    border-radius: 10px;
    border: 1px solid #eee;
    font-size: 13px;
    color: #4e4e4e;
    height: 30px;
    margin-top: 5px;
    background-image: url('../assets/img/comment.png');
    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position-y: 2px;
    background-position-x: 3px;
  }

  #app .comment_footer2 .weui-cell input {
    float: left;
    background-color: #f6f6f6;
    margin-left: 10px;
    padding-left: 8px;
    text-align: left;
    border-radius: 10px;
    border: 1px solid #eee;
    font-size: 13px;
    color: #4e4e4e;
    height: 30px;
    margin-top: 5px;
  }

  #app .comment_footer .vux-x-input .weui-icon {
    display: none;
  }

  #app .comment_footer .vux-x-input {
    width: 75%;
    float: left;
  }

  #app .comment_footer img {
    float: right;
    position: relative;
    top: 6px;
    right: 16px;
    width: 24px;
    height: 24px;
  }

  #app .comment_footer2 .vux-x-input {
    width: 85%;
    float: left;
  }

  #app .comment_footer2 input {
    letter-spacing: 1px;
  }
  #app .comment_footer button {
    float: right;
    background-color: transparent;
    width: 10%;
    font-size: 14px;
    padding: 0;
    color: #999999;
    letter-spacing: 2px;
    padding-top: 4px;
    margin-right: 4px;
  }
  #app .comment_footer2 button {
    float: right;
    background-color: transparent;
    width: 10%;
    font-size: 14px;
    padding: 0;
    color: #999999;
    letter-spacing: 2px;
    padding-top: 2px;
  }

  #app .comment_footer2 .weui-btn:after, #app .comment_footer .weui-btn:after {
    border: none
  }

  .emotion {
    position: fixed;
    z-index: 999;
    bottom: 6%;
    background-color: #f6f6f6;
    width: 100%;
    height: 60px;
  }

  .emotion img {
    display: inline-block;
    margin-right: 10px
  }

  #app .mycomment .xtext textarea {
    height: inherit
  }
</style>
