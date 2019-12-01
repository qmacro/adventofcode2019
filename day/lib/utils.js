const { compose, map, length, split, filter } = require('ramda')
const fs = require('fs')

const parseFile = day => 
  fs.readFileSync(`./input/${day}.dat`)
  .toString()
  .split(/\n/)
  .filter(length)

const parseFileAsNumbers = compose(map(Number), parseFile)

module.exports = {
  parseFile,
  parseFileAsNumbers
}