const crypto = require("crypto")

module.exports = {
  // create token
  createToken(data, expires, strTimer) {
    return this.app.jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: expires + " " + strTimer,
    })
  },

  // get token
  getAccessToken() {
    const bearerToken = this.ctx.request.header["x-apihub-token"];
    return bearerToken && bearerToken.replace("Bearer", "")
  },

  // validate token
  async verifyToken() {
    const that = this
    let backResult = false
    const token = this.getAccessToken()
    const verify = await function(token) {
      const result = {}
      that.app.jwt.verify(token, that.app.config.jwt.secret, function(err, decoded) {
        if(err) {
          result.verify = false
          result.message = err.message
        } else {
          result.verify = true
          result.message = decoded
        }
      })
      return result
    }
    const verifyResult = verify(token)
    const tokenInfo = await this.ctx.service.login.findToken(token)

    if(!verifyResult.verify) {
       // 2小时的 token 验证失败了
       if (tokenInfo) {
        // 能查到对应的 refresh_token
        if (!verify(tokenInfo.refresh_token).verify) {
          // 2小时的 token 验证失败了并且7天的 token 验证也失败了
          await this.error(401, 200, "token身份认证失效,请重新登录")
        } else {
          // 2小时的 token 验证失败了,但是能查到对应的 refresh_token 并且在有效期内就重新生成新的 token
          const refresh_token = await this.createToken({ id: tokenInfo.uid }, "7", "days")
          const access_token = await this.createToken({ id: tokenInfo.uid }, "2", "hours")
          const { id, uid } = { id: tokenInfo.id, uid: tokenInfo.uid }
          await this.ctx.service.admin.login.saveToken({ id, uid, access_token, refresh_token })
          await this.error(200, 1100, access_token)
        }
      } else {
        // 2小时的 token 验证失败了并且查不到对应的 refresh_token
        await this.error(401, 200, "token身份认证失效,请重新登录")
      }
    } else {
      if(tokenInfo) {
        backResult = true
      } else {
        this.error(401, 200, "The Account is logined")
      }
    }
    return backResult
  },

  async cryptoMd5 (password, key) {
    const hash1 = await crypto.createHash("md5").update(password).digest("hex");
    const hash2 = await crypto.createHash("md5").update(hash1 + key).digest("hex");
    return hash2
  },

  error(status, code, message) {
    this.ctx.body = {code, message}
    this.ctx.status = status
  }
}