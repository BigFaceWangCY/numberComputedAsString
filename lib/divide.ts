import { checkNumber, getPrecision, clearNegative, isNegative, clearZero, setPrecision } from './util'
import multply from './multply'
import add from './add'
import substact, { prevBigThanNext, Compare } from './substact';

const ZERO: string = '0'

const getResult = (divisor: string, dividend: string): string => {
  for (let i = 0; i < 11; i++) {
    if (prevBigThanNext(multply(dividend, i.toString()), divisor) === Compare.Big) {
      return '' + (i - 1)
    }
  }
}

const divide = (num1: string | number, num2: string | number, len: number = 50) : string | never => {
  // validation of parameter validity
  num1 = checkNumber(num1)
  num2 = checkNumber(num2)
  if (num2 === '0') throw new Error('param error, the dividend cannot be zero!')
  if (num1 === '0') return '0'
  
  // get decimal digits for recording status
  const num1Precision: number = getPrecision(num1)
  const num2Precision: number = getPrecision(num2)
  const precision: number = num1Precision + num2Precision

  
  const negativeFlag: string = ~~isNegative(num1) + ~~isNegative(num2) === 1 ? '-' : ''
  // convert to integers based on the maximum decimal number
  num1 = clearNegative(num1.replace('.', ''))
  num2 = clearNegative(num2.replace('.', ''))
  num1 += ZERO.repeat(precision - num1Precision)
  num2 += ZERO.repeat(precision - num2Precision)
  num2 = clearZero(num2)
  
  let count = 0
  let result = ''
  const str1: string [] = num1.split('')

  let tempDivisor = str1.shift()

  // computation according to vertical divide rule
  while (true) {
    const temp = getResult(tempDivisor, num2)
    const flag = str1.length === 0
    result += temp
    tempDivisor = substact(tempDivisor, multply(temp, num2))
    tempDivisor += str1.length > 0 ? str1.shift() : /\./.test(result) ? '0' : (result += '.', '0')
    str1.length === 0 && /\./.test(result) && count++
    if (flag && tempDivisor === '00' || count > len + 1) break
  }

  // rounding
  if (/\./.test(result)) {
    const temp = result.split('.')[1]
    if (temp.length === len + 1) {
      result = result.substr(0, result.length - 1)
      const lastNumber = temp[temp.length - 1]
      if (~~lastNumber > 4) {
        let carry = `0.${'0'.repeat(len - 1)}1`
        result = add(result, carry)
      }
    }
  }

  // Add decimal points according to the maximum decimal number and clean up the data then return result
  result = negativeFlag + clearZero(result)
  return clearZero(result)
}
export default divide