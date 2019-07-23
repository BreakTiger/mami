var app = getApp()
import Tips from '../../../utils/Tips.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    getText: '获取验证码',
    getChange: true,
    zhengTrue: false,
    huozheng: '',
    yanzheng: '',
    hpUrl: app.globalData.hpUrl,
    username: '',
    phone: '',
    ajxtrue: false,
    imgMy: '',
    userphone: '',
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    user: '',
    master: [],
    picList: [],
    imgbox3: [], //图片
    video: '', //视频
    imgnum: 0,
    classIndex: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let user = wx.getStorageSync('user');
    // this.token = user;
    console.log(user)
  },
  // 表单判断
  blurPhonel: function(e) {
    var phone = e.detail.value;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      this.setData({
        ajxtrue: false
      })
      if (phone.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
      }
    } else {
      this.setData({
        ajxtrue: true
      })
    }
  },
  yanzhengBtn: function() {
    console.log(1)
    var getChange = this.data.getChange
    var n = 59;
    var that = this;
    var phone = this.data.phone;
    var nchange = this.data.nchange
    console.log(nchange, phone)
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 2000
      })
    } else {
      if (getChange) {
        this.setData({
          getChange: false
        })
        var time = setInterval(function() {
          var str = '(' + n + ')' + '重新获取'
          that.setData({
            getText: str
          })
          if (n <= 0) {
            that.setData({
              getChange: true,
              getText: '重新获取'
            })
            clearInterval(time);
          }
          n--;
        }, 1000);
        Tips.loading();
        wx.request({
          url: app.globalData.hpUrl + 'note_send?phone=' + phone,
          success: function(res) {
            console.log(res)
            var result = res.data.random;
            console.log(res)
            Tips.loaded();
            that.setData({
              huozheng: result,
            })
          }
        })
      }
    }
  },
  // 输入验证码
  yanZhengInput: function(e) {
    var that = this;
    var yanzheng = e.detail.value;
    var huozheng = this.data.huozheng
    console.log(e.detail.value)
    that.setData({
      yanzheng: yanzheng,
      zhengTrue: false,
    })
    if (yanzheng.length >= 4) {
      if (yanzheng == huozheng) {
        that.setData({
          zhengTrue: true,
        })
      } else {
        that.setData({
          zhengTrue: false,
        })
        wx.showModal({
          content: '输入验证码有误',
          showCancel: false,
          success: function(res) {}
        })
      }
    }
  },
  //第一步骤
  formSubmitl: function(e) {
    let that = this
    var phone = e.detail.value.phone;
    this.phone = phone
    let ajxtrue = this.data.ajxtrue;
    var nchange = e.detail.value.nchange;
    console.log(phone, nchange)
    if (phone && nchange) {
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        that.setData({
          ajxtrue: false
        })
        if (phone.length >= 11) {
          wx.showToast({
            title: '手机号有误',
            icon: 'success',
            duration: 2000
          })
        }
      } else {
        console.log('手机号', phone)
        that.setData({
          ajxtrue: true,
          phone: phone
        })
        console.log(e.detail.value.username)
        console.log(ajxtrue)
        wx.request({
          url: app.globalData.hpUrl + 'mami_apply',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: {
            phone: phone,
          },
          success: function(res) {
            console.log(res)
            // var result = res.data;
            // console.log(result)
            console.log('手机号码验证成功，进行下一步')
            wx.navigateTo({
              url: '/pages/apply/fill/fill?phone=' + phone,
            })
          }
        })
      }
    } else {
      wx.showToast({
        title: '请填充完整',
        icon: 'success',
        duration: 2000
      })
    }
  },


  // 手机号码
  blurPhonel: function(e) {
    let that = this
    var phone = e.detail.value;
    console.log(phone)
    if (!(/^1[34578]\d{9}$/.test(phone))) {

      that.setData({
        ajxtrue: false
      })
      if (phone.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
      }
    } else {
      console.log('手机号', phone)
      that.setData({
        ajxtrue: true,
        phone: phone
      })
    }
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
    let that = this
    let userinformation = wx.getStorageSync('userinformation')
    console.log(userinformation)
    if (userinformation.real == 1) {
      that.setData({
        phone: userinformation.real_info.phone
      })
    }
  }
})