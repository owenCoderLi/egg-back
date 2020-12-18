const {Service} = require("egg/index");
const {Op} = require('sequelize');

class LoginService extends Service {
  async findUsername(phone) {
    const user = await this.ctx.model.SystemUser.findAll({
      where: {"phone": phone},
      raw: true
    })
    const userResult = user[0];
    return userResult;
  }

  async createUser(pass) {
    const {
      user_name, email, phone,
      status, department, role
    } = this.ctx.request.body;
    const user = await this.ctx.model.SystemUser.create({
      user_name: user_name,
      password: pass,
      email: email,
      phone: phone,
      status: status,      
      password: pass,
      dept_id: department,
      role_id: role,
      create_name: this.ctx.session.user.user_name,
      create_time: new Date()
    }, {
      timestamps: false,
      tableName: 'system_user'
    })
    const userResult = user.get({plain: true});
    return userResult;
  }

  // save token
  async saveToken(data) {
    const {uid, access_token, refresh_token} = data;
    await this.ctx.model.RefreshToken.update({
      access_token: access_token,
      refresh_token: refresh_token,
      update_at: new Date()
    }, {
      where: {uid: uid}
    })
  }

  // find token
  async findToken(access_token) {
    const tokenInfo = await this.ctx.model.RefreshToken.findOne({
      where: { access_token: access_token }
    });
    return tokenInfo
  }

  // get user info
  async getUserInfo(info) {
    if(info.verify === false) {
      return null;
    } else {
      const userResult = await this.ctx.model.SystemUser.findAll({
        where: {"user_id": info.message.id},
        raw: true
      })
      const user = userResult[0];
      return user
    }
  }

  // 获取菜单列表
  async getUserMenu() {
    const {role_id} = this.ctx.session.user;
    const roleMenuRes = await this.ctx.model.SystemRoleMenu.findAll({
      where: {"role_id": role_id},
      raw: true
    }) // 获取roleMenu对应的role_id集合
    const {menu_id} = roleMenuRes[0];
    const menuArr = menu_id.split(',');
    const menuRes = await this.ctx.model.SystemMenu.findAll({
      where: {
        'menu_id': {[Op.or]: menuArr}
      },
      raw: true
    }); // 获取menu中的所有匹配集合
    return menuRes;
  }
}

module.exports = LoginService;