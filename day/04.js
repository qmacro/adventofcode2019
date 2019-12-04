const { range, allPass, compose, groupWith, filter, isEmpty, complement, gt, __, length, pipe, identity, map, equals, all, apply, lte, zip, tail } = require('ramda')


const neverDecrease = n => all(identity, map(apply(lte), zip(n,tail(n))))

const longerThanOne = compose(gt(__, 1), length)
const hasSameAdjacentDigits = pipe(
  groupWith(equals),
  filter(longerThanOne),
  complement(isEmpty)
)

const part1 = x => {
  const candidate = String(x)
  return allPass([neverDecrease, hasSameAdjacentDigits])(candidate)
}

const testsets = [

  // -> First part
  {
    fn: part1,
    data: [
      [111111, true],
      [223450, false],
      [123789, false]
    ],
  }
]

const runTest = (fn, [input, res]) => ([equals(fn(input), res) ? '✔' :  '❌', res])
//console.log(map(testset => map(data => runTest(testset['fn'], data), testset['data']), testsets))


const a = _ => compose(length, filter(identity), map(part1))(range(347312,805916))
const b = _ => 'b'


module.exports = { a, b }



