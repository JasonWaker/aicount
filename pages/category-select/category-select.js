const { getCountdownBooks, getSelectedCountdownBook } = require("../../utils/countdown-books")

Page({
  data: {
    books: [],
    contentTop: 88,
    navActionStyle: "",
    navShellStyle: "",
    selectedBook: "life"
  },

  onLoad() {
    this.loadBooks()
    this.setupNavigation()
  },

  onShow() {
    this.loadBooks()
  },

  loadBooks() {
    const selected = getSelectedCountdownBook()
    const books = getCountdownBooks().map((book) => ({
      ...book,
      label: book.title,
      icon: book.iconSrc,
      selected: book.id === selected.id
    }))

    this.setData({
      books,
      selectedBook: selected.id
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
    const selectedBook = event.currentTarget.dataset.id

    this.setData({
      selectedBook,
      books: this.data.books.map((item) => ({
        ...item,
        selected: item.id === selectedBook
      }))
    })
  },

  handleConfirm() {
    const selected = this.data.books.find((item) => item.id === this.data.selectedBook)

    if (!selected) {
      this.handleBack()
      return
    }

    wx.setStorageSync("selectedCountdownBook", selected)
    wx.navigateBack()
  }
})
