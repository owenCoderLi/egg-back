const {Controller} = require("egg");
const { cryptoMd5 } = require("../extend/helper");

class UserController extends Controller {
  async userLogin() {
    const {username, password} = this.ctx.request.body
    const keys = "eggback"
    let results = ""
    let roleStatus
    console.log('----------------------');
    console.log(this.ctx.request.body);
    const userResult = await this.ctx.service.login.findUsername(username);
    const user = userResult[0];
    if(!user || user.status === "2") {
      results = { code: 1000, message: "用户名不存在" }
    } else {
      const newPass = await cryptoMd5(password, keys)
      await this.ctx.model.SystemRole.findAll({
        where: {rid: user.role_id},
        raw: true
      }).then(async res => {
        roleStatus = res[0].status
      })
      // if(user.password !== newPass) {
      //   results = { code: 1000, message: "密码错误" }
      // } else if(user.status === "0") {
      //   results = { code: 1000, message: "该账号已被禁用,请联系管理员" }
      // } else if(!roleStatus) {
      //   results = { code: 1000, message: "该账号角色已被禁用,请联系管理员" }
      // } else {
        const refresh_token = await this.ctx.helper.createToken({ id: user.id }, "7", "days")
        const access_token = await this.ctx.helper.createToken({ id: user.id }, "2", "hours")
        const uid = user.id
        await this.ctx.service.login.saveToken({ uid, access_token, refresh_token })
        results = { code: 200, data: { access_token } }
      // }
    }
    this.ctx.body = results
  }
}

module.exports = UserController;