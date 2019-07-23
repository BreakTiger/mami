//app.js
import modals from './class/base/modal.js'
const request = require('./class/api/request.js')
var QQMapWX = require('./qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'MUFBZ-4QHC4-HI4UD-DPYWB-XOLIQ-N4B4I'
  
});
App({
  globalData: {
    userInfo: null,
    userId: '',
    openid: '',
    district: '',
    city: '',
    latitude: '',
    longitude: '',
    addText: '玩命加载中...',
    endText: '—————  我也是有底线的  —————',
    hpUrl: 'https://didulv.didu86.com/mami/public/',
    //hpUrl: 'http://wx.baiwanmami.cn/',
    // userinfo:''
    Saiqu: '',
  },

  onLaunch: function() {
    var that = this;
    
    // 判断用户是否存在
    wx.login({
      success: res => {
        //console.log(res.code)
        let code = res.code
        wx.setStorageSync('code', code)
        wx.request({
          url: that.globalData.hpUrl + 'wx_openid',
          data: {
            js_code: code
          },
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            let aaa = JSON.parse(res.data.data)
            let openid = aaa.openid
            that.globalData.openid = openid
            wx.setStorageSync('openid', openid)
          }
        })
      }
    })

    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API

                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
        } else {
          //调用wx.getLocation的API
        }
      }
    })
  },

})