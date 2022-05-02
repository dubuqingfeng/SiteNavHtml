## 网址导航服务

### 简介

网址：

https://sitenav.link

数据：

目前在 json 文件夹下，bmob 的话，放 outputs 文件夹。

### 数据服务

1. Bmob

Bmob 的表段如下：

left_links:

|   字段名   |   类型   |   备注   |
| ---- | ---- | ---- |
|  sort    |   Number   |      |
|  links    |   Array   |      |
|  description   |   String   |      |
|  name   |   String   |      |
|  createdAt   |   Date   |      |
|  updatedAt   |   Date   |      |


right_links:

|   字段名   |   类型   |   备注   |
| ---- | ---- | ---- |
|   sort    |   Number   |      |
|   classify    |   Array   |      |
|   special   |   Array   |      |
|   name   |   String   |      |
|   createdAt   |   Date   |      |
|   updatedAt   |   Date   |      |

```
BMOB_SECRET_KEY= BMOB_APP_SECURITY_KEY= npm run bmob
```


### FAQ

1. node 版本 > v12