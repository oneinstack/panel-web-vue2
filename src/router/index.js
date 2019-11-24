import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'icon-dashboard', affix: true }
      }
    ]
  },
  {
    path: '/website',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/documentation/index'),
        name: 'website',
        meta: { title: 'website', icon: 'icon-web', affix: true }
      }
    ]
  },
  {
    path: '/ftp',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/ftp/ftp'),
        name: 'ftp',
        meta: { title: 'ftp', icon: 'icon-ftp' }
      }
    ]
  },
  {
    path: '/database',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/documentation/index'),
        name: 'database',
        meta: { title: 'database', icon: 'icon-database', affix: true }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/monitor/index'),
        name: 'monitor',
        meta: { title: 'monitor', icon: 'icon-monitor', affix: true }
      }
    ]
  },
  {
    path: '/cron',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/cron/cron'),
        name: 'cron',
        meta: { title: 'cron', icon: 'icon-jihuarenwu' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile',
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/profile/index'),
        name: 'profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    meta: {
      title: 'setting',
      icon: 'icon-setting'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/setting/usersetting'),
        name: 'user',
        meta: { title: 'user', icon: 'icon-user' }
      },
      {
        path: 'panel',
        component: () => import('@/views/documentation/index'),
        name: 'panel',
        meta: { title: 'panel', icon: 'icon-panel' }
      }
    ]
  }
]

const createRouter = () =>
  new Router({
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
