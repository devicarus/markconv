var fs = require('fs')

var markpdf = require('./index')

var format = "pdf";

markpdf({
    source: "/home/rainbow/Documents/Physics Cheatsheet.md",
    style: "/home/rainbow/Documents/style.css",
    output: format
}).then(file => {
    fs.writeFileSync(`./test.${format}`, file, "utf-8")
})