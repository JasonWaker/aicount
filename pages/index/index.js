const events = [
  {
    id: "valentine",
    title: "情人节",
    dateText: "2026年2月14日",
    target: "2026/02/14",
    icon: "heart",
    featured: true
  },
  {
    id: "mother",
    title: "母亲节",
    dateText: "2026年5月10日",
    target: "2026/05/10",
    icon: "sparkles"
  },
  {
    id: "dragon",
    title: "端午节",
    dateText: "2026年6月19日",
    target: "2026/06/19",
    icon: "waves"
  }
]

function getDaysLeft(target) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const targetDate = new Date(target).getTime()
  const diff = Math.ceil((targetDate - today) / 86400000)
  return diff > 0 ? diff : 0
}

Page({
  data: {
    navShellStyle: "",
    navContentStyle: "",
    contentTop: 96,
    mainDaysLeft: 0,
    events: []
  },

  onLoad() {
    this.setupNavigation()
    this.refreshCountdowns()
  },

  onShow() {
    this.refreshCountdowns()
  },

  setupNavigation() {
    const system = wx.getSystemInfoSync()
    const menu = wx.getMenuButtonBoundingClientRect()
    const statusBarHeight = system.statusBarHeight || 20
    const menuTop = menu.top || statusBarHeight + 4
    const menuHeight = menu.height || 32
    const menuRight = system.windowWidth && menu.left ? system.windowWidth - menu.left : 88
    const navHeight = menuTop + menuHeight + 6
    const contentTop = navHeight + 8

    this.setData({
      navShellStyle: `height:${navHeight}px;`,
      navContentStyle: `top:${menuTop}px;height:${menuHeight}px;right:${menuRight + 4}px;`,
      contentTop
    })
  },

  refreshCountdowns() {
    this.setData({
      mainDaysLeft: getDaysLeft("2026/02/17"),
      events: events.map((item) => ({
        ...item,
        daysLeft: getDaysLeft(item.target)
      }))
    })
  },

  handleAddCountdown() {
    wx.showToast({
      title: "登录后添加",
      icon: "none"
    })
  },

  handleViewAll() {
    wx.showToast({
      title: "更多节日即将上线",
      icon: "none"
    })
  }
})
