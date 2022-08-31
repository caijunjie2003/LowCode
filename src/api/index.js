import request from "../utils/request";

const api = {};

export function LoginApi(paramster) {
  return request({
    url: "/api/login",
    method: "post",
    data: paramster,
  });
}
