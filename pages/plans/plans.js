const categories = ["全部", "生活", "纪念日", "工作", "旅行"]

const plans = [
  {
    id: "mom-birthday",
    title: "妈妈生日",
    quote: "“那是爱开始萌芽的日子...”",
    days: 15,
    note: "期待那一刻的到来",
    image: "/assets/plans/plan-1.jpg",
    pinned: true,
    tone: "primary"
  },
  {
    id: "trekking",
    title: "川西徒步计划",
    quote: "“在群山间找回呼吸的节奏。”",
    days: 42,
    note: "每一天都值得被记录",
    image: "/assets/plans/plan-2.jpg",
    tone: "secondary"
  },
  {
    id: "proposal",
    title: "设计提案截止",
    quote: "“灵感总是偏爱专注的心。”",
    days: 3,
    note: "专注当下的每一刻",
    image: "/assets/plans/plan-3.jpg",
    tone: "error"
  },
  {
    id: "anniversary",
    title: "相识三周年",
    quote: "“陪你走过四季，未觉路远。”",
    days: 128,
    note: "爱在岁月中沉淀",
    image: "/assets/plans/plan-4.jpg",
    tone: "primary"
  },
  {
    id: "checkup",
    title: "年度体检",
    quote: "“爱自己的第一步是关心身体。”",
    days: 12,
    note: "温柔地对待自己",
    image: "/assets/plans/plan-5.jpg",
    tone: "secondary"
  }
]

Page({
  data: {
    activeCategory: "全部",
    categories,
    contentTop: 104,
    navShellStyle: "",
    navContentStyle: "",
    plans
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
    const contentTop = navHeight

    this.setData({
      navShellStyle: `height:${navHeight}px;`,
      navContentStyle: `top:${menuTop}px;height:${menuHeight}px;`,
      contentTop
    })
  },

  handleBack() {
    const pages = getCurrentPages()
    if (pages.length > 1) {
      wx.navigateBack()
      return
    }

    wx.switchTab({
      url: "/pages/index/index",
      fail() {
        wx.redirectTo({ url: "/pages/index/index" })
      }
    })
  },

  handleCategoryTap(event) {
    const category = event.currentTarget.dataset.category
    this.setData({ activeCategory: category })
  },

  handleAddPlan() {
    wx.showToast({
      title: "登录后添加",
      icon: "none"
    })
  }
})
