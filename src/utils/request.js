import axios from "axios";

const request = axios.create({
  // http://39.107.118.59:8080
  // baseURL: "http://localhost:3000/looks",
  baseURL:'http://39.107.118.59:8080',
  timeout: 5000,
});
//3. 定义前置拦截器，请求拦截器，请求发送出去之前触发的
request.interceptors.request.use(
  (config) => {
    //config 接口请求的配置信息
    console.log(config);
    //添加请求头
    // config.headers["authorization"] = getTOken() || "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//4. 定义后置拦截器,响应拦截器, 服务器响应回来数据之前触发，
request.interceptors.response.use(
  (response) => {
    //响应回来的数据操作
    console.log(response);
    if (response.data.status !== 200) {
      //   ToastFn({
      //     icon: "fail",
      //     content: response.data.description,
      //     Timeout: 2000,
      //   });
    }
    return response.data;
  },
  (error) => {
    //报错的是时候抛出一个报错的信息
    return Promise.reject(error);
  }
);
//5. 抛出对象的信息
export default request;
