// 管理数据的文件
//1.声明默认数据
//2.导出一个修改数据的函数

const defulatState = {
  userInfo: "",
  initRouter: [],
};

const reducer = (state = defulatState, action) => {
  // 这个函数专门用来修改这个数据 state
  console.log("执行了", action);
  //   一般不会去直接修改state
  const newState = {
    ...state,
  };
  switch (action.type) {
    case "CHANGE_USERINFO":
      return changeUserinfoFn(newState, action);
    case "CHANGE_ROUTER":
      return changeRouterFn(newState, action);
    default:
      return state;
  }
};
const changeUserinfoFn = (newState, action) => {
  newState.userInfo = action.value;
  return {
    ...newState,
  };
};
const changeRouterFn = (newState, action) => {
  newState.initRouter = action.value;
  return {
    ...newState,
  };
};
export default reducer;
