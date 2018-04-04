<template>
  <table style="border-collapse: collapse">
    <tr>
      <td v-for="i in data.columns">{{i.title.substr(0,4)}}</td>
    </tr>
    <tr v-for="r in data.rows">
      <td v-for="c in r">{{c}}</td>
    </tr>
  </table>
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: {
      data: Object
    },
    created: function () {
    },
    route: {
      data (rt) {
      }
    },
    methods: {}
  }
</script>
<style scoped>
  table {
    background-color: #fff;
    width: 95%;
    margin: 0 auto;
    margin-top: 1em;
  }
  table tr:first-child td{
    color:#888;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    border-bottom:1px solid #ececec
  }
  table td {
    white-space: nowrap;
    text-align: center;
    padding:10px 0;
    color:#282828;
    font-size: 14px;
  }
</style>
