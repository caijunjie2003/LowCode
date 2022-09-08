// 实现路由拦截
import { isLogin } from "./userAuthToken";
import { message } from "antd";
import Redirect from "../components/Redirect/Redirect";
import { useLocation, useNavigate } from "react-router-dom";
// 高阶函数(一个函数的返回值是一个组件)，,组件提里面的内容，放在props的children属性中
function AuthComponet(props) {
  console.log(props,'路由校验触发--------------');
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  // 该项目所有的菜单访问都是需要登录权限的，并且需要做路由拦截~
  if (isLogin() && location.pathname === "/login") {
    console.log('是的的的的的')
    navigate("/", { replace: true });
  }

  // if(!isLogin){
  //   message.error('请您先登录!')
  // }
  return isLogin() ? props.children : Redirect("/login");
}
export default AuthComponet;
