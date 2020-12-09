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
    const {username, email, phone, status} = this.ctx.request.body;
    const user = await this.ctx.model.SystemUser.create({
      user_name: username,
      password: pass,
      email: email,
      phone: phone,
      status: status,
      create_name: this.ctx.session.user.user_name,
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
    const {ctx} = this
    let userInfo = ""
    const userResult = await this.ctx.model.SystemUser.findAll({
      where: {"user_id": info.message.id},
      raw: true
    })
    const user = userResult[0];
    return user
  }
}

module.exports = LoginService;