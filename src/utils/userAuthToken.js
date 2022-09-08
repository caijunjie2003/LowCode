// 修改token
const setClearToken = (val) => {
  localStorage.setItem("authorization", val);
};
// 获取token
const getTOken = () => {
  return localStorage.getItem("authorization");
};
// 获取用户是否登陆
let isLogin = () => {
  return getTOken();
};
// 删除token
const cleaerToken = () => {
  localStorage.removeItem("authorization");
  //   将用户登入状态也修改了
  isLogin();
};
console.log(isLogin());
export { cleaerToken, setClearToken, getTOken, isLogin };
