const AUTH_STORAGE_KEY = "ai_countdown_auth"

App({
  globalData: {
    auth: {
      isLoggedIn: false,
      phoneLabel: "",
      phoneCode: ""
    },
    systemInfo: null
  },

  onLaunch() {
    this.globalData.systemInfo = wx.getSystemInfoSync()
    this.loadAuthState()
  },

  loadAuthState() {
    try {
      const auth = wx.getStorageSync(AUTH_STORAGE_KEY)
      if (auth && auth.isLoggedIn) {
        this.globalData.auth = {
          isLoggedIn: true,
          phoneCode: auth.phoneCode || "",
          phoneLabel: auth.phoneLabel || ""
        }
      }
    } catch (error) {
      this.globalData.auth = {
        isLoggedIn: false,
        phoneCode: "",
        phoneLabel: ""
      }
    }
  },

  getAuthState() {
    return {
      ...this.globalData.auth
    }
  },

  setAuthState(authState) {
    this.globalData.auth = {
      isLoggedIn: !!authState.isLoggedIn,
      phoneCode: authState.phoneCode || "",
      phoneLabel: authState.phoneLabel || ""
    }

    wx.setStorageSync(AUTH_STORAGE_KEY, this.globalData.auth)
  },

  clearAuthState() {
    this.globalData.auth = {
      isLoggedIn: false,
      phoneCode: "",
      phoneLabel: ""
    }

    wx.removeStorageSync(AUTH_STORAGE_KEY)
  }
})
