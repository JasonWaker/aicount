const reminderOptions = [
  { id: "none", label: "不提醒", displayLabel: "无" },
  { id: "daily", label: "每天提醒", displayLabel: "每天提醒" },
  { id: "weekly", label: "每周提醒", displayLabel: "每周提醒" },
  { id: "monthly", label: "每月提醒", displayLabel: "每月提醒" }
]

Page({
  data: {
    contentTop: 88,
    navActionStyle: "",
    navShellStyle: "",
    reminderOptions,
    selectedReminder: "none"
  },

  onLoad() {
    this.loadReminder()
    this.setupNavigation()
  },

  loadReminder() {
    const selected = wx.getStorageSync("selectedReminder") || {}

    this.setData({
      selectedReminder: selected.id || "none"
    })
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

    wx.redirectTo({ url: "/pages/create/create" })
  },

  handleSelect(event) {
    this.setData({
      selectedReminder: event.currentTarget.dataset.id
    })
  },

  handleConfirm() {
    const selected = reminderOptions.find((item) => item.id === this.data.selectedReminder) || reminderOptions[0]
    wx.setStorageSync("selectedReminder", selected)
    this.handleBack()
  }
})
