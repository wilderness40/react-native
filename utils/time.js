export const getToday = (date) => {
    const { year, month, day } = getDayWithoutTime(date)
    return new Date(year, month-1, day)
}

export const getTommorrow = (today) => {
    return new Date(today.setDate(today.getDate()+1))
}

export const getDayWithoutTime = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return { year, month, day }
}