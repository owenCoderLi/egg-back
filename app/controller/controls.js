const {Controller} = require("egg");
const {convertTree} = require("../extend/treeUtils");

class ControlController extends Controller {
  async deptAdd() { // 新增部门
    let results = {}
    const result = await this.ctx.service.control.createDept();
    if(Object.keys(result).length) {
      results = {code: 0, msg: "add dept success"}
    } else {
      results = {code: 1, msg: 'add dept failure'}
    }
    this.ctx.body = results
  }

  async deptUpdate() { // 更新部门信息
    let results = {}
    const result = await this.ctx.service.control.updateDept();
    if(result.length) {
      results = {code: 0, msg: "update dept success"}
    } else {
      results = {code: 1, msg: 'update dept failure'}
    }
    this.ctx.body = results
  }

  async menuAdd() { //新增菜单
    let results = {}
    const result = await this.ctx.service.control.createMenu();
    if(Object.keys(result).length) {
      results = {code: 0, msg: 'add menu success'}
    } else {
      results = {code: 1, msg: 'add menu failure'}
    }
    this.ctx.body = results
  }

  async menuUpdate() { // 更新菜单
    let results = {}
    const result = await this.ctx.service.control.updateMenu()
    if(result.length) {
      results = {code: 0, msg: 'update menu success'}
    } else {
      results = {code: 1, msg: 'update menu failure'}
    }
    this.ctx.body = results;
  }

  async roleAdd() { // 新增角色
    let results = {}
    const result = await this.ctx.service.control.createRole();
    if(Object.keys(result).length) {
      results = {code: 0, msg: 'add role success'};
    } else {
      results = {code: 1, msg: 'add role failure'};
    }
    this.ctx.body = results
  }

  async roleUpdate() { // 更新角色
    let results = {}
    const result = await this.ctx.service.control.updateRole();
    if(result.length) {
      results = {code: 0, msg: 'update role success'}
    } else {
      results = {code: 1, msg: 'update role failure'}
    }
    this.ctx.body = results
  }

  async userAdd() { // 新增用户
    let results = {}
    const result = await this.ctx.service.control.createUser()
    if(Object.keys(result).length) {
      result = {code: 0, msg: 'add user success'}
    } else {
      results = {code: 1, msg: 'add user failure'}
    }
    this.ctx.body = results
  }

  async userUpdate() { // 更新用户
    let results = {}
    const result = await this.ctx.service.control.updateUser()
    if(result.length) {
      results = {code: 0, msg: 'update user success'}
    } else {
      results = {code: 1, msg: 'update user failure'}
    }
    this.ctx.body = results
  }

  async deptList() { // 部门列表
    let results = {}
    const result = await this.ctx.service.control.deptList()
    if(result.length) {
      const treeRes = convertTree(result, 'dept'); // 转换成树
      results = {code: 0, msg: 'query dept success', data: treeRes}
    } else {
      results = {code: 1, msg: 'query dept failure'}
    }
    this.ctx.body = results;
  }

  async menuList() { // 菜单列表
    let results = {}
    const result = await this.ctx.service.control.menuList()
    if(result.length) {
      const treeRes = convertTree(result, 'menu'); // 转换成树
      results = {code: 0, msg: 'query menu success', data: treeRes}
    } else {
      results = {code: 1, msg: 'query menu failure'}
    }
    this.ctx.body = results
  }

  async roleList() { // 角色列表
    let results = {}
    const result = await this.ctx.service.control.roleList()
    if(result.length) {
      results = {code: 0, msg: 'query role success', data: result}
    } else {
      results = {code: 1, msg: 'query role failure'}
    }
    this.ctx.body = results
  }

  async userList() { // 用户列表
    let results = {}
    const result = await this.ctx.service.control.userList()
    if(result.length) {
      results = {code: 0, msg: 'query user success', data: result}
    } else {
      results = {code: 1, msg: 'query user failure'}
    }
    this.ctx.body = results
  }
}

module.exports = ControlController;