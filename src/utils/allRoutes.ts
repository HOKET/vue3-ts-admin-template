import { RouteRecordRaw } from 'vue-router';

import home from '@/router/home';
import process from '@/router/process';
import member from '@/router/member';

const allRoutes: Array<RouteRecordRaw> = [
  ...home,
  ...process,
  ...member
];
// const routeFiles = require.context('@/router', false, /\.ts$/);
// const allRoutes: Array<RouteRecordRaw> = [];
// routeFiles.keys().forEach(key=>{
//   if(key === './index.ts') return;
//   const file = routeFiles(key).default;
//   for (let i = 0; i < file.length; i++) {
//     allRoutes.push(file[i]);
//   }
// })

export default allRoutes;
