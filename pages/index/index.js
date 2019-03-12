import * as echarts from '../../ec-canvas/echarts';
const util = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    cardCur: 0,
    tower: [{
      id: 0,
      url: 'https://image.weilanwl.com/img/4x3-1.jpg'
    }, {
      id: 1,
      url: 'https://image.weilanwl.com/img/4x3-2.jpg'
    }, {
      id: 2,
      url: 'https://image.weilanwl.com/img/4x3-3.jpg'
    }, {
      id: 3,
      url: 'https://image.weilanwl.com/img/4x3-4.jpg'
    }, {
      id: 4,
      url: 'https://image.weilanwl.com/img/4x3-2.jpg'
    }, {
      id: 5,
      url: 'https://image.weilanwl.com/img/4x3-4.jpg'
    }, {
      id: 6,
      url: 'https://image.weilanwl.com/img/4x3-2.jpg'
    }],
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'orange',
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'yellow',
      name: '图像'
    }, {
      icon: 'noticefill',
      color: 'olive',
      name: '通知'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      name: '皮肤'
    }],
    // Bar左侧头像
    showDefault: true,
    // 加载Echarts
    ec: {
      onInit: initChart
    },
    pageIndex: 1, // 用于控制底部bar条的按钮颜色
    up: false // 点击发布按钮页面上移
  },
  onLoad() {
    let that = this;
    this.towerSwiper('tower');
    // 判断是否授权UserInfo
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已授权
          wx.getUserInfo({
            success(res) {
              let userInfo = res.userInfo;
              that.setData({
                showDefault: false,
                wxAvatar: userInfo.avatarUrl
              })
            }
          })
        }
      }
    })
  },
  onHide: function() {
    this.setData({
      up: false
    })
  },
  onUnload: function() {
    this.setData({
      up: false
    })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      towerList: list
    })
  },

  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },

  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },

  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.towerList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        towerList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        towerList: list
      })
    }
  },

  // 授权头像等信息
  bindGetUserInfo(e) {
    let userInfo = e.detail.userInfo;
    if (userInfo) {
      this.setData({
        showDefault: false,
        wxAvatar: userInfo.avatarUrl
      })
    }
  },

  /**
   * Bar跳转
   */
  goBar(event) {
    let that = this;
    let item = event.currentTarget.dataset.item;
    switch (item) {
      case 'home':
        {
          /** 自己访问自身页面不做操作 */
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
          setTimeout(() => {
            util.router('/pages/form/form', 1, null);
          }, 600)
          break;
        }
      case 'cart':
        {

          break;
        }
      case 'my':
        {
          util.router('/pages/my/my', 2, null);
          break;
        }
    }
  }

});

/**
 * 初始化控件方法
 */
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      }
    }],
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      type: 'value',
      axisLabel: {
        formatter: '{value} 步',
        textStyle: {
          color: '#999'
        }
      }
    },
    series: [{
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1, [{
                offset: 0,
                color: '#ec008c'
              },
              {
                offset: 1,
                color: '#6739b6'
              }
            ]
          )
        },
        emphasis: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1, [{
                offset: 0,
                color: '#ec008c'
              },
              {
                offset: 1,
                color: '#6739b6'
              }
            ]
          )
        }
      },
      name: '直接访问',
      type: 'bar',
      barWidth: '30%',
      data: [10, 52, 200, 334, 390, 330, 220]
    }]
  };

  chart.setOption(option);
  return chart;
}