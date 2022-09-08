import React, { useEffect, useState } from "react";
import { Menu, Card } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { getUeseApi } from "../../api/index";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import "./index.css";
export default function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  const userInfo = useSelector((state) => state.userInfo);
  const initRouter = useSelector((state) => state.initRouter);
  // 初始请求
  const reqeustFn = async () => {
    const obj = await getUeseApi();
    // 存储到redux
    console.log(obj);
    if (obj.status === 200) {
      dispatch({
        type: "CHANGE_USERINFO",
        value: obj.data,
      });
    }
  };
  useEffect(() => {
    console.log(initRouter, userInfo);
    changOpenKeys();
    initOptionsItems();
  }, [initRouter]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    reqeustFn();
  }, []);
  const navigate = useNavigate();
  const initOptionsItems = () => {
    // 根据后端返回的数据，动态渲染菜单~
    console.log(initRouter);
    const Menus = [{ label: "首页", key: "/" }];
    if (initRouter) {
      initRouter.forEach((item) => {
        let obj = {};
        obj = {
          label: item.name,
          key: item.path,
        };
        if (item.children) {
          obj.children = [];
          item.children.forEach((chid) => {
            obj.children.push({
              label: chid.name,
              key: chid.path,
            });
          });
        }
        Menus.push(obj);
      });
    }

    setMenuItems(Menus);
  };
  const rootSubmenuKeys = ["/", "/xiton"];
  const [openKeys, setOpenKeys] = useState([]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const changOpenKeys = () => {
    let str = location.pathname;
    let index = str.lastIndexOf("/");
    setOpenKeys([str.slice(0, index)]);
  };
  const onClick = (e) => {
    console.log("click ", e.key);
    navigate(e.key);
  };
  return (
    <div className="home_box">
      <Menu
        // inlineCollapsed={false}
        selectedKeys={[location.pathname]}
        selectable={true}
        onClick={onClick}
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 256,
        }}
        items={menuItems}
      />
      {/* <Menu
        theme="dark"
        onClick={onClick}
        style={{
          width: 256,
          height: "100%",
        }}
        selectedKeys={[location.pathname]}
        defaultOpenKeys={[
          location.pathname === "/" ? "/" : location.pathname.slice(1),
        ]}
        mode="inline"
        items={items}
      /> */}
      <div className="home_right_box">
        <div>
          {/* {defaultRouter}
          {defaultOpenArr} */}
          {/* 头部组件 */}
          <Header></Header>
        </div>
        <Card>
          <div className="home_rightBox">
            {/* 需要Outlet出口来展示子路由组件 */}
            <Outlet />
          </div>
        </Card>
      </div>
    </div>
  );
}
