import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Button, Checkbox, Form, Input, Modal, Switch } from "antd";
// 封装表格组件
import "./index.css";
function FormList(props, ref) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  // ref是无法挂载到函数式组件上的，因为函数时组件没有实例它是一个函数
  // useImperativeHandle 可以让你再使用ref时自定义暴露给父组件的实例值,应当于 forwardRef一起使用
  useImperativeHandle(ref, () => ({
    showModal,
  }));
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        footer={null}
        title={props.formValue[0].title}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelWrap={true}
        >
          {props.formValue.map((item, index) => {
            return (
              <Form.Item
                name={item.defaultKey}
                rules={item.rules}
                key={index}
                label={item.label}
                valuePropName={
                  item.config_name === "switch" ? "checked" : "value"
                }
              >
                {item.config_name === "input" ? (
                  <Input placeholder={item.placeholder} />
                ) : item.config_name === "switch" ? (
                  <Switch />
                ) : (
                  ""
                )}
              </Form.Item>
            );
          })}
          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
// forwardRef会创建一个组件,这个组件能将其接收到的ref属性转发到其组件树下的另一个组件中
export default forwardRef(FormList);
