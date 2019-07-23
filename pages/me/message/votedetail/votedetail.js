// pages/me/message/votedetail/votedetail.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 10,
    pageN: 2,
    hpUrl: app.globalData.hpUrl,
    itemarray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this
    let user = wx.getStorageSync('user');

    // 为我投票的
    wx.request({
      url: app.globalData.hpUrl + 'user_news',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        page: that.data.page,
        size: that.data.pageSize,
        userid: user.id,
        new_type: 'vote',
      },
      success: function (res) {
        console.log(res.data.data)
        let result = res.data.data
        that.setData({
          itemarray: result
        })
      }
    })
  },



  // ta人主页跳转
  imageInto: function (e) {
    let clickpicture = e.currentTarget.dataset.item
    console.log('otherpage', clickpicture)
    wx.navigateTo({
      url: '/pages/index/otherpage/otherpage?id=' + clickpicture.id,
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