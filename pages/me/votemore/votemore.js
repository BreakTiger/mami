// pages/me/votemore/votemore.js
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
    itemarray: [],
    content: '',
    itemarray: []


  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userimg = wx.getStorageSync('userinfo')
    console.log(userimg.avatarUrl)
    let that = this;
    let userimag;
    let username;
    let user = wx.getStorageSync('user');
    that.loaddata()
  },

  loaddata() {
    let userimg = wx.getStorageSync('userinfo')
    console.log(userimg.avatarUrl)
    let that = this;
    let userimag;
    let username;
    let user = wx.getStorageSync('user');
    wx.request({
      url: app.globalData.hpUrl + 'user_select',
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
        console.log(res.data.data.userimage)
        that.setData({
          itemarray: res.data.data,
          avatarUrl: userimg.avatarUrl,
          username: userimg.username,
        })
      }
    })
  },

 

  // ta人主页跳转
  imageInto:function (e) {
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