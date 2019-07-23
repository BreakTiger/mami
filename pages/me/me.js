// pages/me/me.js
var app = getApp();
import Tips from '../../utils/Tips.js';
Page({

  /**
   * 页面的初始数据
   */


  data: {
    page: 1,
    pageSize: 10,
    pageN: 2,
    hpUrl: app.globalData.hpUrl,

    // userInfo: [],
    user: [],
    data: [],
    editurl: '../../imgs/me/arrow.png',
    itemarray: [],
    itemarray1: [],
    is_info: ''
  },


  clickdetail: function(e) {
    let userimage = e.currentTarget.dataset.image
    let name = e.currentTarget.dataset.name
    console.log(userimage)
    console.log(name)
    let that = this
    if (that.data.is_info == 1) {
      wx.navigateTo({
        url: 'pagedetail/pagedetail',
      })
    } else {
      wx.navigateTo({
        url: '/pages/me/editdata/editdata?data=' + JSON.stringify({
          'userimage': userimage,
          'name': name
        }),
      })
    }

  },
  // 消息详情页面
  clickmessage: function() {
    wx.navigateTo({
      url: 'message/message',
    })
  },

  // 我最近投票的妈咪
  lookmore: function() {
    wx.navigateTo({
      url: 'votemore/votemore',
    })
  },

  focusdetail: function(e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/index/otherpage/otherpage?id=' + item.id
    })
  },

  // 我最近留言的
  lookmore_s: function() {
    wx.navigateTo({
      url: 'messagemore/messagemore',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let user = wx.getStorageSync('user');
    let that = this;
    Tips.loading();
    // 查询用户信息
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
        Tips.loaded();
        console.log(res.data.data)
        let result = res.data.data
        that.setData({
          itemarray: result,
        })
      }
    })
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
      success: function(res) {
        console.log(res.data.data)
        let result = res.data.data
        that.setData({
          itemarray1: result,
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  

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
      success: function(res) {
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
    // 查询用户信息
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
      success: function (res) {
        Tips.loaded();
        console.log(res.data.data)
        let result = res.data.data
        that.setData({
          itemarray: result,
        })
      }
    })
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
        let result = res.data.data
        that.setData({
          itemarray1: result,
        })
      }
    })


  }
})