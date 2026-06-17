const guestEvents = [
  {
    id: "valentine",
    title: "情人节",
    dateText: "2026年2月14日",
    target: { year: 2026, month: 2, day: 14 },
    iconSrc: "/assets/icons/favorite.svg",
    featured: true
  },
  {
    id: "mother-day",
    title: "母亲节",
    dateText: "2026年5月10日",
    target: { year: 2026, month: 5, day: 10 },
    iconSrc: "/assets/icons/auto-awesome.svg"
  },
  {
    id: "dragon-boat",
    title: "端午节",
    dateText: "2026年6月19日",
    target: { year: 2026, month: 6, day: 19 },
    iconSrc: "/assets/icons/waves.svg"
  }
]

const plans = [
  {
    id: "mother",
    title: "妈妈生日",
    category: "重要",
    quote: "AI提醒：那是爱开始萌芽的日子，一束康乃馨足以温暖整个季节。",
    image: "/assets/home/mother-birthday.jpg",
    target: { year: 2026, month: 5, day: 10 },
    progress: 65,
    featured: true
  },
  {
    id: "trip",
    title: "年终旅行",
    category: "旅行",
    quote: "AI提醒：雪国列车正鸣笛，远方的山峦正悄悄换上银装。",
    image: "/assets/home/year-end-trip.jpg",
    target: { year: 2026, month: 12, day: 31 },
    progress: 45
  },
  {
    id: "project",
    title: "项目交付",
    category: "工作",
    quote: "AI提醒：专注当下的每一刻，收获将与你的汗水成正比。",
    iconSrc: "/assets/icons/work.svg",
    target: { year: 2026, month: 6, day: 28 },
    progress: 90
  }
]

const pinnedPlan = { year: 2026, month: 10, day: 22 }
const springFestival = { year: 2026, month: 2, day: 17 }

function toDate({ year, month, day }) {
  return new Date(year, month - 1, day)
}

function getDaysLeft(target) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const targetDate = toDate(target).getTime()
  const diff = Math.ceil((targetDate - today) / 86400000)
  return diff > 0 ? diff : 0
}

function formatDateText({ year, month, day }) {
  return `${year}年${month}月${day}日`
}

Page({
  data: {
    events: [],
    guestDateText: "",
    guestDaysLeft: 0,
    isLoggedIn: false,
    navShellStyle: "",
    navContentStyle: "",
    navSubtitleStyle: "",
    contentTop: 96,
    mainDaysLeft: 0,
    mainDateText: "",
    plans: []
  },

  onLoad() {
    this.setupNavigation()
    this.syncAuthState()
    this.refreshCountdowns()
  },

  onShow() {
    this.syncAuthState()
    this.refreshCountdowns()
  },

  syncAuthState() {
    const app = getApp()
    const auth = app.getAuthState()

    this.setData({
      isLoggedIn: !!auth.isLoggedIn
    })
  },

  setupNavigation() {
    const system = wx.getSystemInfoSync()
    const menu = wx.getMenuButtonBoundingClientRect()
    const statusBarHeight = system.statusBarHeight || 20
    const menuTop = menu.top || statusBarHeight + 4
    const menuHeight = menu.height || 32
    const menuRight = system.windowWidth && menu.left ? system.windowWidth - menu.left : 88
    const navHeight = menuTop + menuHeight + 30
    const contentTop = navHeight + 6

    this.setData({
      navShellStyle: `height:${navHeight}px;`,
      navContentStyle: `top:${menuTop}px;height:${menuHeight}px;right:${menuRight + 4}px;`,
      navSubtitleStyle: `top:${menuTop + menuHeight + 2}px;`,
      contentTop
    })
  },

  refreshCountdowns() {
    this.setData({
      events: guestEvents.map((item) => ({
        ...item,
        daysLeft: getDaysLeft(item.target)
      })),
      guestDateText: formatDateText(springFestival),
      guestDaysLeft: getDaysLeft(springFestival),
      mainDaysLeft: getDaysLeft(pinnedPlan),
      mainDateText: formatDateText(pinnedPlan),
      plans: plans.map((item) => ({
        ...item,
        daysLeft: getDaysLeft(item.target)
      }))
    })
  },

  performFakeLogin() {
    const app = getApp()

    app.setAuthState({
      isLoggedIn: true,
      phoneCode: "mock_phone_code",
      phoneLabel: "微信用户"
    })

    this.syncAuthState()
    this.refreshCountdowns()

    wx.showToast({
      title: "登录成功",
      icon: "success"
    })

    setTimeout(() => {
      wx.navigateTo({
        url: "/pages/create/create"
      })
    }, 250)
  },

  handleAddCountdown() {
    if (!this.data.isLoggedIn) {
      wx.showModal({
        title: "手机号授权",
        content: "这里先走一个演示授权流程，确认后将默认登录成功。",
        confirmText: "确认授权",
        cancelText: "暂不登录",
        success: ({ confirm }) => {
          if (!confirm) {
            return
          }

          this.performFakeLogin()
        }
      })

      return
    }

    wx.navigateTo({
      url: "/pages/create/create"
    })
  },

  handleViewAll() {
    if (!this.data.isLoggedIn) {
      wx.showToast({
        title: "登录后查看全部",
        icon: "none"
      })
      return
    }

    wx.navigateTo({
      url: "/pages/plans/plans"
    })
  },

  handleTabBook() {
    wx.redirectTo({
      url: "/pages/book/book"
    })
  },

  handleTabMine() {
    wx.redirectTo({
      url: "/pages/mine/mine"
    })
  }
})
