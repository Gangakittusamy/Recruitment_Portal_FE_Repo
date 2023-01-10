import axios from "axios";
import Cookies from "js-cookie";

axios.interceptors.request.use(
  async (config) => {
    const configuration = config;
    const token = Cookies.get("access_token");
    if (token) {
      configuration.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return configuration;
  },
  (error) => {
    Promise.reject(error);
  }
);
//needed
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     return Promise.reject(error);
//   }
// );
export const API = axios.create();
export default axios;
