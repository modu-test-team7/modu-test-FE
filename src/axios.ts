import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// const API_BASE_URL = 'http://13.125.200.12';
// const API_BASE_URL = `${process.env.NEXT_PUBLIC_SP_BACK_SERVER_URL}`;
// const API_BASE_URL = 'http://43.201.26.199';
const API_BASE_URL = 'http://52.1.45.245'

axios.interceptors.request.use(
  config => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.withCredentials = true;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== `${API_BASE_URL}/api/refresh`
    ) {
      originalRequest._retry = true;

      const refreshResponse = await axios.post(`${API_BASE_URL}/api/refresh`);
      const newToken = refreshResponse.data.newAccessToken;

      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      return axios(originalRequest); // 401 에러가 생기면 서버에 리프레쉬 토큰으로 새로운 엑세스 토큰 요청
    }
    return Promise.reject(error);
  },
);

export const postAPI = <T = any, R = any>(url: string, data: T): Promise<AxiosResponse<R>> => {
  return axios.post<R>(API_BASE_URL + url, data)
};

// export const postAPI = <T = any, R = any>(url: string, data: T): Promise<AxiosResponse<R>> => {
//   return axios.post<R>(API_BASE_URL + url, data, {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   });
// };


export const putAPI = <T = any, R = any>(url: string, data: T): Promise<AxiosResponse<R>> => {
  return axios.put<R>(API_BASE_URL + url, data);
};

export const getAPI = <R = any>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<R>> => {
  return axios.get<R>(API_BASE_URL + url, config);
};

export const deleteAPI = <R = any>(url: string): Promise<AxiosResponse<R>> => {
  return axios.delete<R>(API_BASE_URL + url);
};

export const patchAPI = <T = any, R = any>(url: string, data: T): Promise<AxiosResponse<R>> => {
  return axios.patch<R>(API_BASE_URL + url, data);
};