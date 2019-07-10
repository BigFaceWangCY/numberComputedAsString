import { checkNumber, clearZero, clearNegative, isNegative  } from './util'
import { Compare, prevBigThanNext } from './substact'
import add from './add';
import substact from './substact';

const ZERO: string = '0'

/**
 * 
 * @param num 
 * @param dig 
 */
const addZero = (num: string, dig: number): string => {
  // determine if the incoming number is an integer
  if (!/\./.test(num)) {
    num += '.'
  }
  let [interger, negative]:Array<string> = num.split('.')
  for (let i = 0; i < dig; i++) {
    negative += negative[i] === undefined ? '0' : ''
  }
  let result = interger + '.' + negative
  return result.replace(/\.$/, '')
}

/**
 * function for toFixed
  * @param num1:string 
 * @param num2:number 
 * @returns string
 */
const toFixed = (formatnum: string | number, decimal: string | number): string => {
  // validation of parameter validity
  let num: string = checkNumber(formatnum)
  decimal = checkNumber(decimal)
  decimal = decimal === '-0' ? '0' : decimal

  // check digits for compliance
  if (prevBigThanNext('0', decimal) === Compare.Big) {
    throw new Error('The Number Of Decimal Places Must Be Greater Than Or Equal To 0')
  }

  // determine if the incoming number is an decimal
  if (/\./.test(decimal)) {
    throw new Error('The Number Of Decimal Places Must Be An Interger Number')
  }
  
  // determine if the incoming number is negative
  const numIsNegative: boolean = isNegative(num)
  if (numIsNegative) {
    num = clearNegative(num)
  }

  // determine if the incoming number is an integer
  if (!/\./.test(num)) {
    num += '.'
  }
  decimal = ~~decimal
  num += ZERO.repeat(decimal + 1)
  num = num.replace(/\.$/, '')
  let [interger, negative]:Array<string> = num.split('.')
  // check if the rounding bit is greater than four
  const _ = ~~negative[decimal]
  let flag: boolean = _ > 4
  let temp: string = decimal === 0 ? '1' : `0.${ZERO.repeat(decimal - 1)}1`
  
  let result: string = ''
  
  num = `${interger}.${negative.substr(0, decimal)}`
  num = num.replace(/\.$/, '')
  // negative-numbers-are-treated-separately-from-positive-numbers
  if (flag) {
    if (numIsNegative) {
      result = substact('-' + num, temp)
    } else {
      result = add(num, temp)
    }
  } else {
    result = numIsNegative ? '-' + num: num
  }

  return addZero(result, decimal)
}


export default toFixed