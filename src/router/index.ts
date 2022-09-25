import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteRecordRaw
} from 'vue-router';
import allRoutes from '@/utils/allRoutes';
import Layout from '@/layout/index.vue';
const router = createRouter({
  history: createWebHistory('/'),
  routes: [{ path: '/', redirect: '/home' }] // login,register,404
});

// tabview的路由(这里可以根据权限对allRoutes做处理)
const tabViewRouters: RouteRecordRaw = {
  path: '/layout',
  redirect: '/home',
  component: Layout,
  meta: {
    title: 'layout'
  },
  children: allRoutes // 如果子路由的path没有加“/”的话，那么url要加上/layout才能访问,具体可打印router.getRoutes()查看
};

router.addRoute(tabViewRouters);

const handleRouter = (to: any, from: any, next: NavigationGuardNext) => {
  // 注册页面、登陆页面不请求权限
  // if (to.name !== 'login') {
  //     const token = localStorage.getItem('_TOKEN');
  //     if (!token) {
  //         next({ name: 'login' });
  //     } else {
  //         next();
  //     }
  // } else {
  next();
  // }
};

// 路由全局钩子---前置
router.beforeEach((to, from, next) => {
  // 处理路由
  handleRouter(to, from, next);
});

// // 路由全局钩子---后置(每改变一个路由，储存当前路由)
// router.afterEach((to, from) => {
//     // 当前路由地址
//     let url = to.fullPath;
//     writeSessionData({ module: 'url', data: url });
//     writeSessionData({ module: 'uname', data: to.name });
// });
export default router;
