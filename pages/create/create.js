const { getCountdownBooks, getSelectedCountdownBook } = require("../../utils/countdown-books")

const bookPickerCategory = {
  id: "book-picker",
  label: "其他",
  icon: "/assets/icons/more-horiz.svg",
  activeIcon: "/assets/icons/more-horiz-white.svg",
  isBookPicker: true
}

function toCategory(book) {
  const icon = book.iconSrc || book.icon || "/assets/icons/book.svg"

  return {
    id: book.id,
    label: book.title || book.label,
    icon,
    activeIcon: icon,
    isCountdownBook: true
  }
}

function buildCreateCategories(selectedBook) {
  const books = getCountdownBooks()
  const fallbackSelected = selectedBook || books[0]
  const restBooks = books.filter((book) => book.id !== fallbackSelected.id)
  const visibleBooks = [fallbackSelected].concat(restBooks).slice(0, 3)

  return visibleBooks.map(toCategory).concat(bookPickerCategory)
}

function getTodayParts() {
  const now = new Date()

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  }
}

function formatTargetDate(date) {
  return `${date.year}年${date.month}月${date.day}日`
}

function isBeforeToday(date) {
  const today = getTodayParts()
  const target = new Date(date.year, date.month - 1, date.day).getTime()
  const min = new Date(today.year, today.month - 1, today.day).getTime()

  return target < min
}

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
    categories: [],
    contentTop: 88,
    eventName: "",
    iconOptions,
    navActionStyle: "",
    navShellStyle: "",
    pinned: false,
    proExpanded: false,
    selectedCategory: "",
    selectedCountdownBook: null,
    selectedIcon: "celebration",
    reminderText: "无",
    targetDateText: formatTargetDate(getTodayParts())
  },

  onLoad() {
    this.setupNavigation()
    this.syncSelectedBook()
  },

  onShow() {
    this.syncSelectedBook()
    this.syncTargetDate()
    this.syncReminder()
  },

  syncSelectedBook() {
    const selectedCountdownBook = getSelectedCountdownBook()

    this.setData({
      categories: buildCreateCategories(selectedCountdownBook),
      selectedCategory: selectedCountdownBook.id,
      selectedCountdownBook
    })
  },

  syncTargetDate() {
    const selectedTargetDate = wx.getStorageSync("selectedTargetDate")

    if (!selectedTargetDate) {
      this.setData({
        targetDateText: formatTargetDate(getTodayParts())
      })
      return
    }

    if (isBeforeToday(selectedTargetDate)) {
      const today = getTodayParts()
      const nextTargetDate = {
        ...today,
        text: formatTargetDate(today)
      }

      wx.setStorageSync("selectedTargetDate", nextTargetDate)
      this.setData({
        targetDateText: nextTargetDate.text
      })
      return
    }

    this.setData({
      targetDateText: selectedTargetDate.text || formatTargetDate(selectedTargetDate)
    })
  },

  syncReminder() {
    const selectedReminder = wx.getStorageSync("selectedReminder") || {}

    this.setData({
      reminderText: selectedReminder.displayLabel || selectedReminder.label || "无"
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
    const selectedCategory = event.currentTarget.dataset.id

    if (selectedCategory === "book-picker") {
      wx.navigateTo({ url: "/pages/category-select/category-select" })
      return
    }

    const selectedCountdownBook = getCountdownBooks().find((book) => book.id === selectedCategory)

    if (selectedCountdownBook) {
      wx.setStorageSync("selectedCountdownBook", selectedCountdownBook)
      this.setData({
        categories: buildCreateCategories(selectedCountdownBook),
        selectedCategory,
        selectedCountdownBook
      })
      return
    }

    this.setData({ selectedCategory })
  },

  handleOpenDatePicker() {
    wx.navigateTo({ url: "/pages/date-select/date-select" })
  },

  handleOpenReminderPicker() {
    wx.navigateTo({ url: "/pages/reminder-select/reminder-select" })
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
