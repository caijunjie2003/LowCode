import React, { lazy } from "react";
import { Tabs } from "antd";
import Histogram from "./moduels/Histogram";
import PieChart from "./moduels/PieChart/PieChart";
import MultiColumnChart from "./moduels/MultiColumnChart/MultiColumnChart";
export default function EchartsDemo() {
  // 初始化Echarts
  // 更新Echarts
  // 获取数据
  // 分辨率适配
  const items = [
    {
      label: "柱状图",
      key: "item-1",
      children: <Histogram />,
    }, // 务必填写 key
    { label: "多列柱状图", key: "item-2", children: <MultiColumnChart /> },
    { label: "多行折线图", key: "item-4", children: "内容 2" },
    { label: "饼图", key: "item-5", children: <PieChart /> },
  ];
  return (
    <div>
      {" "}
      <Tabs items={items} />
    </div>
  );
}
