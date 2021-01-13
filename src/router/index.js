import Vue from 'vue'
import VueRouter from 'vue-router';
import Login from '../views/loginPage/login';
import Admin from '../components/Home/home';


import HomePage from '../views/homePage/index.vue';
import quoteManage from '../views/quoteManage/index.vue'; //报价管理
import saleOrder from '../views/saleManager/saleOrder.vue'; //销售订单
import saleSingle from '../views/saleManager/saleSingle.vue'; //销售单
import Reporty from '../views/searchPage/reporty.vue'; //库存查询
import Provider from '../views/searchPage/provider.vue'; //供应商查询


import phoneListPage from '../views/phoneListPage/index.vue'; //通讯录



Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'admin',
    component: Admin,
    redirect: "/login",
    children: [{
      path: "home",
      name: 'home',
      component: HomePage,
      meta: {
        title: "首页"
      }
    }, ]
  },
  {
    path: "/",
    name: "quoteManage",
    component: Admin,
    children: [{
      path: 'quoteManage',
      component: quoteManage,
      meta: {
        title: "报价管理"
      }
    }]
  },
  {
    path: "/",
    name: "saleOrder",
    component: Admin,
    children: [{
      path: '/saleOrder',
      component: saleOrder,
      meta: {
        title: "销售订单",
        ptitle: '销售管理'
      }
    }]
  },
  {
    path: "/",
    name: "saleSingle",
    component: Admin,
    children: [{
      path: '/saleSingle',
      component: saleSingle,
      meta: {
        title: "销售单",
        ptitle: '销售管理'
      }
    }]
  },
  {
    path: "/",
    name: "Reporty",
    component: Admin,
    children: [{
      path: '/reportySearch',
      component: Reporty,
      meta: {
        title: "库存查询",
        ptitle: '查询'
      }
    }]
  },
  {
    path: "/",
    name: "Provider",
    component: Admin,
    children: [{
      path: '/providerSearch',
      component: Provider,
      meta: {
        title: "客户及供应商查询",
        ptitle: '查询'
      }
    }]
  },
  {
    path: '/',
    name: "orderReport",
    component: Admin,
    children: [{
      path: "/orderReport",
      component: () => import('../views/reportFrom/orderReport.vue'),
      meta: {
        title: "销售订单报表",
        ptitle: "报表"
      }
    }, ]
  },
  {
    path: '/',
    name: "singleReport",
    component: Admin,
    children: [{
      path: "/singleReport",
      component: () => import('../views/reportFrom/singleReport.vue'),
      meta: {
        title: "销售单报表",
        ptitle: "报表"
      }
    }, ]
  },
  {
    path: '/',
    name: "custRelationManage",
    component: Admin,
    children: [{
      path: "/custRelationManage",
      component: () => import('../views/customPage/custRelationManage.vue'),
      meta: {
        title: "客户关系管理",
        ptitle: "客户管理"
      }
    }, ]
  },
  {
    path: '/',
    name: "custRelationFenxi",
    component: Admin,
    children: [{
      path: "/custRelationFenxi",
      component: () => import('../views/customPage/custRelationFenxi.vue'),
      meta: {
        title: "客户关系分析",
        ptitle: "客户管理"
      }
    }, ]
  },
  {
    path: '/',
    name: "moneyApply",
    component: Admin,
    children: [{
      path: "/moneyApply",
      component: () => import('../views/customPage/moneyApply.vue'),
      meta: {
        title: "费用报销申请",
        ptitle: "客户管理"
      }
    }, ]
  },
  {
    path: '/',
    name: "moneyBaoxiaoFenxi",
    component: Admin,
    children: [{
      path: "/moneyBaoxiaoFenxi",
      component: () => import('../views/customPage/moneyBaoxiaoFenxi.vue'),
      meta: {
        title: "费用报销分析",
        ptitle: "客户管理"
      }
    }, ]
  },
  {
    path: '/',
    name: "researchApply",
    component: Admin,
    children: [{
      path: "/researchApply",
      component: () => import('../views/customPage/researchApply.vue'),
      meta: {
        title: "研发及后勤报销申请",
        ptitle: "客户管理"
      }
    }, ]
  },
  {
    path: '/',
    name: "researchFenxi",
    component: Admin,
    children: [{
      path: "/researchFenxi",
      component: () => import('../views/customPage/researchFenxi.vue'),
      meta: {
        title: "研发及后勤报销分析",
        ptitle: "客户管理"
      }
    }, ]
  },
  {
    path: "/",
    name: "phoneListPage",
    component: Admin,
    children: [{
      path: '/phoneList',
      component: phoneListPage,
      meta: {
        title: "通讯录"
      }
    }]
  },
  {
    path: "/",
    name: "entryStore",
    component: Admin,
    children: [{
      path: '/entryStore',
      component: () => import('../views/inventoryPage/entryStore.vue'),
      meta: {
        title: "入库管理",
        ptitle: "库存管理"
      }
    }]
  },
  {
    path: "/",
    name: "outStore",
    component: Admin,
    children: [{
      path: '/outStore',
      component: () => import('../views/inventoryPage/outStore.vue'),
      meta: {
        title: "出库管理",
        ptitle: "库存管理"
      }
    }]
  },
  {
    path: "/",
    name: "storeLog",
    component: Admin,
    children: [{
      name:"logInfo",
      path: '/storeLog',
      component: () => import('../views/inventoryPage/storeLog'),
      meta: {
        title: "出库日志查询",
        ptitle: "库存管理"
      }
    }]
  }


]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;