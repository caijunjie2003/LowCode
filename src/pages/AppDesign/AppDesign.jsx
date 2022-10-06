import React, { useEffect, useState } from "react";
import "./index.css";

import axios from "axios";
export default function AppDesign() {
  // axios({
  //   url: "http://192.168.1.150:8700/mc/businessNumber/exportExcle",
  //   method: "get",
  //   headers: {
  //     ["Authorization"]:
  //       "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImFhNzFlMDRhLTA4OWUtNGZhYy1hYzg3LTU0NzYwMDY4YWM1ZiJ9.bH_DRt3u2u-7MYxnZjxx1wDQ6sM3HrcHi_H8-mIAEnamY1jz3dWphumggTDDUqd7r1PhEJ8N_VBMfA5sV7INEw",
  //   },
  // }).then((res) => {
  //   console.log(res);
  //   const a = document.createElement("a");
  //   a.download = "导出模板.xlsx"; // 下载文件的名字
  //   a.style.display = "none";
  //   a.href = 'http://192.168.1.30:8710/home/data/mc/uploadPath/upload/template/voiceCode.xlsx';
  //   a.click();
  //   a.remove();
  // });
  console.log("重新渲染");
  const [day, setDay] = useState("");
  function getDate() {
    var today = new Date();
    var time =
      twoDigits(today.getHours()) + ":" + twoDigits(today.getMinutes());
    setDay(time);
  }

  function twoDigits(val) {
    if (val < 10) return "0" + val;
    return val;
  }
  useEffect(() => {
    let timer = null;
    timer = setInterval(() => {
      getDate();
    }, 1000);
    // react-hooks useEffect第一个参数return一个表达式，在组件销毁时执行
    return console.log(timer, "组件销毁了");
  }, []);
  return (
    <div className="App_center">
      <div className="App_l">
        <div className="phone">
          <div className="phone_bg1">
            <div className="phone_bg2">
              <div className="phone_bg3">
                <div className="phone_lh">
                  <div className="phone_lh_con">
                    <div className="lh_tiao"></div>
                    <div className="lh_yuan"></div>
                  </div>
                </div>
                <span className="date_time">{day}</span>

                <div className="states">
                  <ul className="ul_xinhao">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>

                  <div className="wifi1">
                    <div className="wifi2">
                      <div className="wifi3">
                        <div className="wifi4">
                          <div className="wifi5"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dianliang"></div>
                </div>

                <div className="phone_home"></div>
              </div>
            </div>
            12312
          </div>
          <div className="jingyin"></div>
          <div className="yl_jia"></div>
          <div className="yl_jian"></div>
          <div className="suoping"></div>
        </div>
      </div>
      <div className="App_r"></div>
    </div>
  );
}
