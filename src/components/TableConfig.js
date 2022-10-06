// 表单
import { Space } from "antd";
export const columns = [

    {
        title: "表单名称",
        dataIndex: "fromName",
        key: "name",
        align: 'center',
        render: (text) => <a>{text}</a>,
    },
    {
        title: "表单编码",
        dataIndex: "fromId",
        key: "fromId",
        align: 'center',
        render: (text) => <a>{text}</a>,
    },
    {
        title: "操作",
        key: "action",
        align: 'center',
    },
];


export const MenusColumns = [
    {
        title: "菜单名称",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "菜单类型",
        dataIndex: "parant_id",
        key: "parant_id",
        render: (text) => <a>{text ? '2级菜单' : '1级菜单'}</a>,
    },
    {
        title: "组件",
        dataIndex: "element",
        key: "element",
        render: (text) => <a>{text || '/'}</a>,
    },
    {
        title: "路径",
        dataIndex: "path",
        key: "path",
        render: (text) => <a>{text}</a>,
    },
]