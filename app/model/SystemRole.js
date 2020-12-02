module.exports = app => {
  const { INTEGER, BOOLEAN, STRING } = app.Sequelize;
  const SystemRoles = app.model.define('system_roles', {
    rid: {type: INTEGER, primaryKey: true}, // 角色id
    name: STRING, // 角色名称
    describe: STRING, // 角色描述
    status: {type: BOOLEAN, defaultValue: true} // 用户状态 false禁用 true启用
  }, {
    timestamps: false
  });
  return SystemRoles;
}