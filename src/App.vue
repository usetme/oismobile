<template>
  <div id="app">
    <x-header slot="header"
              :left-options.showBack="leftoptions"
              :right-options="rightoptions"
              @on-click-title="scrollTop"
              @on-click-more="showMenus = true"
              v-show="headershow">
      {{headertitle}}
    </x-header>
    <view-box v-bind:class="bgcolor" ref="viewBox" slot="bottom" id="content">
      <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <keep-alive>
          <router-view class="router-view"></router-view>
        </keep-alive>
      </transition>
      <Footers v-show="sdefootshow" slot="bottom"></Footers>
      <Footercust v-show="custfootshow" slot="bottom"></Footercust>
    </view-box>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import Footercust from './pubapp/Footercust'
  import Footers from './pubapp/Footer'
  import u from './js/utility'
  export default {
    data () {
      return {
        headershow: false,
        headertitle: '',
        leftoptions: {showBack: true},
        headermenus: {},
        rightoptions: {},
        showMenus: false,
        footshow: false
      }
    },
    components: {Footercust, Footers},
    mounted () {
      let view = document.getElementById('vux_view_box_body')
//      let cheader = document.getElementsByClassName('vux-header')[0]
//      view.appendChild(cheader)
      if (this.$route.path.toLowerCase() === '/s') {
        window.localStorage.setItem('loginhome', 's')
      } else if (this.$route.path.toLowerCase() === '/c') {
        window.localStorage.setItem('loginhome', 'c')
      } else {
        let loginhome = window.localStorage.getItem('loginhome')
        if (loginhome === null) {
          window.localStorage.setItem('loginhome', 's')
        }
      }
    },
//    beforeDestroy () {
//      this.box.removeEventListener('scroll', this.handler, false)
//    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        demoTop: state => state.vux.demoScrollTop,
        isLoading: state => state.vux.isLoading,
        direction: state => state.vux.direction
      }),
      sdefootshow () {
        let loginhome = window.localStorage.getItem('loginhome')
        if (this.footshow && loginhome.toLowerCase() === 's') {
          return true
        } else {
          return false
        }
      },
      custfootshow () {
        let loginhome = window.localStorage.getItem('loginhome')
        if (this.footshow && loginhome.toLowerCase() === 'c') {
          return true
        } else {
          return false
        }
      },
      bgcolor () {
        if (this.$route.path === '/' || this.$route.path.toLowerCase().includes('login')) {
          return 'bgcontent'
        } else {
          return 'bgcontents'
        }
      },
      leftOptions () {
        return {
          showBack: this.route.path !== '/'
        }
      },
      headerTransition () {
        return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      },
      componentName () {
        if (this.route.path) {
          const parts = this.route.path.split('/')
          if (/component/.test(this.route.path) && parts[2]) return parts[2]
        }
      },
      title () {
        if (this.route.path === '/') return 'Home'
        if (this.route.path === '/project/donate') return 'Donate'
        if (this.route.path === '/demo') return 'Demo list'
        return this.componentName ? `Demo/${this.componentName}` : 'Demo/~~'
      }
    },
    methods: {
      diffroute: function () {
        let k = window.localStorage.getItem('loginhome')
        let that = this
        u.routerreload = false
        if (k.toLowerCase() === 's') {
          u.routergo(that, 'Schedule', false)
        } else {
          u.routergo(that, 'Customer', false)
        }
      },
      scrollTop () {
//        this.$refs.viewBox.scrollTop(0)
      },
      ...mapActions([
        'updateDemoPosition'
      ])
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import 'css/mystyle.css';
  .vux-header-back{display: none}
</style>
