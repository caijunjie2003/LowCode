import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Switch,
  Radio,
  Button,
  Tabs,
  Tree,
  Select,
  Col,
  Row,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import "./center.css";
export default function Center(props) {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    props.changesortable(oldIndex, newIndex);
  };
  const domClick = (index) => {
    console.log(index);
    // 说明用户只是触摸了，没有进行拖拽，需要将点击该项的下标 传出去
    props.DomClick(index);
    // 用户点击，需要更改当前点击的该项的样式 避免dom的重新渲染
    props.handleDomMouseoveStyleFn(index);
  };
  const deteleFn = (index) => {
    console.log(index);
    // 移除DOM树
    // 重新存入数据库
    props.deleteFn(index);
  };
  const SortableItem = SortableElement(({ item, sortIndex }) => (
    <Form.Item
      key={sortIndex}
      label={item.label !== "按钮" ? item.label : ""}
      valuePropName={item.config_name === "switch" ? "checked" : "value"}
      name={item.defaultKey}
      style={{
        width: item.width || "100%",
        height: item.height + "px" || "100%",
        zIndex: "99999999999",
        // borderTop: item.mouseove ? "1px solid blue" : "",
      }}
    >
      <Row gutter={24}>
        <Col
          className="gutter-row"
          span={20}
          onClick={() => domClick(sortIndex)}
        >
          {item.config_name === "input" ? (
            <Input placeholder={item.placeholder} />
          ) : item.config_name === "switch" ? (
            <Switch />
          ) : item.config_name === "radioGroup" ? (
            <Radio.Group value="">
              {item.options
                ? item.options.map((items) => {
                    return <Radio value={items.value}>{items.label}</Radio>;
                  })
                : [1, 2, 3].map((items) => {
                    return <Radio>选项{items}</Radio>;
                  })}
            </Radio.Group>
          ) : item.config_name === "button" ? (
            <Button>{item.label}</Button>
          ) : item.config_name === "select" ? (
            <Select open={false} placeholder={item.placeholder}></Select>
          ) : (
            ""
          )}
        </Col>
        <Col className="gutter-row" span={4}>
          {item.mouseove ? (
            <DeleteOutlined onClick={() => deteleFn(sortIndex)} />
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Form.Item>
  ));
  const SortableList = SortableContainer(({ items }) => {
    console.log(items);
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${value.name}${index}`}
            index={index}
            item={value}
            sortIndex={index}
          />
        ))}
      </ul>
    );
  });
  return (
    <SortableList
      items={props.arr}
      onSortEnd={onSortEnd}
      helperClass="Center_top_boder"
      // 用户移动的最小距离，才启用排序
      distance="5"
    ></SortableList>
  );
}
