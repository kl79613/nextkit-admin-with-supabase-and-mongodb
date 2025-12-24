import axios from "axios";

// Creating an Axios instance
const apiAxios = axios.create({
  // 使用 Next.js API 代理，避免跨域问题
  baseURL: "/api/proxy/",
  // 如果需要直接请求外部 API（需要后端配置 CORS）
  // baseURL: "https://api.titlelab.ai/",
  withCredentials: true,
  // You can add default headers here
});

// Request Interceptor
apiAxios.interceptors.request.use(
  (config) => {
    // Perform actions before the request is sent
    console.log(`Sending a ${config.method} request to ${config.url}...`);

    // Example: Attach an authorization token to every request
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    // Do something with request error
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiAxios.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("Response:", response);
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default apiAxios;
