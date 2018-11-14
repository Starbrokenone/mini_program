// pages/map/details.js
//获取应用实例
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    tid: 0,
    bid: 0,
    building: {
      img: []//加载中图片地址
    },
    imgCDN: app.imgCDN,
    poster: 'https://p1.ssl.qhmsg.com/t01c3a0e298d2a18066.png',
    name: '太原理工大学简介',
    author: '清泽心雨综媒电台站',
    src: 'http://cdn5.lizhi.fm/audio/2018/08/28/2689110792254625286_hd.mp3',
  },
  /**
   *  生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id == "index0")
      this.setData({show:true})
      
    var pid = parseInt(options.pid);
    var bid = parseInt(options.bid);
    var tid = parseInt(options.tid);
    if (!options.bid || !options.tid) {
      var data = app.globalData.introduce;
    } else {
      var data = app.globalData.full_map[pid][tid].data[bid];
    }
    this.setData({
      pid:pid,
      bid: bid,
      tid: tid,
      building: data
    });
    wx.setNavigationBarTitle({
      title: data.name
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  }
})