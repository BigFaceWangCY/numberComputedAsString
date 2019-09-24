[Github](https://github.com/BigFaceWangCY/numberComputedAsString.git)

# A JavaScript library for `High Precision Computation`.
[![Build Status](https://travis-ci.org/BigFaceWangCY/numberComputedAsString.svg?branch=master)](https://travis-ci.org/BigFaceWangCY/numberComputedAsString)
[![codecov](https://codecov.io/gh/BigFaceWangCY/numberComputedAsString/branch/master/graph/badge.svg)](https://codecov.io/gh/BigFaceWangCY/numberComputedAsString)

## install
```bash
$ npm install jsbignumber -S
```

### Node.js

```javascript
const jsbignumber = require('jsbignumber').default
console.log(jsbignumber(0.1, 0.2))
```


### ES6 Module:
```javascript
import jsbignumber from "jsbignumber"
console.log(jsbignumber.add(0.1, 0.2))
```

### Browser
```html
<script src="./jsbignumber.min.js"></script>
<script>
  console.log(jsbignumber(0.2, 0.1))
</script>
```


## 5 simple API

|    api    | definition |
| ---------- | --- |
| add |  (num1: string \| number, num2: string \| number): string |
| divide, div      |  (num1: string \| number, num2: string \| number, len: number = 50) : string |
| multply, mul |  (num1: string \| number, num2: string \| number): string |
| substact, sub       |  (num1: string \| number, num2: string \| number): string |
| toFixed       |  (nums: string \| number, decimal: string \| number): string |

## Test

```
npm run test
```

## Example

```js
import jsbignumber from "jsbignumber"
const { add, substact, divide, multply, toFixed } = jsbignumber

// add 
const addValue = add('0.00000000000297623885327264628872813944566975202437690710653591748231030925179641495339618475769115114527914606543143194147848430495597', '120677689870942459137299176289089761143754326820862009921425274349213001568104474801947554427316998849125038885919')
console.log(addValue) // '120677689870942459137299176289089761143754326820862009921425274349213001568104474801947554427316998849125038885919.00000000000297623885327264628872813944566975202437690710653591748231030925179641495339618475769115114527914606543143194147848430495597'

// multply
const multplyValue = multply('-0.070884', '0.0000000000000000002106611401')
console.log(multplyValue) // -0.0000000000000000000149325042548484

// substact
const substactValue = substact('-2471514788.354942554630483008', '-0.0000000055765369280717362958649740')
console.log(substactValue) // '-2471514788.354942549053946079928263704135026'

// toFixed
const substactValue = toFixed('-2471514788.354942554630483008', '5')
console.log(substactValue) // '-2471514788.35494'

// divide
const divideValue = divide('50', '2.901')
console.log(divideValue) // 17.23543605653223026542571527059634608755601516718373

const divideValue2 = divide('50', '2.901', 20)
console.log(divideValue2) // 17.235436056532230265425715270596

const divideValue3 = divide('50', '2.901', 100)
console.log(divideValue3) // 17.2354360565322302654257152705963460875560151671837297483626335746294381247845570492933471216821785591

const divideValue4 = divide(10, 4)
console.log(divideValue4) // 2.5

```
