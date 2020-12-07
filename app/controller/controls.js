const {Controller} = require("egg");

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
}

module.exports = ControlController;