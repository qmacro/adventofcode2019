const { length, curry, apply, add, minBy, divide, __, lift, pluck, max, intersection, reduce, inc, dec, last, range, concat, equals, juxt, compose, head, tail, map, split } = require('ramda')
const input = require('./lib/utils').parseFile('03')

const DIRECTION = 0, DISTANCE = 1

// Parses a single segment into direction and distance
// R75 -> ['R', 75]
const parseSegment = juxt([head, compose(Number, tail)])

// Parses an entire path trace into a set of parsed segments
// 'R75,D30,U83,...' -> [['R', 75], ['D', 30], ['U', 83], ...]
const parseTrace = compose(map(parseSegment), split(/,/))

// Direction functions, modifies a given coord appropriately
// (origin 0,0 is in bottom left corner)
const dir = {
  'L': ([x, y]) => ([dec(x), y]),
  'R': ([x, y]) => ([inc(x), y]),
  'U': ([x, y]) => ([x, inc(y)]),
  'D': ([x, y]) => ([x, dec(y)])
}

// Calculates all the coords for a single segment (incl origin)
// ([0,0], ['R', 2]) -> [[0,0], [1,0], [2,0]]
const segmentCoords = (start, segment) => reduce(
  (a, x) => concat(a, [dir[segment[DIRECTION]](last(a))]),
  [start],
  range(0, segment[DISTANCE])
)

// Returns coords for an entire path of segments
// ([0,0], [['R',2], ['U',3]]) -> [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [2, 3]]
const pathCoords = (start, path) => reduce(
  (a, x) => concat(a, tail(segmentCoords(last(a), x))),
  [start],
  path
)

// Calculates the sum of absolute values of x and y in a coord
// [1,2] -> 3, [4,-5] -> 9
const sumAbsCoords = compose(apply(add), lift(Math.abs))

const serialise = JSON.stringify
const deserialise = JSON.parse

// A fas
const fasterIntersection = (list1, list2) => {
  const [shorter, longer] = lift(map(serialise))(list1 < list2 ? [list1, list2] : [list2, list1])
  return map(deserialise)(reduce((a, x) => {
    if (longer.indexOf(x) >= 0) a.push(x)
    return a
  }, [], shorter))
}

const nearestCrossoverToZero = ([trace1, trace2]) => {
  const path1 = pathCoords([0,0], parseTrace(trace1))
  const path2 = pathCoords([0,0], parseTrace(trace2))
  const crossovers = fasterIntersection(path1, path2)
  const nearest = reduce(minBy(sumAbsCoords), [Infinity,Infinity], tail(crossovers))

  return sumAbsCoords(nearest)
}

const a = _ => nearestCrossoverToZero(input)
const b = _ => 'b'

/**
 * TESTS
*/
console.log(equals(nearestCrossoverToZero(['R8,U5,L5,D3','U7,R6,D4,L4']), 6))
console.log(equals(nearestCrossoverToZero(['R75,D30,R83,U83,L12,D49,R71,U7,L72','U62,R66,U55,R34,D71,R55,D58,R83']), 159))
console.log(equals(nearestCrossoverToZero(['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51','U98,R91,D20,R16,D67,R40,U7,R15,U6,R7']), 135))
module.exports = {a, b}

