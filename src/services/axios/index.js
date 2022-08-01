import axios from "axios";
import errorResponseHandler from "./errorResponseHandler";
const backendHost = process.env.REACT_APP_API;
const instance = axios.create({
  baseURL: backendHost,
});

instance.interceptors.request.use(
  (config) => {
    const tokenCode = localStorage.getItem("userToken");
    const userToken = `Bearer ${tokenCode}`;
    config.headers.Authorization = userToken;
    return config;
  },
  (error) => {
    return error;
  }
);

instance.interceptors.response.use((response) => response, errorResponseHandler);

export function setBearerToken (bearer) {
  instance.interceptors.request.use(
    (config) => {
      const userToken = `Bearer ${bearer}`;
      config.headers.Authorization = userToken;
      return config;
    },
    (error) => {
      return error;
    }
  );
}
export default instance;
