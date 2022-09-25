import request from '@/utils/request';
// 登录用户
export function login (params: any) {
  return request({
    url: '/user/login',
    method: 'post',
    params
  });
}
// 获取用户信息
export function getUserInfo (params: any) {
  return request({
    url: '/user/login',
    method: 'get',
    params
  });
}
