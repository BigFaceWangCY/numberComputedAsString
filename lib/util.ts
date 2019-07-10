// clean dirty char
export const clearZero = (num: string): string => {
  if (/\./.test(num)) num = num.replace(/0+$/, '')
  num = num.replace(/^0+/, '').replace(/\.$/, '').replace(/^\./, '0.')
  num = num.replace(/^-0$/, '0')
  return num === '' ? '0' : num
}

// get precision
export const getPrecision = (num: string): number => {
  const result = /\.(\d*)/.exec(num)
  if (result) {
    return RegExp.$1.length
  }
  return 0
}

// check param is negative or not
export const isNegative = (num: string): boolean => {
  return num[0] === '-'
}

// get absolute value
export const clearNegative = (num: string): string => {
  return num.replace('-', '')
}

const toNonExponential = (num: any) => {
  num = Number(num)
  var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}

// check param type
export const checkNumber = (num: any): string | never => {
  if (Object.prototype.toString.call(num) === '[object Number]') {
    num =  num.toString()
    if (/[eE]/.test(num)) {
      return toNonExponential(num)
    } else {
      return num
    }
  }
  if (Object.prototype.toString.call(num) === '[object String]') {
    if (/^-?\d+(\.\d+)?$/.test(num)) {
      return num
    }
    throw new Error('checkNumber error, params must a number string or a number!')
  }
  throw new Error(`checkNumber error, params must a number string or a number!`)
}

export const setPrecision = (num: string, precision: number | undefined): string => {
  let result: any = num.split('')
  precision && precision > 0 && precision < num.length && result.splice(result.length - precision, 0, '.')
  if (precision && precision > 0 && precision >= num.length) {
    num = num.padStart(num.length + precision, '0')
    result = num.split('')
    result.splice(result.length - precision, 0, '.')
  }
  result = clearZero(result.join(''))
  result = result.replace(/\.$/, '')
  return result
}
