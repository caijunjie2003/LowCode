import React, { useContext, useRef, useEffect } from "react";
// 饼图
import Context from "../../../../utils/Context";
export default function PieChart(props) {
  // 导入Context全局对象，使用useContext获取状态
  const { echarts } = useContext(Context);
  const ref = useRef();
  let echartsInstance = null;
  console.log(echarts);
  useEffect(() => {
    initEcharts();
  }, []);
  const initEcharts = () => {
    echartsInstance = echarts.init(ref.current, "theme");
    const initOption = {
      title: {
        text: "PieChart",
        subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        bottom: 10,
        left: "center",
        data: ["示例一", "示例二", "示例三", "示例四", "示例五"],
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "示例一" },
            { value: 735, name: "示例二" },
            { value: 580, name: "示例三" },
            { value: 484, name: "示例四" },
            { value: 300, name: "示例五" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    echartsInstance.setOption(initOption);
  };
  const getData = () => {};
  const updateEcharts = () => {};
  const screenAdaper = () => {};
  return (
    <div
      id="Histogram"
      style={{ width: "1000px", height: "300px" }}
      ref={ref}
    ></div>
  );
}
