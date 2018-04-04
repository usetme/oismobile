import Vue from 'vue'
import Router from 'vue-router'
import Login from 'pubapp/Login.vue'
import Schedule from 'oa/Schedule.vue'
import ScheduleView from 'oa/ScheduleView.vue'
import ScheduleAdd from 'oa/ScheduleAdd.vue'
import SalePlan from 'oa/SalePlan.vue'
import SalePlanAdd from 'oa/SalePlanAdd.vue'
import SalePlanView from 'oa/SalePlanView.vue'
import WorkPlan from 'oa/WorkPlan.vue'
import WorkPlanAdd from 'oa/WorkPlanAdd.vue'
import WorkPlanView from 'oa/WorkPlanView.vue'
import WorkPlanViewAdd from 'oa/WorkPlanViewAdd.vue'
import sdeCustomer from 'oa/sdeCustomer.vue'
import sdeMeeting from 'oa/sdeMeeting.vue'
import SalePlanDetail from 'oa/SalePlanDetail.vue'
import sdeCustomerView from 'oa/sdeCustomerView.vue'
import sdeEmployee from 'oa/sdeEmployee.vue'
import sdeQuery1 from 'oa/sdeQuery1.vue'
import sdeQuery2 from 'oa/sdeQuery2.vue'
import PlanDetail from 'oa/PlanDetail.vue'
import saleChart1 from 'reports/saleChart1.vue'
import GroupReport from 'reports/GroupReport.vue'
import LastDayReport from 'reports/LastDayReport.vue'
import TotalReport from 'reports/TotalReport.vue'
import AreaReport from 'reports/AreaReport.vue'
import BossReport from 'reports/BossReport.vue'
import About from 'pubapp/About.vue'
import Customer from 'cust/Customer.vue'
import CustomerAdd from 'cust/CustomerAdd.vue'
import Connect from 'cust/Connect.vue'
import CustomerView from 'cust/CustomerView.vue'
import ConnectView from 'cust/ConnectView.vue'
import ConnectAdd from 'cust/ConnectAdd.vue'
import RequestForArea from '../RequestForArea.vue'
import RequestForTeacher from '../RequestForTeacher.vue'
import TransferPage from '../TransferPage.vue'
import CatchInformation from '../CatchInformation.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/ScheduleView',
      name: 'ScheduleView',
      component: ScheduleView
    },
    {
      path: '/ScheduleAdd',
      name: 'ScheduleAdd',
      component: ScheduleAdd
    },
    {
      path: '/SalePlan',
      name: 'SalePlan',
      component: SalePlan
    },
    {
      path: '/SalePlanAdd',
      name: 'SalePlanAdd',
      component: SalePlanAdd
    },
    {
      path: '/SalePlanView',
      name: 'SalePlanView',
      component: SalePlanView
    },
    {
      path: '/WorkPlan',
      name: 'WorkPlan',
      component: WorkPlan
    },
    {
      path: '/WorkPlanAdd',
      name: 'WorkPlanAdd',
      component: WorkPlanAdd
    },
    {
      path: '/WorkPlanView',
      name: 'WorkPlanView',
      component: WorkPlanView
    },
    {
      path: '/WorkPlanViewAdd',
      name: 'WorkPlanViewAdd',
      component: WorkPlanViewAdd
    },
    {
      path: '/sdeCustomer',
      name: 'sdeCustomer',
      component: sdeCustomer
    },
    {
      path: '/sdeMeeting',
      name: 'sdeMeeting',
      component: sdeMeeting
    },
    {
      path: '/SalePlanDetail',
      name: 'SalePlanDetail',
      component: SalePlanDetail
    },
    {
      path: '/sdeCustomerView',
      name: 'sdeCustomerView',
      component: sdeCustomerView
    }, {
      path: '/sdeEmployee',
      name: 'sdeEmployee',
      component: sdeEmployee
    }, {
      path: '/sdeQuery1',
      name: 'sdeQuery1',
      component: sdeQuery1
    }, {
      path: '/sdeQuery2',
      name: 'sdeQuery2',
      component: sdeQuery2
    }, {
      path: '/PlanDetail',
      name: 'PlanDetail',
      component: PlanDetail
    }, {
      path: '/saleChart1',
      name: 'saleChart1',
      component: saleChart1
    }, {
      path: '/About',
      name: 'About',
      component: About
    }, {
      path: '/Customer',
      name: 'Customer',
      component: Customer
    }, {
      path: '/CustomerAdd',
      name: 'CustomerAdd',
      component: CustomerAdd
    }, {
      path: '/Connect',
      name: 'Connect',
      component: Connect
    }, {
      path: '/CustomerView',
      name: 'CustomerView',
      component: CustomerView
    }, {
      path: '/ConnectView',
      name: 'ConnectView',
      component: ConnectView
    }, {
      path: '/ConnectAdd',
      name: 'ConnectAdd',
      component: ConnectAdd
    }, {
      path: '/AreaReport/:time/:msgid',
      // path: '/AreaReport/:time',
      name: 'AreaReport',
      component: AreaReport
    }, {
      path: '/GroupReport/:time/:msgid',
      name: 'GroupReport',
      component: GroupReport
    }, {
      path: '/LastDayReport/:time/:msgid',
      name: 'LastDayReport',
      component: LastDayReport
    }, {
      path: '/BossReport/:time/:msgid',
      name: 'BossReport',
      component: BossReport
    }, {
      path: '/TotalReport/:time/:msgid',
      name: 'TotalReport',
      component: TotalReport
    }, {
      path: '/RequestForArea',
      name: 'RequestForArea',
      component: RequestForArea
    }, {
      path: '/RequestForTeacher',
      name: 'RequestForTeacher',
      component: RequestForTeacher
    }, {
      path: '/TransferPage/:msgid',
      name: 'TransferPage',
      component: TransferPage
    }, {
      path: '/CatchInformation',
      name: 'CatchInformation',
      component: CatchInformation
    }
  ]
})
