const defaultCountdownBooks = [
  {
    id: "life",
    title: "生活",
    desc: "记录琐碎日常中的美好",
    count: 8,
    icon: "heart",
    iconSrc: "/assets/icons/favorite.svg",
    activeIconSrc: "/assets/icons/favorite.svg",
    tone: "warm"
  },
  {
    id: "study",
    title: "学习",
    desc: "不积跬步，无以至千里",
    count: 5,
    icon: "school",
    iconSrc: "/assets/icons/school.svg",
    activeIconSrc: "/assets/icons/school.svg",
    tone: "blue"
  },
  {
    id: "anniversary",
    title: "纪念日",
    desc: "有些日子，值得铭记一生",
    count: 3,
    icon: "cake",
    iconSrc: "/assets/icons/cake.svg",
    activeIconSrc: "/assets/icons/cake.svg",
    tone: "red"
  },
  {
    id: "work",
    title: "工作",
    desc: "有条不紊，奔赴热爱",
    count: 12,
    icon: "work",
    iconSrc: "/assets/icons/work.svg",
    activeIconSrc: "/assets/icons/work.svg",
    tone: "purple"
  },
  {
    id: "travel",
    title: "旅行",
    desc: "去看看这个世界吧",
    count: 4,
    icon: "explore",
    iconSrc: "/assets/icons/explore.svg",
    activeIconSrc: "/assets/icons/explore.svg",
    tone: "green"
  }
]

function normalizeBook(book, index) {
  const id = book.id || `custom-${index}`
  const title = book.title || book.label || "未命名倒数本"
  const iconSrc = book.iconSrc || book.icon || "/assets/icons/book.svg"

  return {
    id,
    title,
    label: title,
    desc: book.desc || "用户创建的倒数本",
    count: Number(book.count || 0),
    icon: book.icon || id,
    iconSrc,
    activeIconSrc: book.activeIconSrc || iconSrc,
    tone: book.tone || "warm"
  }
}

function getCountdownBooks() {
  const customBooks = wx.getStorageSync("customCountdownBooks") || []
  const normalizedDefaults = defaultCountdownBooks.map(normalizeBook)
  const normalizedCustoms = customBooks.map(normalizeBook)
  const seen = {}

  return normalizedDefaults.concat(normalizedCustoms).filter((book) => {
    if (seen[book.id]) {
      return false
    }

    seen[book.id] = true
    return true
  })
}

function getSelectedCountdownBook() {
  const books = getCountdownBooks()
  const stored = wx.getStorageSync("selectedCountdownBook")

  if (!stored) {
    return books[0]
  }

  const matched = books.find((book) => book.id === stored.id || book.title === stored.title || book.title === stored.label)
  return matched || normalizeBook(stored)
}

module.exports = {
  defaultCountdownBooks,
  getCountdownBooks,
  getSelectedCountdownBook
}
