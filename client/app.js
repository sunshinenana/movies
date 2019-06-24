//app.js
const qcloud = require('./vendor/wafer2-client-sdk/index')
const config = require('./config')

let userInfo

App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl);
  },
  /**
   * 用户登录
   * 因为qcloud.login中会执行wx.checkSession()操作，故不需要先执行wx.checkSession()
   */
  login({ success, fail, complete }) {
    //分支test2_
    //分支test2_3111_test5
    //cherry-pick验证1
    //cherry-pick验证2
    if (userInfo) {
      console.log('third')
      return success && success(userInfo);
    }
    qcloud.login({
      success: result => {
        if (result) {
          userInfo = result
          success && success(userInfo)
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          this.getUserInfo({ success, fail, complete })
        }
      },
      fail: error => {
        console.log(error)
        fail && fail()
      },
      complete: () => {
        complete && complete()
      }
    })
    console.log('second')

  },
  /**
   * 获取用户信息
   */
  getUserInfo({ success, fail, complete }) {
    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      success: result => {
        /// 改动第一次
        /// 改动第1111次
        let data = result.data
        if (!data.code) {
          userInfo = data.data
          success && success(userInfo)
        } else {
          fail && fail()
          /// 改动第333次
        }
      },
      fail: error => {
        /// 改动第二次
        console.log(error)
        fail && fail()
      },
      complete: () => {
        complete && complete()
      }
    })
  }
  console.log('1')
})