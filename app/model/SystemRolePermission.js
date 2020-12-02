module.exports = app => {
  const { UUID, TEXT } = app.Sequelize;
  const SystemRolePermission = app.model.define('system_role_permission', {
    role_id: UUID, // 角色id
    permission_page: TEXT("long"), // 页面权限
    permission_button: TEXT("long"), // 按钮权限
  }, {
    timestamps: false
  });

  return SystemRolePermission;
}