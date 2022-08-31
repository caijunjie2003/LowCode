import React, { useEffect, useState } from "react";
import { Input, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { LoginApi } from "../../api";
import loginImg from "./imgs/login.jpeg";
import { useNavigate } from "react-router-dom";
import "./index.css";
export default function Login() {
  const navigate = useNavigate();
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
    console.log(obj, userInfo);
    if (obj.status === 200) {
      message.success("欢迎您 亲爱的admin~");
      return navigate("/", { replace: true });
    }
    message.error("请输入正确的账号和密码");
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
