const {Controller} = require("egg");
const { cryptoMd5 } = require("../extend/helper");

class UserController extends Controller {
  async userLogin() { // 用户登录
    const {username, password} = this.ctx.request.body;
    const keys = this.config.keys;
    let results = {}
    const user = await this.ctx.service.login.findUsername(username);
    if(!user || user.status === "2") {
      results = { code: 1, message: "用户名不存在" }
    } else {
      const newPass = await cryptoMd5(password, keys)
      if(user.password !== newPass) {
        results = { code: 1, message: "密码错误" }
      } else if(user.status === "0") {
        results = { code: 1, message: "该账号已被禁用,请联系管理员" }
      } else {
        const refresh_token = await this.ctx.helper.createToken({ id: user.user_id }, "7", "days")
        const access_token = await this.ctx.helper.createToken({ id: user.user_id }, "2", "hours")
        const uid = user.user_id
        await this.ctx.service.login.saveToken({ uid, access_token, refresh_token })
        results = { code: 0, data: { access_token } }
      }
    }
    this.ctx.body = results
  }

  async userRegister() { // 用户注册
    // const {password} = this.ctx.request.body; 新用户默认密码yuediaoyan
    let results = {}
    const keys = this.config.keys
    const newPass = await cryptoMd5('yuediaoyan', keys);
    const userResult = await this.ctx.service.login.createUser(newPass);
    if(Object.keys(userResult).length) {
      const res = await this.ctx.service.control.createUserRole(userResult.user_id); // 创建映射.菜单 - 用户
      if(Object.keys(res).length) {
        results = {code: 0, msg: "add user success"}
      } else {
        results = {code: 1, msg: "add user failure"}
      }
    } else {
      results = {code: 1, msg: 'add fail'}
    }
    this.ctx.body = results
  }

  async userInfo() { // 查询个人信息
    const token = await this.ctx.helper.getAccessToken()
    let verifyRes = {};
    let results = {};
    await this.ctx.app.jwt.verify(token, this.ctx.app.config.jwt.secret, function(err, decoded) {
      if(err) {
        verifyRes.verify = false
        verifyRes.message = err.message
      } else {
        verifyRes.verify = true
        verifyRes.message = decoded
      }
    })
    const userInfo = await this.ctx.service.login.getUserInfo(verifyRes)
    if(userInfo && Object.keys(userInfo).length) {
      this.ctx.session.user = userInfo
      results = {
        code: 0, msg: 'success',
        data: {
          user_id: userInfo.user_id, user_name: userInfo.user_name,
          dept_id: userInfo.dept_id, role_id: userInfo.role_id,
          status: userInfo.status, phone: userInfo.phone,
          email: userInfo.email, create_name: userInfo.create_name,
          modify_name: userInfo.modify_name
        }
      }
    } else {
      results = { code: 1, msg: '暂无获取到个人信息' }
    }
    this.ctx.body = results;
  }
}

module.exports = UserController;