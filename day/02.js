const { all, not, sum, product, equals, update, __, nth, range, head, compose, map, split } = require('ramda')
const input = require('./lib/utils').parseFile('02')
const initialState = compose(map(Number), split(/,/), head)(input)


const step = (pos, program) => {
  
  const nextpos = pos + 4
  const [opcode, op1loc, op2loc, resloc] = map(nth(__, program), range(pos, nextpos))
  const values = map(nth(__, program), [op1loc, op2loc])
  let result, newProgram

  switch (opcode) {
    case 1:
      result = sum(values)
      break
    case 2:
      result = product(values)
      break
  }

  newProgram = update(resloc, result, program)

  return [
    nextpos,
    newProgram,
    equals(nth(nextpos, newProgram), 99) // halt?
  ]

}

const loop = (pos, program) => {
  let nextpos = pos, state = program, halt = false
  while (not(halt)) {
    [nextpos, state, halt] = step(nextpos, state)
  }
  return state
}

/*console.log(
  all(equals(true), [
    equals(loop(0, [1,9,10,3,2,3,11,0,99,30,40,50]), [3500,9,10,70,2,3,11,0,99,30,40,50]),
    equals(loop(0, [1,0,0,0,99]), [2,0,0,0,99]),
    equals(loop(0, [2,3,0,3,99]), [2,3,0,6,99]),
    equals(loop(0, [2,4,4,5,99,0]), [2,4,4,5,99,9801]),
    equals(loop(0, [1,1,1,4,99,5,6,0,99]), [30,1,1,4,2,5,6,0,99])
  ])
)*/

const restore = compose(update(1,12), update(2,2))



module.exports = {
  a: _ => nth(0, loop(0, restore(initialState))),
  b: _ => 'b'
}
