// 弹出层配置文件
export const addForm = [
    {
        config_name: "input",
        label: '表单名称',
        defaultKey: "fromName",
        placeholder: '',
        rules: [
            {
                required: true,
                message: 'Please input your E-mail!',
            },
        ]
    },
    {
        config_name: "input",
        label: '表单编码',// 弹出层配置文件
        defaultKey: "fromId",
        placeholder: '',
        rules: [
            {
                required: true,
                message: 'Please input your E-mail!',
            },
        ]
    },
    {
        config_name: "switch",
        label: 'Online表单',
        defaultKey: "fromFlag",
        rules: [
            {
                required: false,
                message: 'Please input your E-mail!',
            },
        ]
    },
];
