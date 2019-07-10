import { clearZero, getPrecision, clearNegative, isNegative, checkNumber, setPrecision } from "../lib/util"
import { Compare, prevBigThanNext } from '../lib/substact'
describe('clearZero function test', () => {
  it('0 test case', () => {
    expect(clearZero('0')).toBe('0')
  })
  it('00000 test case', () => {
    expect(clearZero('00000')).toBe('0')
  })
  it('100000 test case', () => {
    expect(clearZero('100000')).toBe('100000')
  })
  it('0.0000 test case', () => {
    expect(clearZero('0.0000')).toBe('0')
  })
  it('0. test case', () => {
    expect(clearZero('0.')).toBe('0')
  })
  it('0.1290000 test case', () => {
    expect(clearZero('0.1290000')).toBe('0.129')
  })
  it('000010.129 test case', () => {
    expect(clearZero('000010.129')).toBe('10.129')
  })
  it('000010.129000 test case', () => {
    expect(clearZero('000010.129000')).toBe('10.129')
  })
  it('1. test case', () => {
    expect(clearZero('1.')).toBe('1')
  })
})

describe('getPrecision function test', () => {
  it ('0 test case', () => {
    expect(getPrecision('0')).toBe(0)
  })
  it ('111 test case', () => {
    expect(getPrecision('111')).toBe(0)
  })
  it ('111.00 test case', () => {
    expect(getPrecision('111.00')).toBe(2)
  })
  it ('0.987654321 test case', () => {
    expect(getPrecision('0.987654321')).toBe(9)
  })
  it ('1234567890.09876543211234567890 test case', () => {
    expect(getPrecision('1234567890.09876543211234567890')).toBe(20)
  })
  it ('88888888888888888888888880 test case', () => {
    expect(getPrecision('88888888888888888888888880')).toBe(0)
  })
  it ('0.99999999999999999999999999999 test case', () => {
    expect(getPrecision('0.99999999999999999999999999999')).toBe(29)
  })
  it ('99.6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666 test case', () => {
    expect(getPrecision('99.6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666')).toBe(88)
  })
})

describe('clearNegative function test', () => {
  it ('0 test case', () => {
    expect(clearNegative('0')).toBe('0')
  })
  it ('-0 test case', () => {
    expect(clearNegative('-0')).toBe('0')
  })
  it ('8876 test case', () => {
    expect(clearNegative('8876')).toBe('8876')
  })
  it ('-8876 test case', () => {
    expect(clearNegative('-8876')).toBe('8876')
  })
  it ('-0.9998 test case', () => {
    expect(clearNegative('-0.9998')).toBe('0.9998')
  })
  it ('0.9998 test case', () => {
    expect(clearNegative('0.9998')).toBe('0.9998')
  })
})

describe('isNegative function test', () => {
  it('0 test case', () => {
    expect(isNegative('0')).toBe(false)
  })
  it('-0 test case', () => {
    expect(isNegative('-0')).toBe(true)
  })
  it('0.999 test case', () => {
    expect(isNegative('0.999')).toBe(false)
  })
  it('-0.999 test case', () => {
    expect(isNegative('-0.999')).toBe(true)
  })
  it('999.888 test case', () => {
    expect(isNegative('999.888')).toBe(false)
  })
  it('-999.888 test case', () => {
    expect(isNegative('-999.888')).toBe(true)
  })
})

describe('checkNumber function test', () => {
  it('null test case', () => {
    function wrap () {
      checkNumber(null)
    }
    expect(wrap).toThrowError('checkNumber error, params must a number string or a number!')
  })
  it('undefined test case', () => {
    function wrap () {
      checkNumber(undefined)
    }
    expect(wrap).toThrowError('checkNumber error, params must a number string or a number!')
  })
  it('false test case', () => {
    function wrap () {
      checkNumber(false)
    }
    expect(wrap).toThrowError('checkNumber error, params must a number string or a number!')
  })
  it('true test case', () => {
    function wrap () {
      checkNumber(true)
    }
    expect(wrap).toThrowError('checkNumber error, params must a number string or a number!')
  })
  it('object test case', () => {
    function wrap () {
      checkNumber({})
    }
    expect(wrap).toThrowError('checkNumber error, params must a number string or a number!')
  })
  it('array test case', () => {
    function wrap () {
      checkNumber([])
    }
    expect(wrap).toThrowError('checkNumber error, params must a number string or a number!')
  })
  it('symbol test case', () => {
    function wrap () {
      let symbolVal = Symbol()
      checkNumber(symbolVal)
    }
    expect(wrap).toThrowError('checkNumber error, params must a number string or a number!')
  })
  it('0.00000 test case', () => {
    expect(checkNumber(0.00000)).toBe('0')
  })
  it('0.99861 test case', () => {
    expect(checkNumber(0.99861)).toBe('0.99861')
  })
  it('-0.99861 test case', () => {
    expect(checkNumber(-0.99861)).toBe('-0.99861')
  })
  it('998.8767 test case', () => {
    expect(checkNumber(998.8767)).toBe('998.8767')
  })
  it('-998.8767 test case', () => {
    expect(checkNumber(-998.8767)).toBe('-998.8767')
  })
  it('asdf test case', () => {
    function wrap () {
      checkNumber('asdf')
    }
    expect(wrap).toThrowError('checkNumber error, params must a number string or a number!')
  })
  it('hello test case', () => {
    function wrap () {
      checkNumber('asdf')
    }
    expect(wrap).toThrowError('checkNumber error, params must a number string or a number!')
  })
  it(' test case', () => {
    function wrap () {
      checkNumber('asdf')
    }
    expect(wrap).toThrowError('checkNumber error, params must a number string or a number!')
  })
  it('0.324hello test case', () => {
    function wrap () {
      checkNumber('0.324hello')
    }
    expect(wrap).toThrowError('checkNumber error, params must a number string or a number!')
  })
  it('pikaqiu8848 test case', () => {
    function wrap () {
      checkNumber('pikaqiu8848')
    }
    expect(wrap).toThrowError('checkNumber error, params must a number string or a number!')
  })
  it('" " test case', () => {
    function wrap () {
      checkNumber(' ')
    }
    expect(wrap).toThrowError('checkNumber error, params must a number string or a number!')
  })
  it('"" test case', () => {
    function wrap () {
      checkNumber('')
    }
    expect(wrap).toThrowError('checkNumber error, params must a number string or a number!')
  })
  it('"987563" test case', () => {
    expect(checkNumber("987563")).toBe("987563")
  })
  it('"-987563" test case', () => {
    expect(checkNumber("-987563")).toBe("-987563")
  })
  it('"0" test case', () => {
    expect(checkNumber("0")).toBe("0")
  })
  it('"-0.9856234" test case', () => {
    expect(checkNumber("-0.9856234")).toBe("-0.9856234")
  })
  it('"989786.9856234" test case', () => {
    expect(checkNumber("989786.9856234")).toBe("989786.9856234")
  })
})

describe('prevBigThanNext function test', () => {
  it('9999 8888 test case', () => {
    expect(prevBigThanNext('9999', '8888')).toBe(Compare.Big)
  })
  it('-8888 -9999 test case', () => {
    expect(prevBigThanNext('-8888', '-9999')).toBe(Compare.Big)
  })
  it('1234 -765 test case', () => {
    expect(prevBigThanNext('1234', '-765')).toBe(Compare.Big)
  })
  it('1 0 test case', () => {
    expect(prevBigThanNext('1', '0')).toBe(Compare.Big)
  })
  it('888 999 test case', () => {
    expect(prevBigThanNext('888', '999')).toBe(Compare.Small)
  })
  it('-9999 -7 test case', () => {
    expect(prevBigThanNext('-9999', '-7')).toBe(Compare.Small)
  })
  it('-875  7 test case', () => {
    expect(prevBigThanNext('-875', '7')).toBe(Compare.Small)
  })
  it('-123456 534534 test case', () => {
    expect(prevBigThanNext('-123456', '534534')).toBe(Compare.Small)
  })
  it('1111111111111111111111111111111111111111111 1111111111111111111111111111111111111111111 test case', () => {
    expect(prevBigThanNext('1111111111111111111111111111111111111111111', '1111111111111111111111111111111111111111111')).toBe(Compare.Equal)
  })
  it('74567890 74567890 test case', () => {
    expect(prevBigThanNext('74567890', '74567890')).toBe(Compare.Equal)
  })
  it('-8888888 -8888888 test case', () => {
    expect(prevBigThanNext('-8888888', '-8888888')).toBe(Compare.Equal)
  })
  it('8888888 8888888 test case', () => {
    expect(prevBigThanNext('8888888', '8888888')).toBe(Compare.Equal)
  })
  it('7777 7777 test case', () => {
    expect(prevBigThanNext('7777', '7777')).toBe(Compare.Equal)
  })
  it('0 0 test case', () => {
    expect(prevBigThanNext('0', '0')).toBe(Compare.Equal)
  })
})

describe('setPrecision function test', () => {
  it('123456,3 test case', () => {
    expect(setPrecision('123456', 3)).toBe('123.456')
  })
  it('123456789,3 test case', () => {
    expect(setPrecision('123456789', 3)).toBe('123456.789')
  })
  it('123456,10 test case', () => {
    expect(setPrecision('123456', 10)).toBe('0.0000123456')
  })
  it('123456,0 test case', () => {
    expect(setPrecision('123456', 0)).toBe('123456')
  })
  it('123456,-5 test case', () => {
    expect(setPrecision('123456', -5)).toBe('123456')
  })
})