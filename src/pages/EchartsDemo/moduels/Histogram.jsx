import React, { useContext, useEffect, useRef } from "react";
import Context from "../../../utils/Context";
// 折线图
export default function Histogram() {
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
        text: "Historgram",
      },
      xAxis: {
        type: "category",
        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
      },
      tooltip: {
        show: true,
        trigger: "axis",
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130,142,500,600,321,120],
          type: "bar",
        },
      ],
    };
    echartsInstance.setOption(initOption);
  };
  const getData = () => {};
  const updateEcharts = () => {};
  const screenAdaper = () => {};
  return (
    <div id="Histogram" style={{ width: "1000px", height: "300px" }} ref={ref}>
      Histogram
    </div>
  );
}
