import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  {
    path: '/addeva',
    component: Layout,
    children: [{
      path: 'index',
      name: 'evaluation',
      component: () => import('@/views/evaluation/index'),
      meta: { title: '考核信息', icon: 'example' }
    }]
  },
  {
    path: '/infomation',
    component: Layout,
    access: '1',
    
    name: 'infomation',
    //access:0,
    meta: { title: '信息管理', icon: 'table' },
    children: [
      {
        path: 'staff',
        name: 'Staff',
        access: '1',
        component: () => import('@/views/table/index'),
        meta: { title: '员工信息', icon: 'table' }
      },
      {
        path: 'department',
        name: 'Department',
        access: '1',
        component: () => import('@/views/table/department'),
        meta: { title: '部门信息', icon: 'table' }
      },
      {
        path: 'evaluation',
        name: 'Evaluation',
        access: '1',
        component: () => import('@/views/table/evaluation'),
        meta: { title: '考核信息', icon: 'table'}
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    name: 'add',
    access: '1',
    meta: { title: '新增信息', icon: 'form' },
    children: [
      {
        path: 'staff',
        name: 'staff',
        access: '1',
        component: () => import('@/views/form/index'),
        meta: { title: '新增员工信息', icon: 'form' }
      },
      {
        path: 'evaluation',
        name: 'evaluation',
        access: '1',
        component: () => import('@/views/form/evaluation'),
        meta: { title: '新增考核信息', icon: 'form' }
      },
      {
        path: 'department',
        name: 'Department',
        access: '1',
        component: () => import('@/views/form/department'),
        meta: { title: '新增部门信息', icon: 'form' }
      }
    ]
  },

  {
    path: '/info_query',
    component: Layout,
    
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/infomation/index'),
        meta: { title: '信息查询',icon:'nested' }
      }
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
