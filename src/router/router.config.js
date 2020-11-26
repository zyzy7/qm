/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/home/about'),
        meta: { title: '关于我', keepAlive: false }
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/login'),
        meta: { title: '登录', keepAlive: false }
      },
      {
        path: '/forgetPwd',
        name: 'ForgetPwd',
        component: () => import('@/views/forgPwd/index'),
        meta: { title: '忘记密码', keepAlive: false }
      },
      {
        path: '/resetPwd',
        name: 'ResetPwd',
        component: () => import('@/views/resetPwd/index'),
        meta: { title: '重置密码', keepAlive: false }
      },
      {
        path: '/getCash',
        name: 'GetCash',
        component: () => import('@/views/getCash/index'),
        meta: { title: '申请提现', keepAlive: false }
      },
      {
        path: '/cashHistory',
        name: 'CashHistory',
        component: () => import('@/views/getCash/history'),
        meta: { title: '提现记录', keepAlive: false }
      }
    ]
  }
]
