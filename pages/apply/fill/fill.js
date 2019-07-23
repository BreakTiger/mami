// pages/apply/fill/fill.js
//获取应用实例
var app = getApp()
import Tips from '../../../utils/Tips.js';
import initAreaPicker, {
  getSelectedAreaData
} from '../../../templates/area/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgMy: '',
    hpUrl: app.globalData.hpUrl,
    imgUrl: app.globalData.imgUrl,
    user: '',
    master: [],
    picList: [],

    classIndex: 0,
    //出生日期选择
    date: '1999-09-01',
    //参赛机构
    cansaiArray: [],
    cansaiIndex: 0,
    cansaiIdArray: [],
    // 才艺类型
    talentArray: [],
    talentIndex: 0,
    region: [],
    areaPicker: {},
    showArea: false
  },

  //获取参赛
  getCansai: function() {
    let that = this;
    let area = that.data.region.join('-')
    Tips.loading();
    wx.request({
      url: app.globalData.hpUrl + 'index_organization',
      data: {
        area: area,
      },
      success: function(res) {
        Tips.loaded();
        console.log(res.data.data)
        let result = res.data.data
        if (result.length > 0) {
          let cansaiArray = []
          let cansaiIdArray = []
          for (let i = 0; i < result.length; i++) {
            cansaiArray.push(result[i].organization)
            cansaiIdArray.push(result[i].id)
          }
          that.setData({
            cansaiArray: cansaiArray,
            cansaiIndex: 0,
            cansaiIdArray: cansaiIdArray,
          })

          that.getTalent()
        } else {
          //接口无数据返回处理
          that.setData({
            cansaiArray: [],
            cansaiIndex: 0,
            cansaiId: '',
            talentArray: [],
            talentIndex: 0,
          })
        }

      }
    })
  },
  //获取才艺
  getTalent: function() {
    let that = this;
    let cansaiId = that.data.cansaiIdArray[that.data.cansaiIndex]
    Tips.loading();
    wx.request({
      url: app.globalData.hpUrl + 'index_talent',
      data: {
        organization_id: cansaiId,
      },
      success: function(res) {
        console.log(res.data.data)
        let result = res.data.data
        Tips.loaded();
        if (result.length > 0) {
          let talentArray = []
          for (let i = 0; i < result.length; i++) {
            talentArray.push(result[i].talent)
          }
          that.setData({
            talentArray: talentArray,
            talentIndex: 0,
          })
        } else {
          //接口无数据返回处理
          that.setData({
            talentArray: [],
            talentIndex: 0,
          })
        }

      }
    })
  },


  //出生日期
  bindDateChange: function(e) {
    console.log('建校时间发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //参赛机构
  goCansaiChange: function(e) {
    console.log('参赛机构选择改变，携带值为', e.detail.value)
    this.setData({
      cansaiIndex: e.detail.value,
    })

    this.getTalent()

  },
  //才艺类型
  gotalentChange: function(e) {
    console.log('才艺类型选择改变，携带值为', e.detail.value)
    this.setData({
      talentIndex: e.detail.value
    })
  },
  // 所在赛区
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
    this.getCansai()
  },

  // 提交请求
  //第二步 下一步
  formSubmit2: function(e) {
    let that = this
    let che = e.detail.value;
    let user = wx.getStorageSync('user');
    //请求参数
    let params = {
      userid: user.id,
      phone: that.data.phone,
      name: che.name,
      birthday: che.establish,
      district: that.data.region.join('-'),
      organization: that.data.cansaiArray[that.data.cansaiIndex],
      group: che.talenttype,
    }

    wx.setStorageSync('param', params)
    if (params.name == '') {
      wx.showModal({
        title: '提示',
        content: '姓名不能为空',
        showCancel: false,
        success: function(res) {}
      })
    } else {
      wx.navigateTo({
        url: '/pages/apply/talent/talent',
      })
      // wx.request({
      //   url: app.globalData.hpUrl + 'mami_apply',
      //   header: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   method: "POST",
      //   data: params,
      //   success: function (res) {
      //     console.log(res)
      //     var result = res.data;
      //     console.log(result)
      //     console.log('成功，下一步')

      //      wx.navigateTo({
      //        url: '/pages/apply/talent/talent',
      //      })

      //   }
      // })
    }



  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    let that = this;

    that.setData({
      phone: option.phone,
    });
    console.log(option.phone);

    initAreaPicker();

    //页面进入 数据初始化
    let area = wx.getStorageSync('area')
    if (area) {
      let region = area.split('-')
      that.setData({
        region: region,
      })
      that.getCansai()
    }
  },
  selectArea: function(e) {
    let that = this;
    this.setData({
      showArea: true
    });
  },
  hideArea: function(e) {
    this.setData({
      showArea: false
    });
  },
  confirmArea: function(e) {
    let area = getSelectedAreaData();
    console.log('area', area);
    this.setData({
      showArea: false,
      region: [area[0].code, area[1].code, area[2].code]
    });
    this.getCansai();
  }
})


//地址动画事件
function animationEvents(that, moveY, show) {
  // console.log("moveY:" + moveY + "\nshow:" + show);
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  })
  that.animation.translateY(moveY + 'vh').step()
  // console.log(show)
  that.setData({
    animation: that.animation.export(),
    show: show
  })

}

// ---------------- 分割线 ---------------- 

//获取省份数据
function getProvinceData(that) {
  // console.log('1')
  var s;
  provinces = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    s = areaInfo[i];
    if (s.di == "00" && s.xian == "00") {
      provinces[num] = s;
      num++;
    }
  }
  // console.log(provinces)
  that.setData({
    provinces: provinces
  })

  //初始化调一次
  getCityArr(0, that);
  getCountyInfo(0, 0, that);
  that.setData({
    // province: "北京市",
    // city: "市辖区",
    // county: "东城区",
    province: "",
    city: "",
    county: "",
    valuetext: ''
  })

}

// 获取地级市数据
function getCityArr(count, that) {
  var c;
  citys = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    c = areaInfo[i];
    if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
      citys[num] = c;
      num++;
    }
  }
  if (citys.length == 0) {
    citys[0] = {
      name: ''
    };
  }

  that.setData({
    city: "",
    citys: citys,
    value: [count, 0, 0]
  })
}

// 获取区县数据
function getCountyInfo(column0, column1, that) {
  var c;
  countys = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    c = areaInfo[i];
    if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
      countys[num] = c;
      num++;
    }
  }
  if (countys.length == 0) {
    countys[0] = {
      name: ''
    };
  }
  that.setData({
    county: "",
    countys: countys,
    value: [column0, column1, 0]
  })
}
// 日历--------------------------------------------------------------------------------------------