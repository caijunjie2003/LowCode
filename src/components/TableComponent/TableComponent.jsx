import React from "react";
import { Space, Table, Tag } from "antd";
import { columns } from "../TableConfig";
const data = [
  {
    fromName: "test_测试01",
    fromId: "q_01121",
  },
  { fromName: "test_测试02", fromId: "q_01121" },
  { fromName: "test_测试03", fromId: "q_01121" },
];
export default function TableComponent(props) {
  return (
    <div>
      <Table columns={columns} dataSource={props.tableData} />
    </div>
  );
}
