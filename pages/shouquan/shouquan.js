// pages/shouquan/shouquan.js
import Tips from '../../utils/Tips.js';
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // openid: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let user = wx.getStorageSync('user');
    if (user) {
      wx.navigateTo({
        url: '/pages/start/start',
      })
     
      //进入动画loading
    }

  },
  // 确认授权
  confirm: function(e) {
    let that = this;
    console.log(e.detail.rawData)
    let openid = app.globalData.openid;
    console.log(openid)
    let username
    let userimage
    if (e.detail.rawData) {
      let result = JSON.parse(e.detail.rawData)
      console.log(result)
      username = result.nickName;
      userimage = result.avatarUrl;
      wx.setStorageSync('userinfo', result)
      app.globalData.userInfo = result;
      console.log(app.globalData.userInfo)
      Tips.loading();
      wx.request({
        url: app.globalData.hpUrl + 'wx_login', //仅为示例，并非真实的接口地址
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          username: result.nickName,
          userimage: result.avatarUrl,
          openid: openid
        },
        success: function(res) {
          Tips.loaded();
          let result = res.data.data;
          console.log(result)
          if (result) {
            wx.setStorageSync('user', result);
            that.setData({
              user: result
            });


            //缓存当前时间时间戳
            // let timeString = new Date().getTime()
            // wx.setStorageSync('timeString', timeString);
          }
          wx.switchTab({
            url: '/pages/index/index',
          })
        },
        fail: function() {}
      })
    } else {
      //重新调起授权
      wx.openSetting({
        success: (res) => {
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              let result = res.userInfo
              console.log(result)
              username = result.nickName;
              userimage = result.avatarUrl;
              app.globalData.userInfo = result;
              console.log(app.globalData.userInfo)
              wx.request({
                url: app.globalData.hpUrl + 'wx_login', //仅为示例，并非真实的接口地址
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                data: {
                  username: result.nickName,
                  userimage: result.avatarUrl,
                  openid: openid
                },
                success: function(res) {
                  let result = res.data.data;
                  console.log(result)
                  if (result) {
                    wx.setStorageSync('user', result);
                    that.setData({
                      user: result
                    });

                    //缓存当前时间时间戳
                    // let timeString = new Date().getTime()
                    // wx.setStorageSync('timeString', timeString);
                  }
                  wx.switchTab({
                    url: '/pages/index/index',
                  })

                },
                fail: function() {

                }

              })
            }
          })
        }
      })
    }
  }
})