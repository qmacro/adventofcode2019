const { reverse, match, find, liftN, all, not, sum, product, equals, update, __, nth, range, head, compose, map, split } = require('ramda')
const input = require('./lib/utils').parseFile('05')
const initialState = compose(map(Number), split(/,/), head)(input)

/**
 * MAIN
 */

// Parses out the opcode and any parameter modes from an instruction,
// returning an object that can be used to get the opcode and the
// parameter mode for a given parameter position (1-indexed)
const parseInstruction = n => {
  const results = match(/^(\d*?)(\d{1,2})$/, n)
  const parsed = map(Number, [results[2]].concat(compose(split(''), reverse)(results[1])))
  return {
    opcode: nth(0, parsed),
    mode: p => nth(p, parsed) || 0
  }
}

// <- position, state
// -> new position, new state, halt?
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

const restore = (noun, verb) => compose(update(1,noun), update(2,verb))
const output = nth(0)

// -> pos, state
// <- final value from pos 0
const run = (pos, program) => {
  switch (nth(pos, program)) {
    case 99:
      return output(program)
    default:
      return run(...step(pos, program))
  }

}

/**
 * PARTS
 */

a = _ => 'a'
b = _ => 'b'

/**
 * TESTS
 */

module.exports = {
  parseInstruction,
  a,
  b
}

