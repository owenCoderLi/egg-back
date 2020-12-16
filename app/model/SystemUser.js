module.exports = app => {
  const { UUID, STRING, INTEGER } = app.Sequelize;
  const SystemUser = app.model.define('system_user', {
    user_id: { type: UUID, autoIncrement: true, primaryKey: true }, // 用户id
    password: STRING, // 密码
    user_name: STRING, // 用户名称
    dept_id: INTEGER, // 部门id
    role_id: INTEGER, // 角色id
    status: INTEGER, // 状态 0启用 1禁用
    email: STRING, // 邮箱
    phone: STRING, // 手机
    create_name: STRING, // 创建人名称
    modify_name: STRING, // 变更人名称
  }, {
    timestamps: false,
    freezeTableName: false,
    tableName: 'system_user'
  });

  SystemUser.associate = function() {
    app.model.SystemUser.hasOne(
      app.model.SystemRole,
      {foreignKey: 'role_id', sourceKey: 'role_id'}
    );
    app.model.SystemUser.hasOne(
      app.model.SystemDept,
      {foreignKey: 'dept_id', sourceKey: 'dept_id'}
    )
  }

  return SystemUser;
}