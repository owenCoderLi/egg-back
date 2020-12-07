module.exports = app => {
  const { UUID, STRING, DATE, INTEGER } = app.Sequelize;
  const SystemDept = app.model.define('system_dept', {
    dept_id: { type: UUID, autoIncrement: true, primaryKey: true }, // 部门id
    order_num: INTEGER,
    parent_id: INTEGER,
    status: INTEGER,
    create_name: STRING,
    modify_name: STRING,
    dept_name: STRING,
    create_time: DATE,
    modify_time: DATE,
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return SystemDept;
}