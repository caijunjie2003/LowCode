import React, { useState, useRef, useEffect } from "react";
import { Button, Drawer, Modal, message, Space, Form } from "antd";
import FormList from "../../components/FormList/FormList";
import { addForm } from "../../components/PopConfiguration";
import TableComponent from "../../components/TableComponent/TableComponent";
import { addFormApi, getFormApi, updateFormApi } from "../../api";
import { columns } from "../../components/TableConfig";
import CeShi from "../CeShi/CeShi";
export default function FormPage() {
  const [newAddForm, setNewAddForm] = useState([]);
  const ref = useRef(null);
  const Formref = useRef(null);
  const [tableData, setTableData] = useState([]);
  const [sholwModal, setsholwModal] = useState(false);
  const [formData, setFormData] = useState("");
  const [open, setOpen] = useState(false);
  const [clickRecord, setClickRecord] = useState({});
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    Formref.current.cloneFn();
  };
  const showOpenForm = (record) => {
    console.log(record);
    setClickRecord(record);
    showDrawer();
  };

  columns.map((item) => {
    if (item.key === "action") {
      item.render = (_, record) => (
        <Space size="middle">
          <a onClick={() => edit(record)}>编辑</a>
          <a onClick={() => showOpenForm(record)}>设计表单</a>
        </Space>
      );
    }
  });
  useEffect(() => {
    if (formData) {
      ref.current.showModal();
    }
  }, [formData]);
  useEffect(() => {
    getFormApi().then((res) => {
      console.log(res);
      if (res.status === 200) {
        setTableData(res.data);
      }
    });
  }, []);
  // 新增
  const showModal = () => {
    setFormData();
    setsholwModal(false);
    setNewAddForm(addForm);
    setTimeout(() => {
      ref.current.showModal();
    }, 0);
  };
  // 关闭弹窗
  const clonseFn = () => {
    setNewAddForm([]);
  };
  // 编辑
  const edit = (record) => {
    setsholwModal(true);
    // 处理表格配置项，将数组的项变为禁用
    const arr = JSON.parse(JSON.stringify(addForm));
    arr.forEach((item) => {
      if (item.defaultKey === "fromId") {
        item.disabled = true;
      }
    });
    setNewAddForm(arr);
    console.log(newAddForm, addForm);
    setFormData(record);
  };
  const subimtFn = async (formValue) => {
    let obj;
    if (sholwModal) {
      obj = await updateFormApi(formValue);
    } else {
      obj = await addFormApi(formValue);
    }
    if (obj.status === 200) {
      message.success(obj.message);
      ref.current.handleCancel();
    } else {
      message.error(obj.message);
    }
    console.log(obj);
  };
  return (
    <div>
      {" "}
      <Button type="primary" onClick={showModal}>
        新增表单
      </Button>
      <TableComponent tableData={tableData} columns={columns}></TableComponent>
      <FormList
        ref={ref}
        formValue={newAddForm}
        data={formData}
        subimtFn={subimtFn}
        title={sholwModal ? "编辑表单" : "新增表单"}
        clonseFn={clonseFn}
      ></FormList>
      <Drawer
        title="设计表单"
        placement="right"
        width="100%"
        onClose={onClose}
        visible={open}
      >
        <CeShi fromData={clickRecord} ref={Formref}></CeShi>
      </Drawer>
    </div>
  );
}
