import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import Context from './utils/Context'
const root = ReactDOM.createRoot(document.getElementById("root"));
import * as echarts from 'echarts'
root.render(
  <Provider store={store}>
    <HashRouter>
      {/* 使用Context.Provider组件 注入状态 */}
      <Context.Provider value={{ echarts }}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Context.Provider>
    </HashRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
