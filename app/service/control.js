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
    const {id, role_name, description, status} = this.ctx.request.body;
    const result = await this.ctx.model.SystemMenu.update({
      role_name: role_name,
      description: description,
      status: status,
      modify_name: this.ctx.session.user.user_name,
      modify_time: new Date()
    },{
      where: { "role_id": id }
    });
    return result;
  }

  async createUser() { // 新增用户
    const {
      user_name, dept_id, role_id,
      status, email, phone,
    } = this.ctx.request.body;
    const keys = this.config.keys
    const newPass = await cryptoMd5(password, keys);
    const result = await this.ctx.model.SystemUser.create({
      password: newPass,
      user_name: user_name,
      dept_id: dept_id,
      role_id: role_id,
      email: email,
      phone: phone,
      status: status,
      create_name: this.ctx.session.user.user_name,
      create_time: new Date()
    }, {
      timestamps: false,
      tableName: 'system_user'
    });
    const userResult = result.get({plain: true});
    return userResult;
  }

  async updateUser() { // 更新用户
    const {
      user_name, dept_id, role_id,
      status, email, phone, id
    } = this.ctx.request.body;
    const keys = this.config.keys
    const newPass = await cryptoMd5(password, keys);
    const result = await this.ctx.model.SystemUser.update({
      password: newPass,
      user_name: user_name,
      dept_id: dept_id,
      role_id: role_id,
      email: email,
      phone: phone,
      status: status,
      modify_name: this.ctx.session.user.user_name,
      modify_time: new Date()
    },{
      where: { "user_id": id }
    });
    return result;
  }

  async deptList() { // 部门列表
    const result = await this.ctx.model.SystemDept.findAll({
      attributes: ['dept_id', 'order_num', 'parent_id', 'status', 'dept_name'],
      raw: true
    }); // array[{}, {}, ...]
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
    const result = await this.ctx.model.SystemRole.findAll({
      attributes: ['role_id', 'role_name', 'description', 'status'],
      raw: true
    })
    return result;
  }

  async userList() { // 用户列表
    const result = await this.ctx.model.SystemUser.findAll({
      attributes: [
        'user_id', 'user_name', 'dept_id',
        'role_id', 'status', 'email', 'phone'
      ],
      raw: true
    })
    return result;
  }
}

module.exports = ControlService;