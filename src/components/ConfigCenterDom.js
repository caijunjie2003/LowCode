export const configAll = () => {
    return [
        {
            ["config_name"]: 'input',
            label: "标题",
            name: "label",
        },
        {
            ["config_name"]: 'input',
            label: "宽度",
            name: "width",
        },

    ]
}
export const configInput = () => {
    return [
        ...configAll(),
        // {
        //   config_name: "switch",
        //   label: "显示为密码",
        // },
        {
            ["config_name"]: 'input',
            label: "占位内容",
            name: "placeholder",
        },
        {
            ["config_name"]: 'input',
            label: "默认值",
            name: "defautlValue",
        },
        {
            ["config_name"]: 'input',
            label: "数据绑定key",
            name: "defaultKey",
        }
    ]
}
