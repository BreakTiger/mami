// pages/apply/talent/talent.js
import Tips from '../../../utils/Tips.js';
// import login from '../../../utils/login.js';
var app = getApp()
Page({
  data: {

    hpUrl: app.globalData.hpUrl,
    hpImg: app.globalData.hpImg,
    // option: [],
    imgbox3: [],
    video: '', //视频
    imgnum: 0,
  },
  // 表单提交
  bindSave: function(e) {
    let that = this
    let param = wx.getStorageSync('param');
    var manifesto = e.detail.value
    console.log(manifesto)
    if (manifesto.inter == '') {
      Tips.alert('内容不能为空')
    } else {
      // 请求接口
      wx.request({
        url: app.globalData.hpUrl + 'mami_apply',

        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          userid: param.userid,
          phone: param.phone,
          name: param.name,
          birthday: param.birthday,
          district: param.district,
          organization: param.organization,
          group: param.group,
          manifesto: manifesto.inter
        },
        success: function(res) {
          console.log('文字上传结果', res)
          let id = res.data.data
          let arr = that.data.imgbox3;
          if (that.data.video.length > 0) {
            arr.push(that.data.video);
          }
          console.log(arr)
          console.log(id)
          for (let i = 0; i < arr.length; i++) {
            console.log(arr[i]);
            wx.uploadFile({
              url: app.globalData.hpUrl + 'mima_apply_upload',
              filePath: arr[i],
              name: 'files',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              formData: {
                id: res.data.data
              },
              success: function(res) {
                console.log(res)
              },
              fail: function() {
                console.log(1)
              }
            })
          }
          if (res.data.code == 200) {
            wx.showToast({
              title: '发布成功',
            })
            wx.redirectTo({
              url: "/pages/me/pagedetail/pagedetail"
            })
          } else {
            wx.showToast({
              title: '发布失败',
            })
          }
        }
      })




      let arr = this.data.imgbox3;

      console.log('视频以及图片', arr)


    }
  },



  // 表单提交


  //打开本地视频
  bindButtonTap: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function(res) {
        console.log(res.tempFilePath)
        that.setData({
          video: res.tempFilePath
        })
      }
    })
  },
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
          console.log('file',data[0])
          let arr;
          arr = that.data.imgbox3.concat(data)
          console.log(arr)
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

  // 删除视频
  delatevideo: function() {
    this.setData({
      video: null
    })
  },
  onLoad: function(option) {
    let that = this;
    let param = wx.getStorageSync('param');
    console.log(param)
  },


})