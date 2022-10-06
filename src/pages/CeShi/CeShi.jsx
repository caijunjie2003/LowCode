import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { configInput, configAll } from "../../components/ConfigCenterDom";
import {
  Form,
  Input,
  Switch,
  Radio,
  Button,
  Tabs,
  Tree,
  Select,
  message,
} from "antd";
import FormList from "../../components/FormList/FormList";
import Center from "./Center";
import { arrayMoveImmutable } from "array-move";
import { saveFormJsonApi } from "../../api";
import "./index.css";
function CeShi(props, ref) {
  useEffect(() => {
    setDomTree(JSON.parse(props.fromData.fromJson) || []);
    // 如果存在的话，需要将fromJson赋值给DOM树进行渲染
  }, [props]);
  useEffect(() => {
    // 处理数组每一项的 定位值 外边距10 width60 height20
    // 一行只允许 4个
    let arr = [...textArr];
    let lie = 0;
    let han = 0;
    arr = arr.map((item, index) => {
      console.log(window.Math.trunc(index % 4)); //拿到第几行
      let obj = {};
      obj = {
        ...item,
        top: han * 40,
        left: lie * 70,
        ["lie"]: lie,
      };
      if (lie === 3) {
        han += 1;
        lie = 0;
      } else {
        lie += 1;
      }
      return obj;
    });
    setTextArr(arr);
    console.log(arr, lie, han);

    // 处理右侧DOM默认选项
  }, []);

  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const formList = useRef(null);
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  let timer = null;
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [clickMouseFlag, setClickMouseFlag] = useState("");
  // 清空dom树
  const cloneFn = () => {
    //
    setDomTree([]);
    setRightTree([]);
  };
  useImperativeHandle(ref, () => ({
    cloneFn,
  }));

  const [formIsShow, setFormIsShow] = useState(false);
  // 中间组件树
  const [domTree, setDomTree] = useState([]);
  // 右侧属性树
  const [rightDomTree, setRightTree] = useState([]);
  const [radioValue, setradioValue] = useState(1);
  // 左侧控件树
  const [textArr, setTextArr] = useState([
    {
      config_name: "input",
      label: "单行文本",
    },
    { config_name: "switch", label: "开关" },
    { config_name: "radioGroup", label: "单选框组" },
    { config_name: "select", label: "下拉框" },
    {
      config_name: "button",
      label: "按钮",
    },
  ]);
  const [formLayout, setFormLayout] = useState("Vertical");
  const items = [
    { label: "项目 1", key: "item-1", children: "内容 1" }, // 务必填写 key
    { label: "项目 2", key: "item-2", children: "内容 2" },
  ];

  // 记录鼠标在元素内部的位置
  // innerTop:鼠标距离元素上方的距离
  // innerLeft:鼠标距离元素左边的距离
  let innerTop;
  let innerLeft;
  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;
  // 开始拖拽事件
  const onDragStart = (e) => {
    console.log("start", e);
    // 开始的时候，记录，鼠标在定位元素的x，y轴
    innerTop = e.clientY - top;
    innerLeft = e.clientX - left;
  };
  // 结束拖拽事件
  const Drageedn = (e, obj) => {
    console.log("dragEnd", e);
    /** 在拖拽结束后记录鼠标距离左边边界和上边边界的距离 */
    console.log(e.clientX - innerLeft);
    if (e.clientX - innerLeft >= 280 - obj.lie * 70) {
      console.log("超出了父盒子咯", obj.label);
      const arr = [...domTree];
      arr.push({
        ["config_name"]: obj.config_name,
        label: obj.label,
        height: "60",
      });
      console.log(arr);
      setClickMouseFlag("");
      setDomTree(arr);
      // 进行右侧dom树赋值
      rightDomTreeFn(obj);
    }
    setLeft(e.clientX - innerLeft);
    setTop(e.clientY - innerTop);
    // 将dom移回去 ----需要优化，暂时先完成功能 2022-9-13
    setLeft(0);
    setTop(0);
  };
  // 右侧DOM渲染
  const rightDomTreeFn = (obj) => {
    initFromValueFn(obj);
    const rightArr = [];
    switch (obj.config_name) {
      case "input":
        rightArr.push(...configInput());
        break;
      default:
        rightArr.push(...configAll());
    }
    setRightTree(rightArr);
  };
  // 处理初始化表单的值
  const initFromValueFn = (obj) => {
    // 先清空上一次的选项的值
    form2.setFieldsValue({
      label: obj.label,
      width: "100%",
      placeholder: "",
      defautlValue: "",
      defaultKey: "",
    });
  };
  // 右侧dom渲染
  const domFn = (arr) => {
    return arr.map((item, index) => {
      return (
        <Form.Item
          key={index}
          label={item.label !== "按钮" ? item.label : ""}
          valuePropName={item.config_name === "switch" ? "checked" : "value"}
          name={item.name || ""}
          style={{ width: item.width || "100%" }}
        >
          {item.config_name === "input" ? (
            <Input
              placeholder={item.placeholder}
              value={item.defautlValue || ""}
            />
          ) : item.config_name === "switch" ? (
            <Switch />
          ) : item.config_name === "radioGroup" ? (
            <Radio.Group value="">
              {item.options
                ? item.options.map((items) => {
                    return <Radio value={items.value}>{items.label}</Radio>;
                  })
                : [1, 2, 3].map((items) => {
                    return <Radio>选项{items}</Radio>;
                  })}
            </Radio.Group>
          ) : item.config_name === "button" ? (
            <Button>{item.label}</Button>
          ) : item.config_name === "select" ? (
            <Select></Select>
          ) : (
            ""
          )}
        </Form.Item>
      );
    });
  };

  // 处理DOM树中的某项元素，进行修改字段属性
  const DomClick = (index) => {
    // let newDomTree = [...domTree];
    setClickMouseFlag(index);
    console.log(domTree[index], index);
    rightDomTreeFn(domTree[index]);
  };
  // 处理DOM树移动
  const changesortable = (oldIndex, newIndex) => {
    const arr = arrayMoveImmutable(domTree, oldIndex, newIndex);
    setDomTree(arr);
  };
  const onRequiredTypeChange = (changedValues, allValues) => {
    // 做一个节流，只执行用户短时间内最后一次的修改
    clearInterval(timer);
    timer = setTimeout(() => {
      console.log(changedValues, allValues);
      // 每次用户输入后，都修改 DOM树中的对应的元素，根据什么来标识(默认是DOM数中的最后一项，除非用户点击了某一项)
      let newDomTree = [...domTree];
      // 如果修改的是初始值框的话，将form表单的初始值变更为用户自定义的值
      if (
        changedValues.hasOwnProperty("defautlValue") ||
        changedValues.defaultKey
      ) {
        form.setFieldsValue({
          ...allValues,
          [newDomTree[newDomTree.length - 1].defaultKey]:
            allValues.defautlValue,
        });
      }
      // 如果用户是拖拽后展示的话，那么就更改最后一个即可
      // 如果用户不是拖拽后展示。那么需要将更改 DOM树中 用户点击对应的索引 的项
      console.log(clickMouseFlag);
      newDomTree[
        clickMouseFlag || clickMouseFlag === 0
          ? clickMouseFlag
          : newDomTree.length - 1
      ] = {
        ...newDomTree[
          clickMouseFlag || clickMouseFlag === 0
            ? clickMouseFlag
            : newDomTree.length - 1
        ],
        ...allValues,
      };

      setDomTree(newDomTree);
    }, 1500);
  };
  // 处理
  // 预览
  const previewFormListFn = () => {
    formList.current.showModal();
  };
  // 处理鼠标拖拽某项DOM的样式更改
  const handleDomMouseoveStyleFn = (index) => {
    // 如果在拖拽过程中 重新渲染DOM的话，会导致拖拽组件内部出现错误
    let arr = JSON.parse(JSON.stringify(domTree));
    arr = arr.map((item, domindex) => {
      return {
        ...item,
        mouseove: index === domindex ? true : false,
      };
    });
    console.log(arr);
    setDomTree(arr);
  };
  // 删除DOM树中的控件
  const deleteFn = (index) => {
    //
  };

  // 保存
  const save = () => {
    const parmas = {
      fromJson: JSON.stringify([...domTree]),
      fromId: props.fromData.fromId,
    };
    saveFormJsonApi(parmas).then((res) => {
      console.log(res);
      if (res.status === 200) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };
  // 导出JSON
  const exportFormListJsonFn = () => {
    console.log(domTree);
    // 构建下载对象
    const blobURL = new window.Blob([JSON.stringify(domTree, null, 2)], {
      type: "application/json",
    });
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = window.URL.createObjectURL(blobURL);
    tempLink.download = "表单JSON";
    // 模仿点击
    document.body.appendChild(tempLink);
    tempLink.click();
    // 删除DOM，开释对象URL
    setTimeout(() => {
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }, 200);
  };
  console.log("最后一次更改的DOM树，也是需要存储在数据库的数据", domTree);
  return (
    <div className="Ceshi_app">
      <div className="Ceshi_left" style={{ position: "relative" }}>
        {textArr.map((item) => {
          return (
            <div
              className="Ceshi_li"
              style={{ left: item.left + "px", top: item.top + "px" }}
              draggable
              onDragEnd={(e) => Drageedn(e, item)}
              onDragStart={onDragStart}
            >
              {item.label}
            </div>
          );
        })}
        {/* 单行文本 */}
      </div>
      {/* center */}
      <div className="Ceshi_center">
        <div className="Ceshi_center_Header">
          <Button
            className="Ceshi_center_btn"
            disabled={!domTree.length}
            onClick={exportFormListJsonFn}
          >
            导出JSON
          </Button>
          <Button disabled className="Ceshi_center_btn">
            导入JSON
          </Button>
          <Button
            onClick={previewFormListFn}
            disabled={!domTree.length}
            className="Ceshi_center_btn"
          >
            预览
          </Button>{" "}
          <Button
            disabled={!domTree.length}
            className="Ceshi_center_btn"
            onClick={save}
          >
            保存
          </Button>
        </div>
        <div style={{ position: "relative" }}>
          <Form
            layout="vertical"
            {...formItemLayout}
            form={form}
            name="basic"
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 24,
            }}
            labelWrap={true}
            initialValues={{}}
            style={{ position: "relative" }}
          >
            <Center
              arr={domTree}
              changesortable={changesortable}
              DomClick={DomClick}
              handleDomMouseoveStyleFn={handleDomMouseoveStyleFn}
              deleteFn={deleteFn}
            ></Center>
          </Form>
        </div>
      </div>
      {/* right */}
      <div className="Ceshi_right">
        {/* 我是右侧的设置界面哦(默认是以最后一次添加的dom为准，样式懒得写) */}
        <Tabs>
          <Tabs.TabPane tab="字段属性" key="item-1">
            <Form
              labelWrap={true}
              form={form2}
              layout="vertical"
              {...formItemLayout}
              name="control-hooks"
              onValuesChange={onRequiredTypeChange}
              initialValues={{}}
            >
              {domFn(rightDomTree)}
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="表单属性" key="item-2" disabled></Tabs.TabPane>
        </Tabs>
      </div>
      <FormList ref={formList} formValue={domTree} title="预览表单"></FormList>
    </div>
  );
}
// 使用forwordRef 转发
export default forwardRef(CeShi);
