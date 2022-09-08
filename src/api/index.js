import request from "../utils/request";

const api = {
  login: "/api/login",
  userInfo: "/my/getInfo",
  getMenu:'/my/menus',
  addMenu: "/system/addMenu",
};

export function getMenuApi(paramster) {
  return request({
    url: api.getMenu,
    method: "post",
    data: paramster,
  });
}
export function addMenuApi(paramster) {
  return request({
    url: api.addMenu,
    method: "post",
    data: paramster,
  });
}
export function LoginApi(paramster) {
  return request({
    url: api.login,
    method: "post",
    data: paramster,
  });
}

export function getUeseApi(paramster) {
  return request({
    url: api.userInfo,
    method: "get",
    data: paramster,
  });
}
