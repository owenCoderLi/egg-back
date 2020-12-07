module.exports = app => {
  const { UUID, STRING, DATE, INTEGER } = app.Sequelize;
  const SystemRole = app.model.define('system_role', {
    role_id: { type: UUID, autoIncrement: true, primaryKey: true }, // 角色id
    role_name: STRING, // 角色名称
    description: STRING, // 角色描述
    status: INTEGER, // 状态 0启用 1禁用
    create_name: STRING, // 创建人名称
    modify_name: STRING, // 变更人名称
    create_time: DATE, // 创建时间
    modify_time: DATE, // 变更时间
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return SystemRole;
}