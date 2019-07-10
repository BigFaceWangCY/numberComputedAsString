import { checkNumber, getPrecision, clearNegative, isNegative, clearZero, setPrecision } from './util'
import substact, { prevBigThanNext, Compare } from './substact'
const ZERO = '0'
/**
 * function for addition
 * @param num1:string 
 * @param num2:string 
 * @returns string
 */
const add = (num1: string | number, num2: string | number): string => {
  // validation of parameter validity
  num1 = checkNumber(num1)
  num2 = checkNumber(num2)

  // negative flag
  let negative = ''

  // validation of parameter validity and record state
  let num1IsNegative = isNegative(num1)
  let num2IsNegative = isNegative(num2)
  num1 = clearNegative(num1)
  num2 = clearNegative(num2)

  // get decimal digits for recording status
  const num1Precision: number = getPrecision(num1)
  const num2Precision: number = getPrecision(num2)
  const precision: number = Math.max(num1Precision, num2Precision)

  // if two parameters are negative, then the identifier number is -, which is used to add to the final result.
  if (num1IsNegative && num2IsNegative) negative = '-'

  // If one of the two parameters is positive and the other is negative, it is calculated as a subtraction.
  if (num1IsNegative !== num2IsNegative) {
    num1 = num1.replace('.', '')
    num2 = num2.replace('.', '')
    num1 += ZERO.repeat(precision - num1Precision)
    num2 += ZERO.repeat(precision - num2Precision)
    const status:Compare = prevBigThanNext(num1, num2)
    const flag1 = num1IsNegative ? '-' : ''
    const flag2 = num1IsNegative ? '' : '-'
    switch (status) {
      case Compare.Equal: return '0'
      case Compare.Big: {
        let result: any = substact(num1, num2)
        return flag1 + setPrecision(result, precision)
      }
      case Compare.Small: {
        let result: any = substact(num2, num1)
        return flag2 + setPrecision(result, precision)
      }
    }
  }

  // convert to integers based on the maximum decimal number
  num1 += ZERO.repeat(precision - num1Precision)
  num2 += ZERO.repeat(precision - num2Precision)
  const str1: string[] = num1.replace('.', '').split('')
  const str2: string[] = num2.replace('.', '').split('')

  var result: any = ''
  let flag: any = 0

  // computation according to vertical addition rule
  while (str1.length || str2.length || flag) {
    flag += (~~str1.pop() + ~~str2.pop())
    result = flag % 10 + result
    flag = flag > 9
  }

  // Add decimal points according to the maximum decimal number and clean up the data then return result
  result = result.split('')
  precision && result.splice(result.length - precision, 0, '.')
  result = clearZero(result.join(''))
  return negative + result
}

export default add