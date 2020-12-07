module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const SystemRoleMenu = app.model.define('system_user_role', {
    role_id: INTEGER, // 角色id
    user_id: INTEGER, // 用户id
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return SystemRoleMenu;
}