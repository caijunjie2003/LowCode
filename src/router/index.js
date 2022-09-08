import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import AuthComponent from "../utils/AuthComponent";
// React 组件懒加载
// 快速导入工具函数
const lazyLoad = (moduleName) => {
  const Module = lazy(() => import(`../pages/${moduleName}/${moduleName}`));
  return <Module />;
};
const routes = [
  {
    path: "/login",
    element: lazyLoad("login"),
  },
  {
    path: "/",
    element: <AuthComponent>{lazyLoad("Home")}</AuthComponent>,
    children: [
      {
        path: "",
        element: lazyLoad("Index"),
      },
      {
        path: "*",
        element: lazyLoad("ForePage"),
      },
    ],
  },
  {
    path: "*",
    element: lazyLoad("ForePage"),
  },
];

export default routes;
