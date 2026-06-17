const FUTURE_YEAR_COUNT = 21

function getMinDate() {
  const now = new Date()

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  }
}

function formatDate(year, month, day) {
  return `${year}年${month}月${day}日`
}

function getLunarText(month, day) {
  if (month === 12 && day === 25) {
    return "农历 十一月廿五"
  }

  const lunarDays = {
    24: "廿四",
    25: "廿五",
    26: "廿六"
  }

  return `农历 ${month === 1 ? "腊月" : "十一月"}${lunarDays[day] || "廿五"}`
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}

function buildYears(year) {
  const minDate = getMinDate()
  const lastYear = Math.max(minDate.year + FUTURE_YEAR_COUNT - 1, year)

  return Array.from({ length: lastYear - minDate.year + 1 }, (_, index) => minDate.year + index)
}

function buildMonths(year) {
  const minDate = getMinDate()
  const startMonth = year === minDate.year ? minDate.month : 1

  return Array.from({ length: 13 - startMonth }, (_, index) => startMonth + index)
}

function buildDays(year, month) {
  const minDate = getMinDate()
  const startDay = year === minDate.year && month === minDate.month ? minDate.day : 1
  const endDay = getDaysInMonth(year, month)

  return Array.from({ length: endDay - startDay + 1 }, (_, index) => startDay + index)
}

function getIndex(values, value) {
  const index = values.indexOf(value)
  return index >= 0 ? index : 0
}

function clampDate(year, month, day) {
  const minDate = getMinDate()
  const safeYear = Math.max(year, minDate.year)
  const months = buildMonths(safeYear)
  const safeMonth = months.includes(month) ? month : months[0]
  const days = buildDays(safeYear, safeMonth)
  const safeDay = Math.min(Math.max(day, days[0]), days[days.length - 1])

  return {
    day: safeDay,
    month: safeMonth,
    year: safeYear
  }
}

function buildPickerState(year, month, day, lunarText) {
  const safeDate = clampDate(year, month, day)
  const years = buildYears(safeDate.year)
  const months = buildMonths(safeDate.year)
  const days = buildDays(safeDate.year, safeDate.month)
  const keepsLunarText = safeDate.year === year && safeDate.month === month && safeDate.day === day

  return {
    days,
    lunarText: keepsLunarText && lunarText ? lunarText : getLunarText(safeDate.month, safeDate.day),
    months,
    pickerValue: [getIndex(years, safeDate.year), getIndex(months, safeDate.month), getIndex(days, safeDate.day)],
    selectedDay: safeDate.day,
    selectedMonth: safeDate.month,
    selectedYear: safeDate.year,
    years
  }
}

const minDate = getMinDate()
const initialPickerState = buildPickerState(minDate.year, minDate.month, minDate.day)

Page({
  data: {
    contentTop: 88,
    days: initialPickerState.days,
    lunarText: initialPickerState.lunarText,
    months: initialPickerState.months,
    navActionStyle: "",
    navShellStyle: "",
    pickerValue: initialPickerState.pickerValue,
    selectedDay: initialPickerState.selectedDay,
    selectedMonth: initialPickerState.selectedMonth,
    selectedYear: initialPickerState.selectedYear,
    years: initialPickerState.years
  },

  onLoad() {
    this.loadSelectedDate()
    this.setupNavigation()
  },

  loadSelectedDate() {
    const stored = wx.getStorageSync("selectedTargetDate")

    if (!stored) {
      return
    }

    this.updatePicker(stored.year || minDate.year, stored.month || minDate.month, stored.day || minDate.day, stored.lunar)
  },

  updatePicker(year, month, day, lunarText) {
    this.setData(buildPickerState(year, month, day, lunarText))
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

  handleDateChange(event) {
    const [yearIndex, monthIndex, dayIndex] = event.detail.value
    const selectedYear = this.data.years[yearIndex] || this.data.selectedYear
    const selectedMonth = this.data.months[monthIndex] || this.data.selectedMonth
    const days = buildDays(selectedYear, selectedMonth)
    const selectedDay = days[Math.min(dayIndex, days.length - 1)] || days[0]

    this.updatePicker(selectedYear, selectedMonth, selectedDay)
  },

  handleConfirm() {
    const { selectedYear, selectedMonth, selectedDay } = this.data
    const selectedTargetDate = {
      year: selectedYear,
      month: selectedMonth,
      day: selectedDay,
      text: formatDate(selectedYear, selectedMonth, selectedDay),
      lunar: getLunarText(selectedMonth, selectedDay)
    }

    wx.setStorageSync("selectedTargetDate", selectedTargetDate)
    this.handleBack()
  }
})
