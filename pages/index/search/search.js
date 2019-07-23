// pages/index/search/search.js
var app = getApp();
//cid不能乱改，下面有函数sonSort的二级选择有用到

import Tips from '../../../utils/Tips.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hpUrl: app.globalData.hpUrl,
    pageN: 2,
    // 底部加载信息
    pageTottomText: '',
    // shoplist: [],
    api: app.globalData.hpUrl,
    arr2: [],
    servers: [],
    searchText: '',
  },


  // 搜索框控制函数
  bindseInput: function(e) {
    let that = this;
    that.setData({
      searchText: e.detail.value
    });
  },



clickimgInto:function(e){
console.log(e)
let clickpicture = e.currentTarget.dataset.item
  wx.navigateTo({
    url: '/pages/index/otherpage/otherpage?id=' + clickpicture.id,
  })
},


// otherpageInto: function (e) {
//   let clickpicture = e.currentTarget.dataset.item
//   console.log('otherpage', clickpicture)
//   wx.navigateTo({
//     url: 'otherpage/otherpage?id=' + clickpicture.id,
//   })
// },



  // onLoad: function (options) {
  //   let type = options.type;
  //   let that = this;
  //   wx.request({
  //     url: that.data.api + "index.php/Home/Collaborate/selectByTypeAll",
  //     data: {
  //       type: type
  //     },
  //     success: function (res) {
  //       console.log(res)
  //       let datas = res.data;
  //       let length = datas.length;
  //       let arrs = [];
  //       for (let i = 0; i < length; i++) {
  //         arrs.push(datas[i]);
  //         arrs[i] = {
  //           img: datas[i].url,
  //           name: datas[i].companyname,
  //           tel: datas[i].phone,
  //           comtel: datas[i].telphone,
  //           detailname: datas[i].detailname,
  //           loc: {
  //             longitude: datas[i].targety,
  //             latitude: datas[i].targetx
  //           },
  //           person: datas[i].principal
  //         }
  //       }
  //       that.setData({
  //         servers: arrs
  //       })
  //     }
  //   })
  // },

  // 请求数据
  reData: function(e) {
    let that = this;
    let user = wx.getStorageSync('user');
    let searchText = this.data.searchText;
    console.log(searchText)
    if (searchText != '') {
      Tips.loading();
      wx.request({
        url: app.globalData.hpUrl + 'index_like', //接口地址
        data: {
          search: searchText,
          userid: user.id
        },

        success: function(res) {
          console.log(res.data)
          Tips.loaded();
          that.setData({
            servers: res.data.data
          });
        }
      })
    }
  }
})