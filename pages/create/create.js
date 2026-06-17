const categories = [
  { id: "life", label: "生活", icon: "/assets/icons/favorite.svg", activeIcon: "/assets/icons/favorite-white.svg" },
  { id: "travel", label: "旅行", icon: "/assets/icons/flight.svg", activeIcon: "/assets/icons/flight-white.svg" },
  { id: "work", label: "工作", icon: "/assets/icons/work.svg", activeIcon: "/assets/icons/work-white.svg" },
  { id: "other", label: "其他", icon: "/assets/icons/more-horiz.svg", activeIcon: "/assets/icons/more-horiz-white.svg" }
]

const iconOptions = [
  { id: "celebration", icon: "/assets/icons/celebration.svg" },
  { id: "spark", icon: "/assets/icons/auto-awesome.svg" },
  { id: "cake", icon: "/assets/icons/cake.svg" },
  { id: "cafe", icon: "/assets/icons/local-cafe.svg" },
  { id: "star", icon: "/assets/icons/star.svg" }
]

Page({
  data: {
    backgroundExpanded: false,
    categories,
    contentTop: 88,
    eventName: "",
    iconOptions,
    navActionStyle: "",
    navShellStyle: "",
    pinned: false,
    proExpanded: false,
    selectedCategory: "life",
    selectedIcon: "celebration"
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
    const navHeight = menuTop + menuHeight + 8

    this.setData({
      navShellStyle: `height:${navHeight}px;`,
      navActionStyle: `top:${menuTop}px;height:${menuHeight}px;`,
      contentTop: navHeight + 36
    })
  },

  handleBack() {
    if (getCurrentPages().length > 1) {
      wx.navigateBack()
      return
    }

    wx.redirectTo({ url: "/pages/index/index" })
  },

  handleDone() {
    wx.showToast({
      title: "已保存",
      icon: "success"
    })

    setTimeout(() => {
      wx.redirectTo({ url: "/pages/index/index" })
    }, 350)
  },

  handleNameInput(event) {
    this.setData({
      eventName: event.detail.value
    })
  },

  handleSelectCategory(event) {
    this.setData({
      selectedCategory: event.currentTarget.dataset.id
    })
  },

  handleSelectIcon(event) {
    this.setData({
      selectedIcon: event.currentTarget.dataset.id
    })
  },

  togglePinned() {
    this.setData({
      pinned: !this.data.pinned
    })
  },

  togglePro() {
    this.setData({
      proExpanded: !this.data.proExpanded
    })
  },

  toggleBackground() {
    this.setData({
      backgroundExpanded: !this.data.backgroundExpanded
    })
  }
})
