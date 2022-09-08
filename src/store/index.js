// store的入口文件（需要一个创建仓库的方法）
import { createStore } from "redux";
import reducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);
// 声明一个仓库,引用reducer的修改数据函数
const store = createStore(
  persistedReducer,
  //   redux拓展工具，大坑，否则无法运行
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);
export default store;
