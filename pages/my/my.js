const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    up: false,   // 点击发布按钮页面上移
    pageIndex: 5,  // 用于控制底部bar条的按钮颜色
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '图像'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      up: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      up: false
    })
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

  },
  /**
   * Bar跳转
   */
  goBar(event) {
    let that =this;
    let item = event.currentTarget.dataset.item;
    switch (item) {
      case 'home':
        {
          util.router('/pages/index/index', 2, null);
          break;
        }
      case 'cata':
        {
          util.router('/pages/cata/cata', 1, null);
          break;
        }
      case 'release':
        {
          that.setData({
            up: true
          })
          setTimeout(()=>{
            util.router('/pages/form/form', 1, null);
          },600)
          break;
        }
      case 'cart':
        {

          break;
        }
      case 'my':
        {
          /** 自身访问不操作 */
          break;
        }
    }
  }
})