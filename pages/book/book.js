const categories = [
  {
    id: "life",
    title: "生活",
    desc: "记录琐碎日常中的美好",
    count: 8,
    icon: "heart",
    iconSrc: "/assets/icons/favorite.svg",
    tone: "warm"
  },
  {
    id: "study",
    title: "学习",
    desc: "不积跬步，无以至千里",
    count: 5,
    icon: "school",
    iconSrc: "/assets/icons/school.svg",
    tone: "blue"
  },
  {
    id: "anniversary",
    title: "纪念日",
    desc: "有些日子，值得铭记一生",
    count: 3,
    icon: "cake",
    iconSrc: "/assets/icons/cake.svg",
    tone: "red"
  },
  {
    id: "work",
    title: "工作",
    desc: "有条不紊，奔赴热爱",
    count: 12,
    icon: "work",
    iconSrc: "/assets/icons/work.svg",
    tone: "purple"
  },
  {
    id: "travel",
    title: "旅行",
    desc: "去看看这个世界吧",
    count: 4,
    icon: "explore",
    iconSrc: "/assets/icons/explore.svg",
    tone: "green"
  }
]

Page({
  data: {
    categories,
    contentTop: 112,
    navShellStyle: "",
    navContentStyle: ""
  },

  onLoad() {
    this.setupNavigation()
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
