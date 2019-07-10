import { checkNumber, getPrecision, clearNegative, isNegative, clearZero } from './util'

const multply = (num1: string | number, num2: string | number): string => {
  // validation of parameter validity
  num1 = checkNumber(num1)
  num2 = checkNumber(num2)

  // get decimal digits for recording status
  const num1Precision: number = getPrecision(num1)
  const num2Precision: number = getPrecision(num2)
  const precision: number = num1Precision + num2Precision

  // validation of parameter validity and record state
  let snegativeFlag: number = 0
  num1 = isNegative(num1) ? (snegativeFlag++ , clearNegative(num1)) : num1
  num2 = isNegative(num2) ? (snegativeFlag++ , clearNegative(num2)) : num2

  // convert to integers based on the maximum decimal number
  const str1: string[] = num1.replace('.', '').split('').reverse();
  const str2: string[] = num2.replace('.', '').split('').reverse();
  const len1: number = str1.length;
  const len2: number = str2.length;
  const result: any[] = [];
  let resultLen = len1 + len2;
  for (; resultLen--;) {
    result[resultLen] = 0;
  }

  // computation according to vertical multply rule
  for (let i = 0; i < len1; i++) {
    for (let j = 0; j < len2; j++) {
      result[i + j] += parseInt(str1[i], 0) * parseInt(str2[j], 0);
    }
  }
  resultLen = result.length;
  for (let i = 0; i < resultLen; i++) {
    const temp = result[i];
    if (temp >= 10) {
      result[i] = temp % 10;
      result[i + 1] += Math.floor(temp / 10);
    }
  }

  // Add decimal points according to the maximum decimal number and clean up the data then return result
  precision && result.splice(precision, 0, '.');
  let returnResult = result.reverse().join('');
  returnResult = clearZero(returnResult)

  if (snegativeFlag === 1) {
    returnResult = `-${returnResult}`;
  }

  return clearZero(returnResult)
}


export default multply