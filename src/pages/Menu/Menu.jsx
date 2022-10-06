import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import MenuForm from "../../components/menuForm/MenuForm";
import { Space, Switch, Table, utton, Drawer, Form, Button } from "antd";
import { MenusColumns } from "../../components/TableConfig";
// rowSelection objects indicates the need for row selection
export default function Menu() {
  const userInfo = useSelector((state) => state.userInfo);
  const initRouter = useSelector((state) => state.initRouter);
  const ref = useRef(null);
  useEffect(() => {
    let router = [...initRouter];
    router = router.map((item) => {
      item.children = item.children?.map((chid) => {
        return {
          key: chid.id,
          ...chid,
        };
      });
      return {
        key: item.id,
        ...item,
      };
    });
    setTableDate(router);
  }, [initRouter]);
  const [tableData, setTableDate] = useState("");
  const [visible, setVisible] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);
  console.log(userInfo, initRouter);
  const addMenufn = () => {
    setVisible(true);
  };
  const onClose = () => {
    ref.current.clertFormval();
    setVisible(false);
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  return (
    <div>
      <Button type="primary" onClick={addMenufn}>
        新增菜单
      </Button>

      <Drawer
        title="新增菜单"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={600}
      >
        <div>
          <MenuForm onclose={onClose} ref={ref} />
        </div>
      </Drawer>
      {/* <Button type="primary"></Button> */}

      <Space
        align="center"
        style={{
          marginBottom: 16,
        }}
      ></Space>
      <Table
        columns={MenusColumns}
        rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={tableData}
      />
    </div>
  );
}
