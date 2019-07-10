const fs = require('fs')
const path = require('path')
const type = process.argv[process.argv.length - 1]
const content = fs.readFileSync(path.join(__dirname, `${type}.json`))
fs.writeFileSync(path.join(__dirname, '..', 'tsconfig.json'), content.toString())