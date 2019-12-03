const { reduce, inc, dec, last, range, concat, equals, juxt, compose, head, tail, map, split } = require('ramda')
const input = require('./lib/utils').parseFile('03')

const DIRECTION = 0, DISTANCE = 1

// R75 -> ['R', 75]
const parseSegment = juxt([head, compose(Number, tail)])

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

// Returns coords for a single segment
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

console.log(pathCoords([0,0], [['R',2],['U',3]]))

a = _ => 'a'
b = _ => 'b'

/**
 * TESTS
 */
console.log(
  equals(a([
    parseTrace('R8,U5,L5,D3'),
    parseTrace('U7,R6,D4,L4')
  ]), 6),
  equals(a([
    parseTrace('R75,D30,R83,U83,L12,D49,R71,U7,L72'),
    parseTrace('U62,R66,U55,R34,D71,R55,D58,R83')
  ]), 159)
)

module.exports = {a, b}

