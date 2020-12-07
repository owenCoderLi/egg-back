module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const SystemRoleMenu = app.model.define('system_role_menu', {
    role_id: INTEGER, // 角色id
    menu_id: INTEGER, // 菜单id
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return SystemRoleMenu;
}