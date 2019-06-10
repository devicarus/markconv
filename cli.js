#! /usr/bin/env node

var markpdf = require('./lib/main')

var fs = require('fs')
var replaceExt = require('replace-ext');

var source = process.argv[2],
    style = process.argv[3],
    output = process.argv[4]

markpdf(source, style, output)
.then((file) => {
    var target = replaceExt(source, `.${output}`)
    fs.writeFileSync(target, file, "utf-8")
    console.log(`Successfuly exported to ${output}`)
}).catch(err => {
    console.log(err)
})