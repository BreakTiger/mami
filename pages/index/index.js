//index.js
//获取应用实例
import modals from '../../class/base/modal.js'
const request = require('../../class/api/request.js')
var QQMapWX = require('../../qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp()
import Tips from '../../utils/Tips.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageA: 2,
    pageSize: 10,
    pageB: 2,
    nomoreA: false,
    nomoreB: false,
    division: '',
    hpUrl: app.globalData.hpUrl,
    userInfo: {},
    hasUserInfo: false,
    userid: '',
    useridd: '',
    city: '',
    district: '',
    province: '',
    latitude: '',
    longitude: '',
    is_info: '',
    cityId: '', //城市id
    navbar: ['全国排行', '本地排行'],
    datalist: [],
    //轮播图
    banner: [],
    userimage: '',
    NO: '',
    username: '',
    name: '',
    zannum: '0',
    clicknum: 2,
    // 第四名开始排名
    arr2: [],
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
  },
  // 搜索跳转页
  searchInto: function() {
    wx.navigateTo({
      url: 'search/search'
    })
  },

// 轮播图跳转
  slideshowInto:function(){
    wx.navigateTo({
      url: '',
    })
  },

  // ta人主页跳转
  otherpageInto: function(e) {
    let clickpicture = e.currentTarget.dataset.item
    console.log('otherpage', clickpicture)
    wx.navigateTo({
      url: 'otherpage/otherpage?id=' + clickpicture.id,
    })
  },

  // 我的主页跳转
  clickmypic: function(e) {
    let clickpicture = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/me/pagedetail/pagedetail?data=' + JSON.stringify(clickpicture),
    })
  },

  // 当前赛区
  toArea: function(e) {
    let toAreae = e.currentTarget.dataset.item
    //console.log(toAreae)
    wx.navigateTo({
      url: 'areaselect/areaselect',
    })
  },
  // 导航切换
  navbarTap: function(e) {
    let index = e.currentTarget.dataset.idx
    this.setData({
      currentTab: index,
    })
    if (index == 0) {
      // 全国排行
      this.getData()
    } else {
      //本地排行
      console.log('local rank')
      this.getareaData()
      //console.log(index)
    }
  },

  onLoad: function() {
    qqmapsdk = new QQMapWX({
      key: 'MUFBZ-4QHC4-HI4UD-DPYWB-XOLIQ-N4B4I'
    });

    let user = wx.getStorageSync('user');
    // let useridd = options.id
    // console.log(useridd)

    // 1，首页轮播请求
    var that = this;
    wx.request({
      url: app.globalData.hpUrl + 'index_poster',
      success: function(res) {
        let result = res.data.data
        that.setData({
          banner: result,
        })
      }
    })
  },
  //  获取全国排行
  getData() {
    let that = this
    let areaSelect = wx.getStorageSync('areaSelect')
    let area = wx.getStorageSync('area')
    let organization = areaSelect.name
    //console.log(organization)
    // console.log(division)
    that.getUserLocation();
    let user = wx.getStorageSync('user');
    console.log(user.id);
    let openid = app.globalData.openid;
    //console.log(openid)
    wx.request({
      url: app.globalData.hpUrl + 'index_my_rank',
      data: {
        userid: user.id,
      },
      success: function(res) {
        console.log('current', res.data.data)
        let result = res.data.data
        if (res.data.code == 200) {
          that.setData({
            username: result.username,
            name: result.name,
            userimage: result.userimage,
            ranking: result.ranking,
            vote: result.vote
          })
        }
      }
    })

    // 全国排行榜百万妈咪
    Tips.loading();
    wx.request({
      url: app.globalData.hpUrl + 'country_ranking',
      data: {
        userid: user.id,
        page: 1,
        size: that.data.pageSize,
      },

      success: function(res) {
        console.log(res)
        let result = res.data.data;
        let useridd = result.id
        console.log(useridd)
        Tips.loaded();
        console.log('排行', result)
        if (result.length > 3) {
          var arr1 = []
          arr1 = result.slice(0, 3)
          console.log(arr1)
          var arr2 = []
          arr2 = result.slice(3, result.length)
          console.log(arr1, arr2, result.length)
          that.setData({
            datalist: arr1,
            arr2: arr2
          })
        } else {
          that.setData({
            datalist: result,
            arr2: []
          })
        }

      }
    })

  },
  // 本地排行
  getareaData() {
    let that = this
    let areaSelect = wx.getStorageSync('areaSelect')
    let area = wx.getStorageSync('area')
    let user = wx.getStorageSync('user')
    //console.log(areaSelect)
    let organization = areaSelect.name
    Tips.loading();
    wx.request({
      url: app.globalData.hpUrl + 'index_area_rank',
      data: {
        area: area,
        organization: areaSelect.name,
        userid: user.id,
      },
      success: function(res) {
        console.log('current user:', res.data.data)
        let result = res.data.data
        Tips.loaded();
        if (res.data.code == 200) {
          that.setData({
            username: result.username,
            name: result.name,
            userimage: result.userimage,
            ranking: result.ranking,
            vote: result.vote
          })
        }
      }
    })

    // 本地排行榜百万妈咪
    Tips.loading();
    wx.request({
      url: app.globalData.hpUrl + 'area_ranking',
      data: {
        page: 1,
        size: that.data.pageSize,
        area: area,
        organization: areaSelect.name,
        userid: user.id,
      },
      success: function(res) {
        console.log(res)
        Tips.loaded();
        let result = res.data.data;

        console.log('本地排行', result)
        if (result.length > 3) {
          var arr1 = []
          arr1 = result.slice(0, 3)
          console.log(arr1)
          var arr2 = []
          arr2 = result.slice(3, result.length)
          console.log(arr1, arr2, result.length)
          that.setData({
            datalist: arr1,
            arr2: arr2
          })
        } else {
          that.setData({
            datalist: result,
            arr2: []
          })
        }

      }
    })

  },



  // 全国投票事件
  voteInto: function(e) {
    console.log(e)
    let item = e.currentTarget.dataset.item
    let clickimg = e.currentTarget.dataset.item.id
    console.log('全国投票事件', clickimg)

    let that = this
    let user = wx.getStorageSync('user');
    Tips.loading();
    wx.request({
      url: app.globalData.hpUrl + 'user_vote',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        userid: user.id,
        vote_userid: clickimg
      },
      success: function(res) {
        Tips.loaded();
        if (res.data.code == 200) {
          console.log(res)
          let quanguodata = that.data.datalist
          let data = that.data.arr2
          console.log(data)
          console.log(quanguodata)
          for (let i = 0; i < data.length; i++) {
            if (data[i].id == item.id) {
              console.log('全国排行', item, data[i].id)
              if (item.arr2 == 0) {
                data[i].arr2 = 0
                data[i].vote_num -= 1
              } else {
                data[i].arr2 = 1
                data[i].vote_num += 1
              }
            }
            that.setData({
              arr2: data
            })
          }
          // 前三名
          for (let i = 0; i < quanguodata.length; i++) {
            if (quanguodata[i].id == item.id) {
              console.log('全国排行', item, quanguodata[i].id)
              if (item.datalist == 0) {
                quanguodata[i].datalist = 0
                quanguodata[i].vote_num -= 1

              } else {
                quanguodata[i].datalist = 1
                quanguodata[i].vote_num += 1
              }
            }
            that.setData({
              datalist: quanguodata
            })
          }

          wx.showToast({
            title: '投票成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '次数已用完',
            icon: 'success',
            duration: 2000
          })
        }


      }
    })
  },


  // 本地排行投票事件
  areaInto: function(e) {
    console.log(e)
    let item = e.currentTarget.dataset.item
    let clickimg = e.currentTarget.dataset.item.id
    console.log('投票事件', clickimg)

    let that = this
    let user = wx.getStorageSync('user');
    Tips.loading();
    wx.request({
      url: app.globalData.hpUrl + 'user_vote',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        userid: user.id,
        vote_userid: clickimg
      },
      success: function(res) {
        Tips.loaded();
        if (res.data.code == 200) {
          console.log(res)
          let areadata = that.data.datalist
          let data = that.data.arr2
          console.log(data)
          for (let i = 0; i < data.length; i++) {
            if (data[i].id == item.id) {
              console.log('本地排行', item, data[i].id)
              if (item.arr2 == 0) {
                data[i].arr2 = 0
                data[i].vote_num -= 1
              } else {
                data[i].arr2 = 1
                data[i].vote_num += 1
              }
            }
            that.setData({
              arr2: data
            })
          }
          // 本地排行前三名
          for (let i = 0; i < areadata.length; i++) {
            if (areadata[i].id == item.id) {
              console.log('本地排行', item, areadata[i].id)
              if (item.datalist == 0) {
                areadata[i].datalist = 0
                areadata[i].vote_num -= 1
              } else {
                areadata[i].datalist = 1
                areadata[i].vote_num += 1
              }
            }
            that.setData({
              datalist: areadata
            })
          }
          wx.showToast({
            title: '投票成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '次数已用完',
            icon: 'success',
            duration: 2000
          })
        }

      }
    })
  },
  // 本地排行结束

  onShow: function() {
    console.log()
    let userimg = wx.getStorageSync('userinfo')
    let that = this;
    let area = wx.getStorageSync('area')
    let areaSelect = wx.getStorageSync('areaSelect')
    //console.log(area)
    if (areaSelect && areaSelect.name) {
      that.setData({
        division: areaSelect.name,
      })
    }
    //重置缓存里的数据
    wx.getStorageSync('areaSelect')
    let organization = areaSelect.name
    that.getUserLocation();
    let user = wx.getStorageSync('user');
    let openid = app.globalData.openid;
    // let useridd=
    wx.request({
      url: app.globalData.hpUrl + 'user_info',
      data: {
        userid: user.id,
      },
      success: function(res) {
        //console.log(res)
        let data = res.data.data
        //console.log(data)
        wx.setStorageSync('userinformation', data)
      }
    })
    that.setData({
      user: user,
      userimg: userimg
    })
    // 首页数据
    this.getData()
  },

  loadMoreA: function() {
    this.setData({
      pageTottomText: ''
    });
    if (this.data.nomore == true) return;
    let user = wx.getStorageSync('user');
    let that = this;
    let pageN = this.data.pageA;
    let item = this.data.arr2;
    console.log(pageN)
    that.setData({
      pageTottomText: getApp().globalData.addText,
    });
    Tips.loading();
    wx.request({
      url: app.globalData.hpUrl + 'country_ranking',

      data: {
        userid: user.id,
        page: that.data.pageA,
        size: that.data.pageSize,
      },
      success: function(res) {
        let arr = [];
        Tips.loaded();
        console.log(res.data.data)
        let result = res.data.data;
        // shops: res.data.data
        // 判断分页
        if (result.length > 0) {
          pageN += 1;
          that.setData({
            pageA: pageN
          });
          setTimeout(function() {
            item = item.concat(result)
            that.setData({
              arr2: item
            });
          }, 1000);
        } else {

          that.setData({
            pageTottomText: getApp().globalData.endText,
            nomoreA: true
          });
        }
        //----------------------------------------------
      }
    })
  },

  loadMoreB: function() {
    let area = wx.getStorageSync('area');
    let areaSelect = wx.getStorageSync('areaSelect');
    this.setData({
      pageTottomText: ''
    });
    if (this.data.nomore == true) return;
    let user = wx.getStorageSync('user');
    let that = this;
    let pageN = this.data.pageA;
    let item = this.data.arr2;
    console.log(pageN)
    that.setData({
      pageTottomText: getApp().globalData.addText,
    });
    Tips.loading();
    wx.request({
      url: app.globalData.hpUrl + 'area_ranking',
      data: {
        page: that.data.pageB,
        size: that.data.pageSize,
        area: area,
        organization: areaSelect.name,
        userid: user.id
      },
      success: function(res) {
        let arr = [];
        Tips.loaded();
        console.log(res.data.data)
        let result = res.data.data;
        // shops: res.data.data
        // 判断分页
        if (result.length > 0) {
          pageN += 1;
          that.setData({
            pageB: pageN
          });
          setTimeout(function() {
            item = item.concat(result)
            that.setData({
              datalist: item
            });
          }, 1000);
        } else {

          that.setData({
            pageTottomText: getApp().globalData.endText,
            nomoreB: true
          });
        }
        //----------------------------------------------
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let idx = this.data.currentTab;
    if (idx == 0) {
      this.loadMoreA();
    } else {
      this.loadMoreB();
    }
  },



  // getUserInfo: function (e) {
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  getUserLocation: function() {
    let that = this;
    wx.getSetting({
      success: (res) => {
        //console.log(JSON.stringify(res))
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      that.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          that.getLocation();
        } else {
          //调用wx.getLocation的API
          that.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function() {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        // console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        that.getLocal(latitude, longitude)
      },
      fail: function(res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function(latitude, longitude) {
    let that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        //console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let district = res.result.ad_info.district
        let city = res.result.ad_info.city
        that.setData({
          province: province,
          district: district,
          city: city,
          latitude: latitude,
          longitude: longitude
        })

        wx.setStorageSync('area', province + '-' + city + '-' + district)
        // wx.setStorageSync('area','浙江省-杭州市-江干区')

        console.log(district, city)
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        //console.log(res);
      }
    });
  },



  // selectinto: function() {
  //   wx.navigateTo({
  //     url: '/libs/citySelector/switchcity/switchcity',
  //   })
  // },

  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },

  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onShareAppMessage: function(option) {
    return {
      title: '百万妈咪'
    };
  }
})