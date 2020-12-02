module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const SystemUser = app.model.define('system_users', {
    id: { type: INTEGER, primaryKey: true },
    name: STRING(30),
    password: STRING,
    department: STRING,
    phone: STRING,
    role_id: INTEGER,
    status: { type: STRING, defaultValue: "1" },
  }, {
    timestamps: false
  });

  return SystemUser;
}