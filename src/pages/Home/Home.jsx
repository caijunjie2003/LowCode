import React from "react";
import { Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";
export default function Home() {
  const navigate = useNavigate();
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("首页", "/"),
    getItem("菜单设置", "sub2", "", [getItem("菜单列表", "/menu")]),
  ];
  const onClick = (e) => {
    console.log("click ", e);
    navigate(e.key);
  };
  return (
    <div className="home_box">
      <Menu
        theme="dark"
        onClick={onClick}
        style={{
          width: 256,
          height: "100vh",
        }}
        defaultSelectedKeys={['/']}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
      <div>
        {/* 需要Outlet出口来展示子路由组件 */}
        <Outlet />
      </div>
    </div>
  );
}
