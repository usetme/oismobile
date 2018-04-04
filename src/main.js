// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import CustomerControl from './components/CustomerControl'
Vue.component('ccust', CustomerControl)
import DefsearchControl from './components/DefsearchControl'
Vue.component('csearch', DefsearchControl)
import SelectControl from './components/SelectControl'
Vue.component('cselect', SelectControl)
import TableControl from './components/TableControl'
Vue.component('ctable', TableControl)
import CustSignControl from './components/CustSignControl'
Vue.component('csign', CustSignControl)
import TextareaControl from './components/TextareaControl'
Vue.component('ctextarea', TextareaControl)
import CommentControl from './components/CommentControl'
Vue.component('ccomment', CommentControl)
import CustmomerControl2 from './components/CustmomerControl2'
Vue.component('ccust2', CustmomerControl2)
import CustmomerControl3 from './components/CustmomerControl3'
Vue.component('ccust3', CustmomerControl3)
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/grid')
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
/**
 * -------------------------- 学习vux用vuex管理应用的状态 ----------------------
 * 18n是多过语言包的开发模式，目前先不用
 */
import Vuex from 'vuex'
Vue.use(Vuex)
let store = new Vuex.Store({
  modules: {
    // i18n: vuexI18n.store
  }
})

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
    // headerShow: false,
    // headerTitle: '',
    // footShow: false
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
    // updateheaderShow (state, payload) {
    //   state.headerShow = payload.headerShow
    // },
    // updateheaderTitle (state, payload) {
    //   state.headerTitle = payload.headerTitle
    // },
    // updatefootShow (state, payload) {
    //   state.footShow = payload.footShow
    // }
  },
  // cj如果是其他页面调用必须同时写mutations 和 actions
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
    // updateheaderShow ({commit}, headerShow) {
    //   commit({type: 'updateheaderShow', headerShow: headerShow})
    // },
    // updateheaderTitle ({commit}, headerTitle) {
    //   commit({type: 'updateheaderTitle', headerTitle: headerTitle})
    // },
    // updatefootShow ({commit}, footShow) {
    //   commit({type: 'updatefootShow', footShow: footShow})
    // }
  }
})
sync(store, router)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
  /**
   * google的页面统计，暂时用不到，如果需要使用，还要找index.html页面增加统计代码，参加vux说明
   */
  // ga && ga('set', 'page', to.fullPath)
  // ga && ga('send', 'pageview')
})
/**
 * -------------------------- 加载常用公用组件 ----------------------
 * cj 其他组件页面直接引用就行了
 */
import {
  Countup,
  WechatEmotion as Emotion,
  Swipeout,
  SwipeoutItem,
  Blur,
  Sticky,
  XNumber,
  Divider,
  InlineCalendar,
  Popup,
  Icon,
  Loading,
  Swiper,
  TabbarItem,
  Tabbar,
  XHeader,
  ViewBox,
  ButtonTabItem,
  ButtonTab,
  CheckerItem,
  Checker,
  Cell,
  FlexboxItem,
  DevicePlugin,
  PopupPicker,
  ToastPlugin,
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin,
  AjaxPlugin,
  Checklist,
  Scroller,
  Spinner,
  Card,
  Search,
  XInput,
  Group,
  Confirm,
  XButton,
  Datetime,
  XTextarea,
  XAddress,
  Flexbox,
  TransferDom,
  Badge,
  XTable,
  WechatPlugin,
  SwipeoutButton
} from 'vux'
Vue.use(WechatPlugin)
Vue.component('Checklist', Checklist)
Vue.component('Confirm', Confirm)
Vue.component('Emotion', Emotion)
Vue.component('Countup', Countup)
Vue.component('Badge', Badge)
Vue.component('SwipeoutButton', SwipeoutButton)
Vue.component('Swipeout', Swipeout)
Vue.component('SwipeoutItem', SwipeoutItem)
Vue.component('TransferDom', TransferDom)
Vue.component('XNumber', XNumber)
Vue.component('Sticky', Sticky)
Vue.component('Blur', Blur)
Vue.component('Divider', Divider)
Vue.component('InlineCalendar', InlineCalendar)
Vue.component('XAddress', XAddress)
Vue.component('PopupPicker', PopupPicker)
Vue.component('Scroller', Scroller)
Vue.component('Spinner', Spinner)
Vue.component('Card', Card)
Vue.component('Search', Search)
Vue.component('XInput', XInput)
Vue.component('Group', Group)
Vue.component('XButton', XButton)
Vue.component('Datetime', Datetime)
Vue.component('XTextarea', XTextarea)
Vue.component('Flexbox', Flexbox)
Vue.component('XTable', XTable)
Vue.component('FlexboxItem', FlexboxItem)
Vue.component('Cell', Cell)
import addressList from 'assets/city.json'
Vue.component('addressList', addressList)
Vue.component('Checker', Checker)
Vue.component('CheckerItem', CheckerItem)
Vue.component('ButtonTab', ButtonTab)
Vue.component('ButtonTabItem', ButtonTabItem)
Vue.component('ViewBox', ViewBox)
Vue.component('XHeader', XHeader)
Vue.component('Tabbar', Tabbar)
Vue.component('TabbarItem', TabbarItem)
Vue.component('Loading', Loading)
Vue.component('Swiper', Swiper)
Vue.component('Icon', Icon)
Vue.component('Popup', Popup)
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(AjaxPlugin)
/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
