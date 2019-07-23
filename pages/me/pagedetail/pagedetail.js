// pages/me/pagedetail/pagedetail.js

var app = getApp();
import Tips from '../../../utils/Tips.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // option: [],
    page: 1,
    pageSize: 10,
    pageN: 2,
    imgbox3: [],
    zans: '/imgs/index/zan_s.png',
    zan: '/imgs/index/zan_n.png',
    video: '', //视频
    imgnum: 0,
    ranking_q: '12',
    ranking_s: '2',
    sjranking_q: '12',
    sjranking_s: '22',
    talentdetail: '',
    manifesto:'',
    is_info:'',
    itemarray: [],
  },

  // 点击头像编辑个人资料
  editInto: function(e) {
    console.log(e)
    let userimage = e.currentTarget.dataset.image
    let name = e.currentTarget.dataset.name
    console.log(userimage)
    console.log(name)
    wx.navigateTo({
      url: '/pages/me/editdata/editdata?data=' + JSON.stringify({
        'userimage': userimage,
        'name': name
      }),
    })
  },

  previewImage: function (e) {
    // console.log('图片+++', e)
    var that = this
    let id = e.currentTarget.dataset.item;
    // console.log('图片数据', id)
    let img = id
    wx.previewImage({
      // current: "that.data.imgUrl",
      urls: img.split(',')
      // 需要预览的图片http链接 使用split把字符串转数组。不然会报错 
    })
  },


  zan: function (e) {
    let that = this
    console.log(e)
    let item = e.currentTarget.dataset.item
    // console.log(item)
    let user = wx.getStorageSync('user');
    let opt = 'praise';
    if (this.data.priase > 0) {
      opt = 'close_praise';
    }
    wx.request({
      url: app.globalData.hpUrl + opt,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userid: user.id,
        leaveid: item.content.id,
      },
      success: function (res) {
        console.log(res)
        let result = res.data.data;
        that.setData({
          priase: opt == 'close_praise' ? 0 : 1,
        })
        let data = that.data.itemarray

        //  轮询查找修改的item,手动变更部分字段
        for (let i = 0; i < data.length; i++) {
          if (data[i].id == item.id) {
            console.log('ddddddddddd', item, data[i].id)
            if (item.priase == 0) {
              data[i].priase = 1
              data[i].content.praise += 1
            } else {
              data[i].priase = 0
              data[i].content.praise -= 1
            }
          }
          that.setData({
            itemarray: data
          })
        }

      }
    })

    //console.log(this.data.iszan);
  },


  // 点击分享事件
  shareInto: function(e) {
    console.log(e)
    wx.showActionSheet({
      itemList: ['生成分享海报', ],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '/pages/index/poster/poster',
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userimage;
    let username;
    let that = this
    let user = wx.getStorageSync('user');
    Tips.loading();
    wx.request({
      url: app.globalData.hpUrl + 'user_info',
      data: {
        userid: user.id,
      },
      success: function(res) {
        console.log('user',res.data.data)
        Tips.loaded();
        let result = res.data.data
        that.setData({
          username: result.username,
          usernumber: result.usernumber,
          userimage: result.userimage,
          vote: result.vote,
          organization: result.info.organization,
          group: result.info.group,
          ranking: result.vote_user.ranking,
          country_rank: result.country_rank,
          area_rank: result.area_rank,
          manifesto: result.info.manifesto,
          image: result.info.image,
          video: result.info.video,
          content: result.content
        })
      }
    })
    // wx.request({
    //   url: app.globalData.hpUrl + 'user_info',
    //   data: {
    //     userid: user.id,
    //   },
    //   success: function (res) {
    //     console.log(res.data.data)
    //     let result = res.data.data
    //     that.setData({
    //       itemarray: result
    //     })
    //   }
    // })
    // 全部留言
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
        new_type: 'leave',
      },
      success: function(res) {
        console.log(res.data.data)
        let result = res.data.data
        that.setData({
          itemarray: result


        })
      }
    })

  },
  // 分享事件
  shareinto: function() {

  },
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


  // 删除视频
  delatevideo: function() {
    this.setData({
      video: null
    })
  },

  // 投票事件
  voteInto: function() {
    wx.showToast({
      title: '投票成功',
      icon: 'success',
      duration: 2000
    })
  },

  // 留言事件
  messageInto: function() {
    wx.navigateTo({
      url: '/pages/index/messageBoard/messageBoard'
    })
  }
})