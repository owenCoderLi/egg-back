const {Service} = require("egg/index");

class LoginService extends Service {
  async findUsername(username) {
    const user = await this.ctx.model.SystemUser.findAll({
      where: {"user_name": username},
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
}

module.exports = LoginService;