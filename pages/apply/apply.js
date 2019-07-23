// pages/apply/apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'/imgs/apply/apply.jpg'
  },

  clickapply:function(){
    wx.navigateTo({
      url: '/pages/apply/notes/notes'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  }
})