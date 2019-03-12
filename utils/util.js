const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let router = (url, flag, delta)=>{
  switch(flag){
    case 1:{
      wx.navigateTo({
        url: url,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      break;
    }
    case 2:{
      wx.redirectTo({
        url: url,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      break;
    }
    case 3:{
      wx.navigateBack({
        delta: delta
      })
      break;
    }
  }
 
}


module.exports = {
  router: router
}
