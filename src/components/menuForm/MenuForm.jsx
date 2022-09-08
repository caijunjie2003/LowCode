import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Switch,
  Radio,
  message,
  Select,
} from "antd";
import { addMenuApi, getMenuApi } from "../../api/index";
import { handelFilterRouter } from "../../utils/router";
import { useDispatch, useSelector } from "react-redux";
// 封装表格组件
export default function MenuForm(props) {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const initRouter = useSelector((state) => state.initRouter);
  const dispatch = useDispatch();
  const { Option } = Select;
  const Options = initRouter.map((item) => {
    return <Option value={item.id+''}>{item.name}</Option>;
  });
  const onFinish = async (values) => {
    console.log("Success:", values);
    const obj = await addMenuApi(values);
    if (obj.status === 200) {
      // 重新请求menu，调用更新方法
      message.success(obj.message);
      props.onclose();
      getMenuApi().then((res) => {
        let initRouter = [];
        initRouter = handelFilterRouter(res.data);
        console.log(initRouter);
        dispatch({
          type: "CHANGE_ROUTER",
          value: initRouter,
        });
      });
    } else {
      message.error(obj.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onRequiredTypeChange = (changedValues, allValues) => {
    setFormData({
      ...formData,
      ...changedValues,
    });
  };
  const handleChange = (value) => {
    console.log(value);
  };
  return (
    <div>
      {" "}
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          menuType: "0",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelWrap={true}
        onValuesChange={onRequiredTypeChange}
      >
        <Form.Item label="菜单类型" name="menuType">
          <Radio.Group>
            <Radio.Button value="0">一级菜单</Radio.Button>
            <Radio.Button value="1">子菜单</Radio.Button>
            <Radio.Button value="2" disabled>
              按钮/权限
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        {formData.menuType === "1" ? (
          <Form.Item label="父菜单Id" name="parantId" required>
            <Select  onChange={handleChange}>
              {Options}
            </Select>
          </Form.Item>
        ) : (
          ""
        )}
        <Form.Item label="菜单名称" name="menuName" required>
          <Input />
        </Form.Item>
        <Form.Item label="访问路径" name="menuRouter" required>
          <Input />
        </Form.Item>
        <Form.Item
          label="前端组件"
          name="PageView"
          required={formData.menuType === "1" ? true : false}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          label="组件名称"
          name="password"
          tooltip={{
            title: "Tooltip with customize icon",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input />
        </Form.Item> */}
        {/* <Form.Item label="默认跳转地址" name="password">
          <Input />
        </Form.Item> */}
        {/* <Form.Item label="排序" name="password">
          <Input />
        </Form.Item> */}

        {/* <Form.Item label="是否显示" valuePropName="checked">
          <Switch />
        </Form.Item> */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
