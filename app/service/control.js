const {Service} = require("egg/index");

class ControlService extends Service {
  async createDept() { // 新增部门
    const { order_num, parent_id, status, dept_name } = this.ctx.request.body;
    const result = await this.ctx.model.SystemDept.create({
      order_num: order_num,
      parent_id: parent_id,
      status: status,
      create_name: this.ctx.session.user.user_name,
      dept_name: dept_name,
      create_time: new Date(),
    }, {
      timestamps: false,
      tableName: 'system_dept'
    })
    const deptResult = result.get({plain: true});
    return deptResult;
  }

  async updateDept() { // 更新部门
    const { id, order_num, parent_id, status, dept_name } = this.ctx.request.body;
    const result = await this.ctx.model.SystemDept.update({
      order_num: order_num,
      parent_id: parent_id,
      status: status,
      modify_name: this.ctx.session.user.user_name,
      dept_name: dept_name,
      modify_time: new Date(),
    },{
      where: { "dept_id": id }
    });
    return result;
  }

  async createMenu() { // 新增菜单
    const {
      order_num, parent_id, path, status, types,
      menu_name, component, perms, icon,
    } = this.ctx.request.body;
    const result = await this.ctx.model.SystemMenu.create({
      order_num: order_num, parent_id: parent_id,
      status: status, types: types,
      create_name: this.ctx.session.user.user_name,
      menu_name: menu_name,
      component: component,
      perms: perms, path: path,
      icon: icon, create_time: new Date()
    }, {
      timestamps: false,
      tableName: 'system_menu'
    })
    const menuResult = result.get({plain: true});
    return menuResult
  }

  async updateMenu() {
    const {
      id, order_num, parent_id, path, status, types,
      menu_name, component, perms, icon,
    } = this.ctx.request.body;
    const result = await this.ctx.model.SystemMenu.update({
      order_num: order_num, parent_id: parent_id,
      status: status, types: types,
      modify_name: this.ctx.session.user.user_name,
      menu_name: menu_name,
      component: component,
      perms: perms, path: path,
      icon: icon, modify_time: new Date()
    },{
      where: { "menu_id": id }
    });
    return result;
  }
}

module.exports = ControlService;