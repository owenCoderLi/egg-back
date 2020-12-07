# egg.js 管理后台后端栈

## QuickStart

```bash
$ npm init --template=simple
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

```javascript
// 采用的是 mysql + sequelize
// 在config/plugins中, 配置sequelize / jwt
// 因为是采用本地开发，所以在接口调试时会有跨域问题，根据官方文档可以在 指定环境下的文件, 将
  config.security = {
    csrf: false
  }

  config.sequelize = {
    //  配置数据库的基本信息
  }
// 
```