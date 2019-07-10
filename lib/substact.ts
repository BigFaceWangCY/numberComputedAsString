import { checkNumber, getPrecision, clearNegative, isNegative, clearZero, setPrecision } from './util'
import add from './add';

const ZERO: string = '0'

export enum Compare {
  Big= "Big",
  Small= "Small",
  Equal= "Equal"
}
/**
 * function for compare two numbers
 * @param num1 string
 * @param num2 string
 * @return emun Compare : string
 */
export const prevBigThanNext = (num1: string, num2: string): Compare => {
  // validation of parameter validity
  num1 = clearZero(num1)
  num2 = clearZero(num2)
  const len1: number = num1.length
  const len2: number = num2.length
  const num1IsNegative: boolean = isNegative(num1)
  const num2IsNegative: boolean = isNegative(num2)
  let flag: boolean = false
  // comparisons based on positive and negative situations
  if (!num1IsNegative && num2IsNegative) return Compare.Big
  if (num1IsNegative && !num2IsNegative) return Compare.Small
  if (!num1IsNegative && !num2IsNegative) { flag = true }

  // size comparison based on digital length
  if (len1 > len2) {
    return flag ? Compare.Big : Compare.Small
  }
  if (len1 < len2) {
    return Compare.Small
  }
  // If the two numbers are identical in positive and negative,
  // and the length is the same,
  // then compare the numbers from beginning to end
  for (let i = 0; i < len1; i++) {
    if (~~num1[i] > ~~num2[i]) {
      return Compare.Big 
    }
    if (~~num1[i] < ~~num2[i]) {
      return flag ? Compare.Small : Compare.Big
    }
  }
  return Compare.Equal
}

/**
 * function for substact
  * @param num1:string 
 * @param num2:string 
 * @returns string
 */
const substact = (num1: string | number, num2: string | number): string => {
  // validation of parameter validity
  num1 = checkNumber(num1)
  num2 = checkNumber(num2)

  // get decimal digits for recording status
  const num1Precision: number = getPrecision(num1)
  const num2Precision: number = getPrecision(num2)
  const precision: number = Math.max(num1Precision, num2Precision)
  // validation of parameter validity and record state
  let num1IsNegative = isNegative(num1)
  let num2IsNegative = isNegative(num2)
  // convert to integers based on the maximum decimal number
  num1 = num1.replace('.', '')
  num2 = num2.replace('.', '')
  num1 = clearNegative(num1)
  num2 = clearNegative(num2)
  // convert to integers based on the maximum decimal number
  num1 += ZERO.repeat(precision - num1Precision)
  num2 += ZERO.repeat(precision - num2Precision)

  // If one of the two parameters is positive and the other is negative, it is calculated as a add.
  if (num1IsNegative !== num2IsNegative) {
    let result: any = add(num1, num2)
    result = setPrecision(result, precision)
    const flag = num2IsNegative ? '' : '-'
    return flag + result
  }
  
  if (num1IsNegative === num2IsNegative) {
    const status = prevBigThanNext(num1, num2)
    const flag = num2IsNegative ? '' : '-'
    switch (status) {
      case Compare.Equal: return '0'
      case Compare.Small: {
        let result: any = substact(num2, num1)
        result = setPrecision(result, precision)
        return flag + result
      }
      case Compare.Big: {
        if (num1IsNegative) {
          let result: any = substact(num1, num2)
          result = setPrecision(result, precision)
          return '-' + result
        }
      }
      
    }
  }

  // computation according to vertical substract rule
  let result: any = [];
  let minusOne = 0;
  const len = Math.max(num1.length, num2.length)
  num1 = ZERO.repeat(len - num1.length) + num1
  num2 = ZERO.repeat(len - num2.length) + num2
  for (let i = num1.length - 1; i >= 0; i--) {
    let c1 = ~~num1[i] - 0;
    let c2 = ~~num2[i] - 0;
    if (c1 - minusOne >= c2) {
      result.unshift(c1 - c2 - minusOne);
      minusOne = 0;
    } else {
      result.unshift(c1 + 10 - c2 - minusOne);
      minusOne = 1;
    }
  }
  // Add decimal points according to the maximum decimal number and clean up the data then return result
  result.splice(result.length - precision, 0, ".")
  result = result.join('')
  result = clearZero(result)
  return result
}
export default substact