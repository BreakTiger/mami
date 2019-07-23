// pages/me/message/message.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  // 投票
  voteInto:function(){
    wx.navigateTo({
      url: '/pages/me/message/votedetail/votedetail',
    })
  },

  // 打赏我的

  // 给我留言的
  messageInto:function(){
    wx.navigateTo({
      url: '/pages/me/contactme/contactme',
    })
  },

// 系统通知
systemInto:function(){
  wx.navigateTo({
    url: '/pages/me/message/systemdetail/systemdetail',
  })
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


    let userimg = wx.getStorageSync('userinfo')
    let that = this;
    let user = wx.getStorageSync('user');
    let userimage;
    let username;
    console.log(user.id)
    let openid = app.globalData.openid;
    console.log(openid)
    wx.request({
      url: app.globalData.hpUrl + 'user_info',
      data: {
        userid: user.id,
      },
      success: function (res) {
        console.log(res)
        let result = res.data.data
        console.log(result)

        that.setData({
          country_rank: result.country_rank,
          area_rank: result.area_rank,
          userimage: result.userimage,
          username: result.username,
          usernumber: result.usernumber,
          is_info: result.is_info
        })
        wx.setStorageSync('userinformation', result)
      }
    })

   


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})