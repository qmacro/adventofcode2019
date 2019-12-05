const day = require('../day/05')

describe("Instruction parsing", () => {
  it("Parses opcodes from single digit instructions", () => {
    expect(day.parseInstruction('1').opcode).toEqual(1)
    expect(day.parseInstruction('2').opcode).toEqual(2)
  })
  it("Parses opcodes from double digit instructions", () => {
    expect(day.parseInstruction('99').opcode).toEqual(99)
  })
})
