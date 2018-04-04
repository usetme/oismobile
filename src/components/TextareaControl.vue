<template>
  <div class="xtext">
      <x-textarea
        :disabled="true"
        :readonly="true"
        class="weui_textarea"
        :autocomplete="autocomplete"
        :autocapitalize="autocapitalize"
        :autocorrect="autocorrect"
        :spellcheck="spellcheck"
        :placeholder="placeholder"
        :name="name"
        :rows="rows"
        :cols="cols"
        v-model="value"
        :style="textareaStyle"
        :maxlength="max"></x-textarea>
      <div class="weui_textarea_counter" v-show="showCounter && max"><span>{{count}}</span>/{{max}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      showCounter: {
        type: Boolean,
        default: true
      },
      max: Number,
      value: {
        type: String,
        default: ''
//        twoWay: true
      },
      name: String,
      placeholder: String,
      rows: {
        type: Number
      },
      cols: {
        type: Number,
        default: 40
      },
      height: Number,
      // https://github.com/yisibl/blog/issues/3
      autocomplete: 'off',
      autocapitalize: 'off',
      autocorrect: 'off',
      spellcheck: 'false'
    },
    watch: {
      value (newVal) {
        if (this.max && this.value.length > this.max) {
          this.value = newVal.slice(0, this.max)
        }
        this.$emit('on-change', this.value)
      }
    },
    computed: {
      count () {
        if (this.value !== null && this.max !== null) {
          let len = this.value.replace(/\n/g, 'aa').length
          return len > this.max ? this.max : len
        }
      },
      textareaStyle () {
        if (this.height) {
          return {
            height: `${this.height}px`
          }
        }
      }
    }
  }
</script>

<style lang="less">
  ::-webkit-input-placeholder{color:#555;}
 #app  .pagecontent .spcell{display: none}
  #app .mycomment .xtext textarea{
    text-align: left;
    width: 100%;
    height: 54px;
    background-color: #fff;
    border: none;
    margin-bottom: 10px;
    font-size: 14px;
    padding:5px;
    color: #4e4e4e !important;
  }
 #app .weui-cells__title{
    font-size: 15px;
    color: #4e4e4e;
  }
  .weui-cell{
    padding:0 15px
  }
</style>
