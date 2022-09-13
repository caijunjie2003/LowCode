import React, { useEffect, useRef, useState } from "react";
import Drag from "../../components/Drag/Drag";
import { Form, Input, Switch, Radio, Button, Tabs } from "antd";
import "./index.css";
export default function CeShi() {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [domTree, setDomTree] = useState([]);
  const [radioValue, setradioValue] = useState(1);
  const [textArr, setTextArr] = useState([
    {
      config_name: "input",
      text: "单行文本",
    },
    { config_name: "switch", text: "开关" },
    { config_name: "radioGroup", text: "单选框组" },
    { config_name: "button", text: "按钮" },
  ]);
  const items = [
    { label: "项目 1", key: "item-1", children: "内容 1" }, // 务必填写 key
    { label: "项目 2", key: "item-2", children: "内容 2" },
  ];
  useEffect(() => {
    // 处理数组每一项的 定位值 外边距10 width60 height20
    // 一行只允许 4个
    let arr = [...textArr];
    let lie = 0;
    let han = 0;
    arr = arr.map((item, index) => {
      console.log(window.Math.trunc(index % 4)); //拿到第几行
      let obj = {};
      obj = {
        ...item,
        top: han * 40,
        left: lie * 70,
        ["lie"]: lie,
      };
      if (lie === 4) {
        han += 1;
        lie = 0;
      } else {
        lie += 1;
      }
      return obj;
    });
    setTextArr(arr);
    console.log(arr, lie, han);
  }, []);
  // 记录鼠标在元素内部的位置
  // innerTop:鼠标距离元素上方的距离
  // innerLeft:鼠标距离元素左边的距离
  let innerTop;
  let innerLeft;
  // 结束拖拽事件
  const Drageedn = (e, obj) => {
    console.log("dragEnd", e);
    /** 在拖拽结束后记录鼠标距离左边边界和上边边界的距离 */
    console.log(e.clientX - innerLeft);
    if (e.clientX - innerLeft >= 280 - obj.lie * 70) {
      console.log("超出了父盒子咯", obj.text);
      const arr = [...domTree];
      arr.push({
        ["config_name"]: obj.config_name,
        label: obj.text,
      });
      setDomTree(arr);
    }
    setLeft(e.clientX - innerLeft);
    setTop(e.clientY - innerTop);
    setLeft(0);
    setTop(0); // 重写停止移动事件，阻止回到原地
    // e.preventDefault();
  };
  // 开始拖拽事件
  const onDragStart = (e) => {
    console.log("start", e);
    // 开始的时候，记录，鼠标在定位元素的x，y轴
    innerTop = e.clientY - top;
    innerLeft = e.clientX - left;
  };
  const onTabsChange = (key) => {
    console.log(key);
  };
  const DomClick = (index) => {
    console.log(index, domTree[index]);
  };
  const onFinish = (changedFields, allFields) => {
    console.log(changedFields, allFields);
  };
  return (
    <div
      className="Ceshi_app"
      onDragOver={(e) => {
        // 重写停止移动事件，阻止回到原地
        // e.preventDefault();
      }}
    >
      {/* <div
        className="Ceshi_box"
        // 是否允许元素拖拽
        draggable
        style={{ left: left, top: top }}
        onDragEnd={Drageedn}
        onDragStart={onDragStart}
      ></div> */}

      {/* left */}
      <div className="Ceshi_left" style={{ position: "relative" }}>
        {textArr.map((item) => {
          return (
            <div
              className="Ceshi_li"
              style={{ left: item.left + "px", top: item.top + "px" }}
              draggable
              onDragEnd={(e) => Drageedn(e, item)}
              onDragStart={onDragStart}
            >
              {item.text}
            </div>
          );
        })}
        {/* 单行文本 */}
      </div>
      {/* center */}
      <div className="Ceshi_center">
        我是添加组件区域哦
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          labelWrap={true}
        >
          {domTree.map((item, index) => {
            return (
              <Form.Item
                onClick={() => DomClick(index)}
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
                  <Radio.Group
                    onChange={(e) => {
                      setradioValue(e.target.value);
                    }}
                    value={radioValue}
                  >
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                  </Radio.Group>
                ) : item.config_name === "button" ? (
                  <Button>按钮</Button>
                ) : (
                  ""
                )}
              </Form.Item>
            );
          })}
        </Form>
      </div>
      {/* right */}
      <div className="Ceshi_right">
        我是右侧的设置界面哦
        <Tabs items={items}>
          <Tabs.TabPane tab="字段属性" key="item-1">
            <Form
              {...layout}
              form={form2}
              name="control-hooks"
              onFieldsChange={onFinish}
            >
              <Form.Item
                name="label"
                label="标题"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="表单属性" key="item-2" disabled></Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
