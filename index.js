let day = (new Date()).getDate()
const file = day => `./day/${String(day).padStart(2, '0')}`

const { a, b } = require(file(day))

console.log(
  a(),
  b()
)
