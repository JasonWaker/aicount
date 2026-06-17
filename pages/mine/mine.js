const stats = [
  { id: "active", label: "正在进行", value: 0, primary: true },
  { id: "done", label: "已完成", value: 0 },
  { id: "shared", label: "已分享", value: 0 },
  { id: "total", label: "累计记录", value: 0 }
]

const menus = [
  { id: "templates", title: "我的模板", icon: "/assets/icons/dashboard-customize.svg" },
  { id: "favorites", title: "我的收藏", icon: "/assets/icons/favorite.svg" },
  { id: "settings", title: "中心设置", icon: "/assets/icons/center-focus-strong.svg" },
  { id: "help", title: "帮助与反馈", icon: "/assets/icons/contact-support.svg" }
]

Page({
  data: {
    contentTop: 112,
    isLoggedIn: false,
    phoneLabel: "",
    menus,
    navActionStyle: "",
    navShellStyle: "",
    notifyStyle: "",
    stats
  },

  onLoad() {
    this.setupNavigation()
    this.syncAuthState()
  },

  onShow() {
    this.syncAuthState()
  },

  setupNavigation() {
    const system = wx.getSystemInfoSync()
    const menu = wx.getMenuButtonBoundingClientRect()
    const statusBarHeight = system.statusBarHeight || 20
    const menuTop = menu.top || statusBarHeight + 4
    const menuHeight = menu.height || 32
    const windowWidth = system.windowWidth || 375
    const capsuleRight = menu.right || windowWidth - 8
    const capsuleWidth = menu.width || 87
    const capsuleLeft = menu.left || capsuleRight - capsuleWidth
    const notifyRight = Math.max(windowWidth - capsuleLeft + 6, 56)
    const navHeight = menuTop + menuHeight + 6

    this.setData({
      navShellStyle: `height:${navHeight}px;`,
      navActionStyle: `top:${menuTop}px;height:${menuHeight}px;`,
      notifyStyle: `top:${menuTop}px;height:${menuHeight}px;right:${notifyRight}px;`,
      contentTop: navHeight + 20
    })
  },

  syncAuthState() {
    const app = getApp()
    const auth = app.getAuthState()

    this.setData({
      isLoggedIn: !!auth.isLoggedIn,
      phoneLabel: auth.phoneLabel || ""
    })
  },

  handleGetPhoneNumber(event) {
    const detail = event.detail || {}
    const successCode = detail.code || detail.encryptedData || detail.phoneNumber

    if (!successCode) {
      wx.showToast({
        title: "未完成手机号授权",
        icon: "none"
      })
      return
    }

    const app = getApp()
    const phoneLabel = detail.phoneNumber
      ? detail.phoneNumber.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
      : "微信用户"

    app.setAuthState({
      isLoggedIn: true,
      phoneCode: detail.code || "",
      phoneLabel
    })

    this.syncAuthState()

    wx.showToast({
      title: "登录成功",
      icon: "success"
    })

    setTimeout(() => {
      wx.redirectTo({
        url: "/pages/index/index"
      })
    }, 300)
  },

  handleMenuTap() {
    if (this.data.isLoggedIn) {
      wx.showToast({
        title: "功能开发中",
        icon: "none"
      })
      return
    }

    wx.showToast({
      title: "登录后使用",
      icon: "none"
    })
  },

  handleTabHome() {
    wx.redirectTo({ url: "/pages/index/index" })
  },

  handleTabBook() {
    wx.redirectTo({ url: "/pages/book/book" })
  }
})
