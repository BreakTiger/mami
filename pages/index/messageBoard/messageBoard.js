// pages/index/messageBoard/messageBoard.js
import Tips from '../../../utils/Tips.js';
let app = getApp();
Page({
  data: {
    imgbox3: [],
    useridd: '',
    hpUrl: app.globalData.hpUrl,
    imgnum: 0,
    imgArr: [],
    pagesData: "",
  },
  formsubmit: function(e) {

    let user = wx.getStorageSync("user");
    let value = e.detail.value.content;
    let imgarr = this.data.imgbox3;
    console.log(value)
    let that = this;
    let arr = [];
    for (let i = 0; i < imgarr.length; i++) {
      arr.push(imgarr[i])
    }
    if (value.length == 0) {
      wx.showToast({
        title: '输入不能为空',
        icon: "loading",
        duration: 500
      })
    } else {
      let user = wx.getStorageSync('user');
      console.log(user.id)
      Tips.loading();
      wx.request({
        url: that.data.hpUrl + "user_leave",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          userid: user.id,
          content: value,
          leave_userid: that.data.useridd
        },
        success: function(res) {
          let self = that;
          console.log(res.data.data)
          Tips.loaded();          
          if (res.data.data) {

            if (arr.length != 0) {
              console.log('image', arr)
              for (let i = 0; i < arr.length; i++) {
                console.log('art id', res.data.data)
                Tips.loading();
                wx.uploadFile({
                  url: that.data.hpUrl + "user_leave_upload",
                  formData: {
                    id: res.data.data

                  },
                  filePath: arr[i],
                  name: 'files',
                  method: "post",
                  header: {
                    "content-type": "multipart/form-data"
                  },
                  success: function(res) {
                    Tips.loaded();
                    Tips.toast('发布成功');
                    console.log(res)
                    if (i == arr.length - 1) {
                      setTimeout(function() {
                        wx.redirectTo({
                          url: "/pages/index/otherpage/otherpage?id=" + that.data.useridd
                        })
                      }, 2000)
                    }

                  }
                })
              }
            } else {
              Tips.loaded();
              Tips.toast('发布成功');
              setTimeout(function() {
                wx.redirectTo({
                  url: "/pages/index/otherpage/otherpage?id=" + that.data.useridd
                })
              }, 2000)
            }
          }
        }
      })
    }
  },

  // 图片选择和上传

  // 添加图片
  addimage: function(e) {
    var that = this;
    let imgbox3 = that.data.imgbox3
    if (imgbox3.length < 9) {
      wx.chooseImage({
        count: 9 - imgbox3.length,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          let data = res.tempFilePaths;
          console.log(data)
          let arr;
          arr = that.data.imgbox3.concat(data)
          that.setData({
            imgbox3: arr
          })
        }
      })
    }

  },

  // 删除上传的图片
  delateimg: function(e) {
    let that = this
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let imgbox = this.data.imgbox3;
    imgbox.splice(index, 1)
    that.setData({
      imgbox3: imgbox,
    });
  },

  onLoad: function(options) {
    console.log(options.data)
    let useridd = options.id
    console.log(useridd)
    this.setData({
      useridd: useridd
    })


  }


})