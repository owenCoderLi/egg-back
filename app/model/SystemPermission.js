module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const SystemPermission = app.model.define('system_permission', {
    pid: {type: INTEGER, primaryKey: true}, // 路由id
    title: STRING, // 标题
    url: STRING, // 路由链接
    status: {type: INTEGER, defaultValue: "1"} // 用户状态 0禁用 1启用
  }, {
    timestamps: false
  });

  return SystemPermission;
}