  ## 低代码平台
## 使用 react + react-hooks + react-router@V6 + redux + react-redux + redux-persist + pm2 + cors + node.js + express + expressjwt + joi + bcrypt.js 
## 实现 动态路由添加
## 实现 redux持久化，使用 redux-persist管理redux，解决页面刷新后redux数据丢失的问题
## 使用lazy方法+Suspense包裹顶级组件的组合进行路由的懒加载，优化页面整体的性能
## 封装组件映射方法，解决 redux-persist 存储的redux值为组件时的问题
## 实现表单设计器，实现了一个可视化可供用户拖拽生成的表单界面，并且将表单数据存储数据库，并增加导出导入功能，快捷生成表单，极大提高开发效率
## 使用 react-sortable-hoc + array-move 实现对自定义表单控件的拖拽以及重新排序
## 实现动态菜单渲染，生成树级表格，默认是以动态路由数据进行渲染，可自定义新增和删除菜单，提高开发效率
## 使用useImperativeHandle，forwardRef转发可以让你再使用ref时自定义暴露给父组件的实例值，解决了函数组件不能使用ref的问题
## 封装路由拦截组件，拦截没有token的用户，确保程序的安全性
## 借鉴react-router源码，自定义hook 实现路由跳转组件的封装


## 使用express操作mysql数据库，封装query方法，便捷使用sql语句对数据库进行增删改查
## 使用 cors 中间件对跨域进行处理
## 使用 jwt中间件 生成 token加密用户信息，使用 expressjwt 中间件对请求头token进行自动处理
## 使用 bcryptjs 对用户密码进行加盐处理存入数据库，在用户登录时进行解密反序列对比，避免用户隐私泄露，未知攻击
## 使用 joi 中间件对请求参数进行自动校验，将更专注与业务而不是数据校验
## 将node.js后台所有的接口处理函数以及参数校验进行组件化路由模块管理，将代码更加具有复用性更加容易维护
## 在服务器中安装docker，配置docker镜像映射前端目录，将前端打包后代码部署在服务器
## 使用PM2持久化在服务器中运行node.js后端代码
## docker配置mysql目录映射，在本机创建目录，mysql持久化存储


