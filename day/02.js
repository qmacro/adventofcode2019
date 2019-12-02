const { find, liftN, all, not, sum, product, equals, update, __, nth, range, head, compose, map, split } = require('ramda')
const input = require('./lib/utils').parseFile('02')
const initialState = compose(map(Number), split(/,/), head)(input)

/**
 * MAIN
 */

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

const run = (pos, program) => {
  let nextpos = pos, state = program, halt = false
  while (not(halt)) {
    [nextpos, state, halt] = step(nextpos, state)
  }
  return state
}

const restore = (noun, verb) => compose(update(1,noun), update(2,verb))
const output = nth(0)


/**
 * PARTS
 */

a = _ => output(run(0, restore(12,2)(initialState))),
b = _ => {
  const pairs = liftN(2, (...xs) => xs)(range(0, 100), range(0, 100))
  let [noun, verb] = find(([noun, verb]) => equals(output(run(0, restore(noun, verb)(initialState))), 19690720), pairs)
  return (noun * 100) + verb
}

/**
 * TESTS
 */
all(equals(true), [
  equals(run(0, [1,9,10,3,2,3,11,0,99,30,40,50]), [3500,9,10,70,2,3,11,0,99,30,40,50]),
  equals(run(0, [1,0,0,0,99]), [2,0,0,0,99]),
  equals(run(0, [2,3,0,3,99]), [2,3,0,6,99]),
  equals(run(0, [2,4,4,5,99,0]), [2,4,4,5,99,9801]),
  equals(run(0, [1,1,1,4,99,5,6,0,99]), [30,1,1,4,2,5,6,0,99])
]) || console.log("ERROR in part 1 tests")

equals(a(), 3716293) || console.log("ERROR in part 'a' result")
equals(b(), 6429)  || console.log("ERROR in part 'b' result")

module.exports = {a, b}
