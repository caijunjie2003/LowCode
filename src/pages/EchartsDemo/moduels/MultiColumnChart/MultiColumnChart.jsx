import React, { useContext, useRef, useEffect } from "react";
import Context from "../../../../utils/Context";
// 多列柱状图
export default function MultiColumnChart() {
  const { echarts } = useContext(Context);
  const ref = useRef();
  let echartsInstance = null;
  useEffect(() => {
    initEcharts();
  }, []);
  const initEcharts = () => {
    echartsInstance = echarts.init(ref.current, "theme");
    const initOption = {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "上午", "中午", "下午"],
          ["星期一", 43.3, 85.8, 93.7],
          ["星期二", 83.1, 73.4, 55.1],
          ["星期三", 86.4, 65.2, 82.5],
          ["星期四", 72.4, 53.9, 39.1],
          ["星期五", 60.4, 23.9, 40.1],
        ],
      },
      xAxis: { type: "category" },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
    };
    echartsInstance.setOption(initOption);
  };
  const getData = () => {};
  const updateEcharts = () => {};
  const screenAdaper = () => {};
  return (
    <div
      ref={ref}
      id="Histogram"
      style={{ width: "1000px", height: "300px" }}
    ></div>
  );
}
