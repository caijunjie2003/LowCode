import { Button } from "antd";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, Suspense } from "react";
import { getMenuApi } from "./api";
// import { handelFilterRouter } from "./router";
import { useRoutes, Routes, Route } from "react-router-dom";
import { handelFilterElement, handelEnd } from "./utils/router";
import routes from "./router";

function App() {
  const Router = useSelector((state) => state.initRouter);
  const [rout, setrout] = useState(routes);
  const elemt = useRoutes(rout);
  console.log(Router);
  // 监听路由表改变重新渲染
  useEffect(() => {
    // deepCopy 深拷贝state数据 不能影响到store里的数据！

    // handelFilterElement 映射对应组件(在渲染之前，使用Lazy将为字符串的element属性变为组件，redux-persist 管理的 redux 数据，不能是组件类型，否则会出错，我们应该管理的是字符串，而在渲染之前进行映射)
    // handelEnd 将路由表嵌入默认路由表得到完整路由表
    console.log(handelFilterElement(JSON.parse(JSON.stringify(Router))));
    const end = handelEnd(
      handelFilterElement(JSON.parse(JSON.stringify(Router)))
    );
    setrout(end);
  }, [Router]);
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<Home></Home>}>
          <Route index element={<Index></Index>}></Route>
        </Route>
        <Route path="/xiton" element={<Home></Home>}>
          <Route path="menu" element={<Menu></Menu>}></Route>
          <Route path="ceshi" element={<CeShi></CeShi>}></Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes> */}

      {/* 需要使用Suspense组件包裹 懒加载的路由，指定组件未加载出，则需要使用 fallback属性，在指定页面出现前，加载对应的内容 */}
      <Suspense fallback={null}>{elemt}</Suspense>
    </div>
  );
}

export default App;
