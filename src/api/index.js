import request from "../utils/request";

const api = {
  login: "/api/login",
  userInfo: "/my/getInfo",
  getMenu: '/my/menus',
  addMenu: "/system/addMenu",
  addForm: "/system/addForm",
  getForm: "/system/getForm",
};
export function getFormApi(paramster) {
  return request({
    url: api.getForm,
    method: "post",
    data: paramster,
  });
}
export function addFormApi(paramster) {
  return request({
    url: api.addForm,
    method: "post",
    data: paramster,
  });
}
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
