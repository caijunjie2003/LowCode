import React from "react";
// 本组件，实现推拽任意dom的功能
export default function Drag(props) {
  console.log(props.dom); //得到组件体内部的dom
  //   const Children = props.children;
//   props.dom.onDragEnd = (e) => {
//     console.log("dragEnd", e);
//     e.preventDefault();
//   };
  return <div></div>;
}
