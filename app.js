App({
  globalData: {
    systemInfo: null
  },

  onLaunch() {
    this.globalData.systemInfo = wx.getSystemInfoSync()
  }
})
