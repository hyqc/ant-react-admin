# Antd-React-Admin

> 基于 Ant-Design-React-Pro 构建的管理后台

- 系统设置：
  - 账号管理：提供管理员列表，创建，详情，编辑，禁用，启用，删除，分配角色功能
  - 角色管理：提供角色列表，创建，详情，编辑，禁用，启用，删除，绑定权限功能
  - 菜单管理：提供菜单树列表，创建，详情，编辑，禁用，启用，删除，绑定权限功能
  - 权限管理：提供权限列表，创建，详情，编辑，禁用，启用，删除，绑定接口功能
  - 接口管理：提供接口列表，创建，详情，编辑，禁用，启用，删除


> 实现基于RBAC的权限控制基础业务功能服务，只提供以下功能，以下功能均可开箱即用：
- 登录
- 个人中心
- 账号管理
- 角色管理
- 菜单管理
- 权限管理
- 接口管理

> 后端代码仓库：[https://github.com/hyqc/wei](https://github.com/hyqc/wei)
前端菜单为接口返回的动态菜单，接口配置请参考以下原则：
- 权限只绑定到具体的页面，该页面为前端展示具体内容的路径页面，示例：账号管理，对应接口的账号列表/admin/user/list，在这个页面上有添加账号，修改密码，删除账号，详情，分配角色等等按钮，前端通过后端返回的权限唯一键，示例：AdminUserView（查看）来控制页面上的操作按钮的渲染与否，若当前用户拥有账号的查看和编辑权限，没有删除权限，在该账号列表页中的展现形式是：可以看到：详情，添加账号，编辑，启用禁用等按钮，看不到删除按钮，若不小心放出删除按钮，也可以放心，后端要验证当前用户能否执行删除操作。


![image](https://user-images.githubusercontent.com/33064604/184541956-a03f42df-a51a-4a93-bbd9-00d1dce2b7f7.png)

![image](https://user-images.githubusercontent.com/33064604/184541924-9fb6c21d-37a6-47f7-9e23-d4d6ff34ef9b.png)

![image](https://user-images.githubusercontent.com/33064604/184542906-8808cc44-9478-405c-9a16-9a317956138a.png)

![image](https://user-images.githubusercontent.com/33064604/184543103-ea84eccb-8abb-482a-b5ef-335befecf7cd.png)


# 环境
- JAVA 1.8
- Mysql 8

# 数据库表
[数据库表结构](https://github.com/hyqc/wei/blob/master/scripts/admin.sql)：https://github.com/hyqc/wei/blob/master/scripts/admin.sql，文件中含基础数据，导表时请勿删除，初始账号密码为：admin  123456(若不是请自行按照代码中密码加密算法修改初始密码)
- admin_user：管理员表
- admin_user_role：管理员的角色关系表
- admin_role：角色表
- admin_menu：菜单表
- admin_permission：权限配置表，每一条记录都关联一个菜单页面，每一个可访问的页面都只有三个权限，分别是：查看（不修改数据的操作），编辑（数据变更的操作，包括新增，编辑），删除（彻底删除数据操作）。
- admin_role_permission：角色权限关系表（页面的查看，编辑，删除）
- admin_permission_api：权限接口资源关系表，一个权限可对应多个API资源
- admin_api：接口资源配置表，这里定义所有的后端接口（需要加入权限控制的接口资源）

# 接口文档
请按照启动服务后接口实际返回的数据格式作为开发的接口文档，目前代码仓库中的文档不是最新的，可能有些字段跟实际返回不一样。
后续会逐渐更新完善前后端的文档，并部署文档站点，后端也会提供golang,php的代码仓库。
代码仓库中提供了一份postman请求接口的文件，可以导入自己的postman中

后续补充~
