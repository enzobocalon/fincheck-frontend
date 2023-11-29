import axios from 'axios'
import { localStorageKeys } from '../config/localStorageKeys';
import { sleep } from '../utils/sleep';

export const HttpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

HttpClient.interceptors.request.use(config => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config;
})

HttpClient.interceptors.request.use(async config => {
  await sleep(500)

  return config;
})
