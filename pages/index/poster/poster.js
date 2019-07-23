const app = getApp()
import Tips from '../../../utils/Tips.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    src: '',
    init: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let uid = options.id;
    let user = wx.getStorageSync('user');
    if (!uid) {
      uid = user.id;
    }
    Tips.loading();
    wx.request({
      url: app.globalData.hpUrl + 'img',
      data: {
        userid: uid
      },
      success: function(res) {
        console.log(res)
        let result = res.data.data
        that.setData({
          src: result,
          init: true
        });
        Tips.loaded();
      }
    })

  },

  clickapply: function() {
    let src = this.data.src;
    wx.downloadFile({
      url: src,
      success: function(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function() {
            wx.showToast({
              title: '保存成功'
            })
          }
        })
      }
    })

  }
})