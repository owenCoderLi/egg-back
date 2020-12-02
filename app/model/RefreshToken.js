module.exports = app => {
  const { UUID, STRING, DATE } = app.Sequelize;
  const RefreshToken = app.model.define('refresh_token', {
    uid: { type: UUID, allowNull: false }, // 用户id
    access_token: {type: STRING, unique: true, allowNull: false}, // 2 hours token
    refresh_token: {type: STRING, unique: true, allowNull: false}, // 7 days token
    update_at: DATE
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return RefreshToken;
}