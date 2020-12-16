module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const SystemRoleMenu = app.model.define('system_role_menu', {
    role_id: INTEGER, // 角色id
    menu_id: STRING, // 菜单
  }, {
    timestamps: false,
    freezeTableName: false,
    tableName: 'system_role_menu'
  });
  SystemRoleMenu.removeAttribute('id');
  SystemRoleMenu.associate = function() {
    app.model.SystemRoleMenu.belongsTo(
      app.model.SystemRole,
      {foreignKey: 'role_id'}
    );
  }

  return SystemRoleMenu;
}