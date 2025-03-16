import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<IError>) => {
    return Promise.reject(error.response?.data);
  }
);

export default api;
