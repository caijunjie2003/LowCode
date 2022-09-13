import React, { useState, useRef, useEffect } from "react";
import { Button, Drawer, Modal, message } from "antd";
import FormList from "../../components/FormList/FormList";
import { addForm } from "../../components/PopConfiguration";
import TableComponent from "../../components/TableComponent/TableComponent";
import { addFormApi, getFormApi } from "../../api";

export default function FormPage() {
  const ref = useRef(null);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    getFormApi().then((res) => {
      console.log(res);
      if (res.status === 200) {
        setTableData(res.data);
      }
    });
  }, []);
  const showModal = () => {
    ref.current.showModal();
  };
  const subimtFn = async (formValue) => {
    const obj = await addFormApi(formValue);
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
      <TableComponent tableData={tableData}></TableComponent>
      <FormList ref={ref} formValue={addForm} subimtFn={subimtFn}></FormList>
    </div>
  );
}
