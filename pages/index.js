//获取应用实例
var app = getApp();
Page({
  data: {
    
    images: app.globalData.introduce.images,
    shortName: app.globalData.introduce.shortName,
    mapCopyright: app.globalData.introduce.mapCopyright,
    imgCDN: app.imgCDN
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.globalData.introduce.name
    })
  },
  onShareAppMessage: function (ops) {
    return {
      title: '太原理工大学校园导览',
      path: `pages/index`,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        var shareTickets = res.shareTickets;
        // if (shareTickets.length == 0) {
        //   return false;
        // }
        // //可以获取群组信息
        // wx.getShareInfo({
        //   shareTicket: shareTickets[0],
        //   success: function (res) {
        //     console.log(res)
        //   }
        // })
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
}) 