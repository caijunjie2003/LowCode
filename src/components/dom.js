import { Form, Input, Switch, Radio, Button, Tabs, Tree, Select } from "antd";
import React from "react";
export const renderingDomTree = (arr) => {
    return arr.map((item, index) => {
        return (
            <Form.Item
                key={index}
                label={item.label !== "按钮" ? item.label : ""}
                valuePropName={item.config_name === "switch" ? "checked" : "value"}
                name={item.defaultKey}
                style={{ width: item.width || "100%" }}
            >
                {item.config_name === "input" ? (
                    <Input placeholder={item.placeholder} disabled={item.disabled} />
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
                    <Select ></Select>
                ) : (
                    ""
                )}
            </Form.Item>
        );
    });
}