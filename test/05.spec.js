const day = require('../day/05')

describe('Opcode parsing', () => {
  it('Parses single digit opcodes', () => {
    expect(day.parseInstruction('1').opcode).toEqual(1)
    expect(day.parseInstruction('2').opcode).toEqual(2)
  })
  it('Parses double digit opcodes', () => {
    expect(day.parseInstruction('99').opcode).toEqual(99)
  })
  it('Parses opcodes with more than two digits', () => {
    expect(day.parseInstruction('1002').opcode).toEqual(02)
  })
})

describe('Parameter mode parsing', () => {
  it('Determines the explicit mode of a single parameter', () => {
    expect(day.parseInstruction('102').mode(1)).toEqual(1)
    expect(day.parseInstruction('123').mode(1)).toEqual(1)
    expect(day.parseInstruction('1023').mode(1)).toEqual(0)
    expect(day.parseInstruction('1023').mode(2)).toEqual(1)
  })
  it('Determines the implicit mode of a single parameter', () => {
    expect(day.parseInstruction('2').mode(1)).toEqual(0)
    expect(day.parseInstruction('123').mode(2)).toEqual(0)
    expect(day.parseInstruction('1').mode(10)).toEqual(0)
  })
})
