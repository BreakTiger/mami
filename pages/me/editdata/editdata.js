// pages/me/editdata/editdata.js
var app = getApp();
// pages/user/teamwork/teamwork.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_info: '',
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    userInfo: '',
    users: '',
    nickname: '',
    name: '',
    userimage: '',
    // 手机正则
    ajxtrue: false,
  },
  homeBack: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  // 头像修改函数
  headImg: function() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要修改头像吗',
      success: function(res) {
        if (res.confirm) {
          that.headUpdate()
        } else if (res.cancel) {}
      }
    })
  },
  headUpdate: function() {
    let user = wx.getStorageSync('user');
    let imgbox1 = '';
    let that = this;
    // console.log("hhhh")
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        imgbox1 = tempFilePaths;

        if (imgbox1) {
          wx.uploadFile({
            url: app.globalData.hpUrl + 'update_head',

            filePath: imgbox1[0],
            name: 'files',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            formData: {
              userid: user.id,
              username: that.data.name
            },
            success: function(res) {
              console.log(res)
              console.log(res)
              that.setData({
                userimage: imgbox1[0]
              })


            }

          })
        }
      }
    })
  },

  //---------------
  // 提交按钮函数
  // teSubmit:function(){
  //   consoele.log()
  // },

  teformSubmit: function(e) {
    var that = this;
    var user = wx.getStorageSync('user');
    var username = e.detail.value;
    console.log('form', e)
    if (username.name != '') {
      if (that.data.ajxtrue) {
        wx.request({
          url: app.globalData.hpUrl + 'update_head',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: {
            userid: user.id,
            username: username.name
          },

          success: function(res) {
            console.log(res)
            var result = res.data;
            // let result = res.data.data;
            //  console.log(result )
            //  if (result) {
            that.info();
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000
            })
            // wx.setStorageSync('user', result);
            setTimeout(function() {
              wx.switchTab({
                url: "/pages/me/me"
              })
            }, 1000); {
              //  }
            }

          }
        })
      } else {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
      }

    } else {
      wx.showToast({
        title: '请填充完整',
        icon: 'success',
        duration: 2000
      })
    }

    // } else {
    //   wx.showModal({
    //     content: '请退出重新登录并授权',
    //     showCancel: false,
    //     success: function (res) {

    //     }
    //   })
    // }


  },

  info() {
    let userimage;
    // let username;
    let that = this
    let user = wx.getStorageSync('user');

    wx.request({
      url: app.globalData.hpUrl + 'user_info',
      data: {
        userid: user.id,
      },
      success: function(res) {
        console.log(res.data.data)
        let result = res.data.data
        wx.setStorageSync('user', result)
        that.setData({
          name: result.info.name,
          nickname: result.username,
          userimage: result.userimage,
          birthday: result.info.birthday,
          district: result.info.district,
          organization: result.info.organization,
          group: result.info.group,
          phone: result.info.phone,
          is_info: result.is_info
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let data = JSON.parse(options.data)
    console.log(data)
    console.log(data.userimage)
    console.log(data.name)
    var that = this;
    let user = wx.getStorageSync('user');
    var userInfo = wx.getStorageSync('userInfo');
    var users = wx.getStorageSync('user');
    console.log(userInfo)
    console.log(users)
    console.log(user)
    if (wx.getStorageSync('user')) {
      that.setData({
        ajxtrue: true,
        ajxage: true
      })
    }
    this.info()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})