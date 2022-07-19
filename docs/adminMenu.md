[toc]

### 菜单列表

###### POST /admin/role/list

###### 参数

| 字段      |  类型  | 是否必须 | 默认值 | 示例   | 备注                               |
| --------- | :----: | :------: | :----- | :----- | ---------------------------------- |
| roleName  | string |    否    |        | admin  | 菜单名                             |
| enabled   |  int   |    否    | 0      | 0      | 菜单状态，0 全部，1：正常，2：禁用 |
| sortField | string |    否    | roleId | id     | 排序字段                           |
| sortValue | string |    否    | ascden | ascden | 排序方式                           |
| pageNum   |  int   |    否    | 1      | 1      | 排序方式                           |
| pageSize  |  int   |    否    | 10     | 10     | 排序方式                           |

###### 返回

```json
{
  "code": 0, // 状态吗
  "message": "成功",
  "data": {
    "total": 0, // 总数
    "pageSize": 10, // 每页数量
    "pageNum": 1, // 第一页
    "rows": [
      {
        "roleId": 1, // 菜单ID，唯一键
        "roleName": "admin", // 菜单名称，唯一键
        "enabled": 1, // 正常，菜单状态
        "enabledText": "正常", //
        "createTime": "2021-12-01 12:23:21", // 创建时间
        "modifyTime": "2021-12-01 12:23:21" // 最后更新时间
      }
    ]
  }
}
```

### 全部菜单

###### POST /admin/role/all

###### 参数

| 字段     |  类型  | 是否必须 | 默认值 | 示例   | 备注     |
| -------- | :----: | :------: | :----- | :----- | -------- |
| roleName | string |    否    | 无     | 管理员 | 搜索使用 |

###### 返回

```json
{
  "code": 0, // 状态吗
  "message": "成功",
  "data": [
    {
      "roleId": 1,
      "roleName": "admin"
    }
  ]
}
```

### 添加菜单

###### POST /admin/role/add

###### 参数

| 字段           |   类型   | 是否必须 | 默认值 | 示例    | 备注                              |
| -------------- | :------: | :------: | :----- | :------ | --------------------------------- |
| roleName       |  string  |    否    | 无     | admin   | 菜单名                            |
| enabled        |   bool   |    否    | false  | 0       | 菜单状态，true：启用，false：禁用 |
| permission_ids | number[] |    否    |        | [1,2,3] | 权限 ID，多个英文逗号隔开         |

###### 返回

```json
{
  "code": 0, // 状态吗
  "message": "成功"
}
```

### 编辑菜单

###### POST /admin/role/edit

###### 参数

| 字段           |   类型   | 是否必须 | 默认值 | 示例    | 备注                              |
| -------------- | :------: | :------: | :----- | :------ | --------------------------------- |
| roleId         |  number  |    是    |        | 1       | 菜单 ID                           |
| roleName       |  string  |    否    |        | admin   | 菜单名                            |
| enabled        |   bool   |    否    |        | 0       | 菜单状态，true：启用，false：禁用 |
| permission_ids | number[] |    否    |        | [1,2,3] | 权限 ID，多个英文逗号隔开         |

###### 返回

```json
{
  "code": 0, // 状态吗
  "message": "成功"
}
```

### 禁用|启用菜单

###### POST /admin/role/enable

###### 参数

| 字段    |  类型  | 是否必须 | 默认值 | 示例 | 备注                              |
| ------- | :----: | :------: | :----- | :--- | --------------------------------- |
| roleId  | number |    是    |        | 1    | 菜单 ID                           |
| enabled |  bool  |    否    |        | 0    | 菜单状态，true：启用，false：禁用 |

###### 返回

```json
{
  "code": 0, // 状态吗
  "message": "成功"
}
```

### 删除菜单

###### POST /admin/role/delete

###### 参数

| 字段    |  类型  | 是否必须 | 默认值 | 示例 | 备注                              |
| ------- | :----: | :------: | :----- | :--- | --------------------------------- |
| roleId  | number |    是    |        | 1    | 菜单 ID                           |
| enabled |  bool  |    否    |        | 0    | 菜单状态，true：启用，false：禁用 |

###### 返回

```json
{
  "code": 0, // 状态吗
  "message": "成功"
}
```
