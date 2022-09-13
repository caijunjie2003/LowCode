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
        render: (_, record) => (
            <Space size="middle">
                <a>编辑</a>
                <a>设计表单</a>
            </Space>
        ),
    },
];