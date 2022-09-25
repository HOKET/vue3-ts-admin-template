
// import Layout from '@/layout/index.vue';
export default [
  {
    path: '/process',
    name: 'process',
    // component: Layout,
    meta: {
      title: '进度管理'
    },
    children: [
      {
        path: 'process-list',
        name: 'processList',
        component: () =>
          import('@/views/process/process-list.vue'),
        meta: {
          title: '进度列表'
        }
      },
      {
        path: 'process-detail',
        name: 'processDetail',
        component: () =>
          import('@/views/process/process-detail.vue'),
        meta: {
          title: '进度详情',
          noCache: true
        }
      },
      {
        path: 'process/:type(add|edit)',
        name: 'processAddEdit',
        component: () =>
          import('@/views/process/process-add-edit.vue'),
        meta: {
          title: '进度编辑',
          noCache: true
        }
      }
    ]
  }
];
