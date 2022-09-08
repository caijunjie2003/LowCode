import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Drawer, Form } from "antd";
import MenuForm from "../../components/menuForm/MenuForm";
export default function Menu() {
  const userInfo = useSelector((state) => state.userInfo);
  const [visible, setVisible] = useState(false);
  console.log(userInfo);
  const addMenufn = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={addMenufn}>
        新增菜单
      </Button>

      <Drawer
        title="新增菜单"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={600}
      >
        <div>
          <MenuForm onclose={onClose} />
        </div>
      </Drawer>
      {/* <Button type="primary"></Button> */}
    </div>
  );
}
