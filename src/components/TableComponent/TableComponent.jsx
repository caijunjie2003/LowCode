import React from "react";
import { Space, Table, Tag } from "antd";
const data = [];
export default function TableComponent({ columns, tableData }) {
  return (
    <div>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
}
