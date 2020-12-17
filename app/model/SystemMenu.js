module.exports = app => {
  const { UUID, STRING, DATE, INTEGER } = app.Sequelize;
  const SystemMenu = app.model.define('system_menu', {
    menu_id: { type: UUID, autoIncrement: true, primaryKey: true }, // 菜单id
    order_num: INTEGER, // 排序
    parent_id: INTEGER, // 上一级菜单id
    status: INTEGER, // 状态: 0启用 1禁用
    types: INTEGER, // 类型：0菜单 1按钮
    create_name: STRING, // 创建时间
    modify_name: STRING, // 变更时间
    menu_name: STRING, // 菜单名称
    path: STRING, //  url路径
    component: STRING, // url对应页面组件
    perms: STRING, // 权限字段
    icon: STRING, // 图标名称
    create_time: DATE, // 创建时间
    modify_time: DATE, // 变更时间
  }, {
    timestamps: false,
    freezeTableName: false,
    tableName: 'system_menu'
  });

  SystemMenu.removeAttribute('id');
  return SystemMenu;
}