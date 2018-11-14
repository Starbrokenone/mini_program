 //app.js
let config = require('config.js')
App({
  debug: config.debug, //开启后只调用本地数据
  imgCDN: config.imgCDN,
  school: null,
  tmp_school:null,
  globalData: {
    userInfo: null,
    map: null,
    full_map:[],
    introduce: null,
    latitude: null,
    longitude: null,
    pageId: 0,
  },

  onLaunch: function () {
    var _this = this;
    //获取三个校区的所有信息
    if(!_this.full_map)
    {
      for(var i = 0;i <= 2;++i)
      {
        if (i == 0)
        {
          _this.tmp_school = require('/resources/' + config.school + '.js')
        } 
        if (i == 1)
        {
        _this.tmp_school = require('/resources/' + config.school + '1.js')
        }
        if (i == 2)
        {
          _this.tmp_school = require('/resources/' + config.school + '2.js')
        }
        _this.globalData.full_map.push(_this.tmp_school.map);
      }
    }
    //console.log(_this.globalData.full_map[0][0].data[0].name)
    //console.log(_this.globalData.pageId)
    
    //载入本地数据
    if (_this.globalData.pageId == 0)
      _this.school = require('/resources/' + config.school + '.js')
    if (_this.globalData.pageId == 1)
      _this.school = require('/resources/' + config.school + '1.js')
    if (_this.globalData.pageId == 2)
      _this.school = require('/resources/' + config.school + '2.js')

    _this.globalData.map = _this.loadMap();
    _this.globalData.introduce = _this.loadIntroduce();
    //console.log(_this.globalData.map)

    //如果已经授权，提前获取定位信息
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation']) {
          //获取地理位置
          wx.getLocation({
            type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
            success: function (res) {
              //console.log(res)
              _this.globalData.latitude = res.latitude;
              _this.globalData.longitude = res.longitude;
              _this.globalData.islocation = true
            }
          })
        }
      }
    })
  },
  loadMap: function () {
    var buildlData = this.school.map
    if (!this.debug) {
      try {
        var value = wx.getStorageSync('map')
        if (value) {
          //校验格式用
          value[0].name;
          buildlData = value;
        }

      } catch (e) {
        //console.log(e);
        // Do something when catch error
      }
    }
    //渲染id
    for (let i = 0; i < buildlData.length; i++) {
      for (let b = 0; b < buildlData[i].data.length; b++) {
        buildlData[i].data[b].id = b + 1;
      }
    }
    return buildlData;
  },
  loadIntroduce: function () {
    var data = this.school.introduce
    if (this.debug) {
      return data;
    }
    try {
      var value = wx.getStorageSync('introduce')
      if (value) {
        //校验格式用
        value.name;
        return value;
      }
    } catch (e) {
      //console.log(e);
      // Do something when catch error
    }
    return data;
  },
  updateMap: function (cb) {
    wx.request({
      url: config.updateUrl,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.map && res.data.map.length > 0) {
          //存储数据，用于下次打开使用
          console.log("updated network data")
          wx.setStorage({
            key: "map",
            data: res.data.map
          })
          wx.setStorage({
            key: "introduce",
            data: res.data.introduce
          })
          //回调，刷新数据
          typeof cb == "function" && cb(res.data);
        }
      }
    })
  },
  /* onLaunch() {
     // 引入 SDK
     require('./utils/sdk-v1.4.0')
     // 初始化 SDK
     let clientID = '167c6e27b6bdfb3b3506'
     wx.BaaS.init(clientID)
   }*/
})