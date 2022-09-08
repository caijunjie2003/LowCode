import React, { useState, useRef } from "react";
import { Button, Drawer, Modal } from "antd";
import FormList from "../../components/FormList/FormList";
import { addForm } from "../../components/PopConfiguration";
import Table from "../../components/Table/Table";

export default function FormPage() {
  const ref = useRef(null);
  const showModal = () => {
    ref.current.showModal();
  };
  return (
    <div>
      {" "}
      <Button type="primary" onClick={showModal}>
        新增表单
      </Button>
      <Table></Table>
      <FormList ref={ref} formValue={addForm}></FormList>
    </div>
  );
}
