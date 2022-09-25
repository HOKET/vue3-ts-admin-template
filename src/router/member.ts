export default [
  {
    path: '/member',
    name: 'member',
    // component: Layout,
    meta: {
      title: '成员管理'
    },
    children: [
      {
        path: 'member-list',
        name: 'memberList',
        component: () =>
          import('@/views/member/member-list.vue'),
        meta: {
          title: '成员列表'
        }
      },
      {
        path: 'member-detail',
        name: 'memberDetail',
        component: () =>
          import('@/views/member/member-detail.vue'),
        meta: {
          title: '成员详情',
          noCache: true
        }
      },
      {
        path: 'member/:type',
        name: 'memberAddEdit',
        component: () =>
          import('@/views/member/member-add-edit.vue'),
        meta: {
          title: '成员详情',
          noCache: true
        }
      }
    ]
  }
];
