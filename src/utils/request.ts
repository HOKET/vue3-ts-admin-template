import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError
} from 'axios';
import { ElMessage } from 'element-plus';
import storage from '@/utils/storage';
import router from '@/router/index';

// 后端接口返回数据的统一结构
interface ResponseData {
	data: any;
	errors: string | null;
	extras: any;
	statusCode: number;
	succeeded: boolean;
	timestamp: number;
}

// 请求附带参数统一用params
const request: AxiosInstance = function (config: AxiosRequestConfig) {
  const {
    method,
    params,
    url,
    timeout,
    headers: headerInfo,
    // interceptor,
    ...other
  } = config;
  const auth = sessionStorage.getItem('auth')!;
  const headers: AxiosRequestHeaders = {
    ...headerInfo
  };
  // 添加token
  if (auth) {
		// !.表示非空
		headers!.Authorization = 'Bearer ' + auth;
  }

  const options: AxiosRequestConfig = {
    headers,
    baseURL: process.env.VUE_APP_URL,
    url,
    ...other,
    timeout: timeout || 60000
  };
  const methodList = ['post', 'patch', 'put'];
  if (methodList.includes(method!)) {
    options.method = method;
    options.data = params;
  } else {
    options.method = method || 'get';
    options.params = params;
  }
  // 创建axios实例
  return axios.create(options);
};

function resolve (res: AxiosResponse<ResponseData>) {
  const { data } = res;
  if (data.statusCode && data.statusCode !== 200) {
    ElMessage.error(data.errors!);
    return Promise.resolve(data);
  } else {
    return Promise.resolve(data);
  }
}
function reject (err: AxiosError) {
  const { status } = err.response;
  console.log(err.response);
  const statusMap = {
    401: () => {
      storage.remove('auth');
      ElMessage.error('登录失效，请重新登录');
      setTimeout(() => {
        router.push({ name: 'login' });
      }, 1000);
    },
    403: () => {
      ElMessage.error('您没有权限');
    },
    404: () => {
      ElMessage.error('请求的资源不存在');
    },
    500: () => {
      ElMessage.error('服务异常，请稍后重试');
    },
    503: () => {
      ElMessage.error('服务器正在维护，请稍后重试');
    }
  };

  // if (/timeout\sof\s\d+ms\sexceeded/.test(message)) {
  //   ElMessage.error('网络不稳定，请稍后重试')
  // }

  if (statusMap[status]) {
    statusMap[status]();
  } else {
    return Promise.reject(err);
  }
}

// // 超时时间
// axios.defaults.timeout = 60000;
// // 创建axios实例
// const request: AxiosInstance = axios.create({
//   baseURL: process.env.VUE_APP_URL
// })
// // 添加请求拦截器
// request.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     const headers = config.headers as AxiosRequestHeaders;
//     // TOKEN
//     const auth = sessionStorage.getItem('auth')!;
//     if (auth) {
// 			// !.表示非空
// 			config!.headers!.Authorization = 'Bearer ' + auth;
//     }
//     // post patch put用data，其他用params
//     const data = {
//       ...config,
//       headers
//     };
//     // 默认get请求
//     !data.method && (data.method = 'get');
//     return data;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// 添加响应拦截器
request.interceptors.response.use(resolve, reject);

export default request;
