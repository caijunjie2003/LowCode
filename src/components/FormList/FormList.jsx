import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import {
  Button,
  Checkbox,
  Form,
  Modal,
  Switch,
  Input,
  Radio,
  Tabs,
  Tree,
  Select,
} from "antd";
// 封装表格组件
import "./index.css";
import { renderingDomTree } from "../dom";
function FormList(props, ref) {
  /**
   * @param data
   * 用于接收父组件的传递过来的数据，用于渲染表单控件的值
   * @param formValue
   * 是父组件传递过来的配置文件，用于渲染表单的控件
   *
   */

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
    props.subimtFn(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const showModal = () => {
    setIsModalOpen(true);
    console.log(props);
    if (props.data) {
      // 这是直接数据回显
      form.setFieldsValue(props.data);
    } else {
      // 这是 自定义表格，给每一项设置的初始值
      const arr = [...props.formValue];
      const obj = {};
      arr.map((item) => {
        // 将每一个控件的 组成 defaultKey ： defautlValue的对象
        obj[item.defaultKey] = item.defautlValue;
      });
      console.log(obj);
      // 处理form初始值
      form.setFieldsValue(obj);
    }
  };
  // ref是无法挂载到函数式组件上的，因为函数时组件没有实例它是一个函数
  // useImperativeHandle 可以让你再使用ref时自定义暴露给父组件的实例值,应当于 forwardRef一起使用
  useImperativeHandle(ref, () => ({
    showModal,
    handleCancel,
  }));
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    // 如果是由父组件传进来数据就要清空父组件的数据哦~
    form.setFieldsValue({});
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        footer={null}
        title={props.title}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelWrap={true}
        >
          {renderingDomTree(props.formValue)}
          {/* {props.formValue.map((item, index) => {
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
                ) : item.config_name === "radioGroup" ? (
                  <Radio.Group value="">
                    {item.options
                      ? item.options.map((items) => {
                          return (
                            <Radio value={items.value}>{items.label}</Radio>
                          );
                        })
                      : [1, 2, 3].map((items) => {
                          return <Radio>选项{items}</Radio>;
                        })}
                  </Radio.Group>
                ) : item.config_name === "button" ? (
                  <Button>{item.label}</Button>
                ) : item.config_name === "select" ? (
                  <Select></Select>
                ) : (
                  ""
                )}
              </Form.Item>
            );
          })} */}
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
