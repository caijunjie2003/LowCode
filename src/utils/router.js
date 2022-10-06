import { lazy } from "react";
import { Navigate } from "react-router-dom";
// 快速导入工具函数 路由懒加载
const lazyLoad = (moduleName) => {
  const Module = lazy(() => import(`../pages/${moduleName}/${moduleName}`));
  return <Module />;
};
const defaulyRoutes = [
  {
    path: "/login",
    element: lazyLoad("Login"),
  },
  {
    path: "/",
    element: lazyLoad("Home"),
    children: [
      {
        path: "/",
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
// 权限列表 和 导航菜单 得出路由表 element暂用字符串表示 后面渲染前再映射
export const handelFilterRouter = (routes, routerCruuten) => {
  const rout = {};
  const newRoutes = [];
  routes.forEach((item) => {
    const { id, parant_id, component, router, name } = item;
    const RouterObj = {
      id,
      path: router,
      parant_id,
      name,
    };
    if (parant_id === 0) {
      // 1级菜单，直接添加,防止之前出现过子菜单,子菜单被覆盖
      rout[id] = {
        ...rout[id],
        ...RouterObj,
      };
    } else {
      // 不是1级菜单
      console.log("-----------", parant_id);
      RouterObj.element = item.component;
      rout[parant_id].children = rout[parant_id].children || [];
      rout[parant_id].children.push(RouterObj);
    }
  });
  for (let key in rout) {
    newRoutes.push(rout[key]);
  }
  console.log(rout, routes, newRoutes);
  return newRoutes;
};
// 返回最终路由表
export const handelEnd = (routes) => {
  defaulyRoutes[1].children = [...routes, ...defaulyRoutes[1].children];
  return defaulyRoutes;
};
// 渲染之前，映射element 成对应组件
export const handelFilterElement = (routes) => {
  return routes.map((route) => {
    // route.element = lazyLoad(route.element);
    if (route.children) {
      // 子组件也需要映射才渲染
      route.children.forEach((chid) => {
        chid.element = lazyLoad(chid.element);
      });
    }
    return route;
  });
};
