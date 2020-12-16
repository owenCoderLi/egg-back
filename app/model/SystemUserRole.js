module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const SystemUserRole = app.model.define('system_user_role', {
    role_id: INTEGER, // 角色id
    user_id: INTEGER, // 用户id
  }, {
    timestamps: false,
    freezeTableName: true
  });
  SystemUserRole.removeAttribute('id');
  SystemUserRole.associate = function() {
    app.model.SystemUserRole.belongsTo(
      app.model.SystemRole,
      {foreignKey: 'user_id'}
    );
  }

  return SystemUserRole;
}