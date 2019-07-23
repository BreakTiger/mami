// pages/me/messagemore/messagemore.js
var app = getApp();
import Tips from '../../../utils/Tips.js';
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
    username: '',
    avatarUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    Tips.loading();
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
        new_type: 'leave',
      },
      success: function(res) {
        console.log(res)
        Tips.loaded();
        that.setData({
          itemarray: res.data.data,
          avatarUrl: userimg.avatarUrl,
          username: userimg.nickName,
        })
        // console.log(username)
        // console.log(avatarUrl)
      }
    })
  },



  deleteinto: function(e) {
    console.log('删除事件', e.currentTarget.dataset.id)
    let idd = e.currentTarget.dataset.id
    let that = this
    wx.request({
      url: app.globalData.hpUrl + 'del_leave',
      data: {
        id: idd
      },
      success: function(res) {
        console.log(res)
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
        that.loaddata()

      }
    })

  },
  // ta人主页跳转
  imageInto: function(e) {
    let clickpicture = e.currentTarget.dataset.item
    console.log('otherpage', clickpicture)
    wx.navigateTo({
      url: '/pages/index/otherpage/otherpage?id=' + clickpicture.id,
    })
  },


  // 我的主页跳转
  clickInto: function(e) {
    let clickpicture = e.currentTarget.dataset.item
    console.log('me', clickpicture)
    wx.navigateTo({
      url: '/pages/me/pagedetail/pagedetail?id=' + clickpicture.id,
    })
  },

})