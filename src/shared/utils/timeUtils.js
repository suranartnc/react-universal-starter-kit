export function makeTimeReadable(time) {
  const date = new Date(time)

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  const hours = date.getHours()
  const minutes = "0" + date.getMinutes()
  const seconds = "0" + date.getSeconds()

  return `${day}/${month + 1}/${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
}