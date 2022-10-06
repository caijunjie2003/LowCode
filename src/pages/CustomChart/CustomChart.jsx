import React from "react";
var _state;
export default function CustomChart() {
  // 模拟useState
  function useState_(initValue) {
    _state = _state | initValue;
    function setState_(newState) {
      // 每次渲染组件的时候，state都是新重置的，react内部是闭包把state提取出来了
      _state = newState;
      // render();
    }
    return [_state, setState_];
  }
  const [value, setValue] = useState_(0);
  return (
    <div
      onClick={() => {
        setValue(value + 1);
      }}
    >
      模拟hooks实现原理 {_state}
    </div>
  );
}
