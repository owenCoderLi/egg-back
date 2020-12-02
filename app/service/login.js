const {Service} = require("egg/index");

class LoginService extends Service {
  async findUsername(username) {
    const user = await this.ctx.model.SystemUser.findAll({
      where: {name: username},
      raw: true
    })
    return user
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
}

module.exports = LoginService;