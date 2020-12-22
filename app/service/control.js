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
      order, id = 0, path, status, type, url,
      name, component, perms, icon,
    } = this.ctx.request.body;
    const result = await this.ctx.model.SystemMenu.create({
      order_num: order, parent_id: id,
      status: status, types: type,
      create_name: this.ctx.session.user.user_name,
      menu_name: name,
      component: component,
      perms: perms, path: path,
      path: url,
      icon: icon, create_time: new Date()
    }, {
      timestamps: false,
      tableName: 'system_menu'
    })
    const menuResult = result.get({plain: true});
    return menuResult
  }

  async updateMenu() { // 更新菜单
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

  async createRole() { // 新增角色
    const {role_name, description, status} = this.ctx.request.body;
    const result = await this.ctx.model.SystemRole.create({
      role_name: role_name,
      description: description,
      status: status,
      create_name: this.ctx.session.user.user_name,
      create_time: new Date()
    }, {
      timestamps: false,
      tableName: 'system_role'
    })
    const roleResult = result.get({plain: true});
    return roleResult;
  }

  async updateRole() { // 更新角色
    const {role_id, role_name, description, status} = this.ctx.request.body;
    const result = await this.ctx.model.SystemRole.update({
      role_name: role_name,
      description: description,
      status: status,
      modify_name: this.ctx.session.user.user_name,
      modify_time: new Date()
    },{
      where: { "role_id": role_id }
    });
    return result;
  }

  async updateUser() { // 更新用户
    const {
      user_name, department, role,
      status, email, phone, user_id
    } = this.ctx.request.body;
    const result = await this.ctx.model.SystemUser.update({
      user_name: user_name,
      dept_id: department,
      role_id: role,
      email: email,
      phone: phone,
      status: status,
      modify_name: this.ctx.session.user.user_name,
      modify_time: new Date()
    },{
      where: { "user_id": user_id }
    });
    return result;
  }

  async deptList() { // 部门列表
    const result = await this.ctx.model.SystemDept.findAll({
      attributes: ['dept_id', 'order_num', 'parent_id', 'status', 'dept_name'],
      raw: true
    });
    return result;
  }

  async menuList() { // 菜单列表
    const result = await this.ctx.model.SystemMenu.findAll({
      attributes: [
        'menu_id', 'order_num', 'parent_id', 'status', 'types',
        'path', 'menu_name', 'component', 'perms', 'icon'
      ],
      raw: true
    });
    return result;
  }

  async roleList() { // 角色列表
    const {page, pageSize} = this.ctx.query;
    const start = (page - 1) * pageSize; // 起点量
    const size = parseInt(pageSize); // 转换数字类型
    const {count, rows} = await this.ctx.model.SystemRole.findAndCountAll({
      attributes: ['role_id', 'role_name', 'description', 'status'],
      include: [{
        model: this.ctx.model.SystemRoleMenu,
        attributes: ['menu_id']
      }],
      offset: start, limit: size, raw: true
    })
    return [count, rows];
  }

  async userList() { // 用户列表
    const {page, pageSize} = this.ctx.query;
    const start = (page - 1) * pageSize; // 起点量
    const size = parseInt(pageSize); // 转换数字类型
    const {count, rows} = await this.ctx.model.SystemUser.findAndCountAll({
      attributes: [
        'user_id', 'user_name', 'dept_id',
        'role_id', 'status', 'email', 'phone'
      ],
      include: [
        {
          model: this.app.model.SystemRole,
          attributes: ['role_name'],
        },
        {
          model: this.app.model.SystemDept,
          attributes: ['dept_name'],
        }
      ],
      offset: start, limit: size, raw: true,
    })
    return [count, rows];
  }

  async createRoleMenu(id) { // 创建映射'菜单-角色'关系
    const {perms} = this.ctx.request.body;
    const permsStr = perms.join(',');
    const result = await this.ctx.model.SystemRoleMenu.create({
      role_id: id,
      menu_id: permsStr
    });
    const roleResult = result.get({plain: true});
    return roleResult;
  }

  async updateRoleMenu() {
    const {role_id, perms} = this.ctx.request.body;
    const permsStr = perms.join(',');
    const result = await this.ctx.model.SystemRoleMenu.update({
      menu_id: permsStr
    }, {
      where: {"role_id": role_id}
    });
    return result;
  }

  async createUserRole(id) {
    const {role} = this.ctx.request.body;
    const result = await this.ctx.model.SystemUserRole.create({
      user_id: id,
      role_id: role
    }, {
      timestamps: false,
      tableName: 'system_user_role'
    })
    const userResult = result.get({plain: true});
    return userResult;
  }

}

module.exports = ControlService;