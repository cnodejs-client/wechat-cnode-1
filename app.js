import {wxGetStorage} from './utils/wxApi'

//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wxGetStorage('cnode_userInfo').then(res=>{
      if(res.data || res.data.success) {
        this.globalData.cnode_userInfo = res.data;
      }
       console.log('cnode_userInfo')
       console.log(res)
    })
    wxGetStorage('cnode_token').then(res=>{
      this.globalData.cnode_token = res.data;
      console.log('cnode_token')
      console.log(res.data)
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    cnode_token: null,
    cnode_userInfo: null,
    isSubmitTopic: false //是否发表文章
  }
})