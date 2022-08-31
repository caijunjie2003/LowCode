import { useRoutes, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import ForePage from "../pages/ForePage/ForePage";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Index from "../pages/Index/Index";
// 在react-routerv6版本 可以使用 useRoutes来创建路由规则

function IndexRouter(props) {
  // 组件上的属性 props
  console.log(props, "触发路由规则");
  const routers = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Home exact />,
      children: [
        { path: "/", element: <Index /> },
        { path: "/menu", element: <Menu /> },
      ],
    },
    {
      path: "*",
      element: <ForePage />,
    },
  ]);
  return routers;
}

export default IndexRouter;
