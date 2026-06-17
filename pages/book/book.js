const { getCountdownBooks } = require("../../utils/countdown-books")

Page({
  data: {
    categories: [],
    contentTop: 112,
    navShellStyle: "",
    navContentStyle: ""
  },

  onLoad() {
    this.loadCategories()
    this.setupNavigation()
  },

  onShow() {
    this.loadCategories()
  },

  loadCategories() {
    this.setData({
      categories: getCountdownBooks()
    })
  },

  setupNavigation() {
    const system = wx.getSystemInfoSync()
    const menu = wx.getMenuButtonBoundingClientRect()
    const statusBarHeight = system.statusBarHeight || 20
    const menuTop = menu.top || statusBarHeight + 4
    const menuHeight = menu.height || 32
    const menuRight = system.windowWidth && menu.left ? system.windowWidth - menu.left : 88
    const navHeight = menuTop + menuHeight + 8

    this.setData({
      navShellStyle: `height:${navHeight}px;`,
      navContentStyle: `top:${menuTop}px;height:${menuHeight}px;right:${menuRight + menu.width + 12}px;`,
      contentTop: navHeight + 18
    })
  },

  handleAddCategory() {
    wx.showToast({
      title: "登录后添加",
      icon: "none"
    })
  },

  handleTabHome() {
    wx.redirectTo({ url: "/pages/index/index" })
  },

  handleTabMine() {
    wx.redirectTo({ url: "/pages/mine/mine" })
  }
})
