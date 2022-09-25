export default [
  {
    path: '/home',
    name: 'home',
    component: () =>
      import('@/views/home/index.vue'),
    meta: {
      title: '首页'
    }
  }
];
