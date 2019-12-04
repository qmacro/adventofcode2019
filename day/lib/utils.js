const { lift, reduce, concat, gte, indexOf, compose, map, length, split, filter } = require('ramda')
const fs = require('fs')

// A faster intersection, as the one from Ramda seemed to
// be taking a very long time indeed (I gave up waiting).
const fasterIntersection = (list1, list2) => {
  const serialise = JSON.stringify
  const deserialise = JSON.parse
  const [shorter, longer] = lift(map(serialise))(list1 < list2 ? [list1, list2] : [list2, list1])
  return map(deserialise)(reduce((a, x) => concat(a, gte(indexOf(x, longer), 0) ? [x] : []), [], shorter))
}

const parseFile = day =>
  fs.readFileSync(`./input/${day}.dat`)
  .toString()
  .split(/\n/)
  .filter(length)

const parseFileAsNumbers = compose(map(Number), parseFile)

module.exports = {
  fasterIntersection,
  parseFile,
  parseFileAsNumbers
}
