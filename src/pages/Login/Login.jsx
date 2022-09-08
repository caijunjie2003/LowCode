import React, { useEffect, useState } from "react";
import { Input, Button, message ,notification} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { LoginApi, getMenuApi } from "../../api";
import loginImg from "./imgs/login.jpeg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handelFilterRouter } from "../../utils/router";
import "./index.css";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const [userInfo, setUserInfo] = useState({
    username: "admin",
    password: "123456a",
  });
  const changeInput = (e, txt) => {
    setUserInfo({
      ...userInfo,
      [txt]: e.target.value,
    });
  };
  // 登录
  const loginFn = async () => {
    const obj = await LoginApi(userInfo);
    let initRouter = [];
    console.log(obj, userInfo);
    if (obj.status === 200) {
      // 存储token
      localStorage.setItem("authorization", obj.data.token);
      notification["success"]({
        message: "系统提醒",
        description: '欢迎回来',
      });
      getMenuApi().then((res) => {
        initRouter = handelFilterRouter(res.data);
        console.log(initRouter);
        dispatch({
          type: "CHANGE_ROUTER",
          value: initRouter,
        });
        navigate("/", { replace: true });
      });
      return;
    }
  };
  return (
    <div
      style={{
        background: "url(" + loginImg + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
      }}
      className="login_box"
    >
      <div className="login_center">
        <h1 id="login_h1">Login</h1>
        <Input
          placeholder="username"
          value={userInfo.username}
          bordered={false}
          onChange={(e) => changeInput(e, "username")}
        />
        <Input.Password
          placeholder="input password"
          value={userInfo.password}
          onChange={(e) => changeInput(e, "password")}
          bordered={false}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Button type="primary" className="login_btn" onClick={loginFn}>
          登陆
        </Button>
      </div>
    </div>
  );
}
