// pages/index/areaselect/areaselect.js
const app = getApp()
import getCity from "../../../class/api/getCity.js"
import request from '../../../class/api/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    division: '',
    cityList: [],
    id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //查询所有城市
    var that = this;
   
    let area = wx.getStorageSync('area')
    wx.request({
      url: app.globalData.hpUrl + 'index_organization',
      data:{
        area: area,
      },
      success: function (res) {
        //console.log(res.data.data)
        //console.log(res.data.data[0].organization)
        let result = res.data.data
        that.setData({
          cityList: result,
        })
      }
    })
  },


  // var address = res.data.data.address;
  // var a = address.split('-');
  //获取城市
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(JSON.stringify(res));
        let district = res.result.ad_info.district
        let city = res.result.ad_info.city
        that.setData({
          district: district,
          city: city,
          latitude: latitude,
          longitude: longitude
        })
        console.log(city, district)
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  //getCity(e) {
  //
  //  wx.setStorageSync('areaSelect',{
  //    name: '华东赛区',
  //    id: 2,
  //  })
  //},

   getCity(e) {

     var that = this
     let cityList = that.data.cityList
     //for (let i in cityList) {
     //  cityList[i].selected = false
     //}
     let index = e.currentTarget.dataset.city

    //重置缓存里的数据
     wx.setStorageSync('areaSelect',{
       name: cityList[index].organization,
       id: cityList[index].id,
     })

      //刷新data里的数据
      that.setData({
        division: cityList[index].organization,
        id: cityList[index].id,
      })

      //延迟2秒跳转首页
      setTimeout(function(){
        wx.switchTab({
          url: '/pages/index/index',
        })
      },1000)



   },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;

    //页面进入 数据初始化
    let areaSelect = wx.getStorageSync('areaSelect')
    if(areaSelect) {
      that.setData({
        division: areaSelect.name,
        id: areaSelect.id,
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})