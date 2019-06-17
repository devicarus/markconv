module.exports = (html, options) => {
    var puppeteer = require("pdf-puppeteer");

    args = []
    if (options.hasOwnProperty('sandbox')) {
        if (!options.sandbox) {
            args.push('--no-sandbox', '--disable-setuid-sandbox')
        }
    }

    var page = null
    if (options.hasOwnProperty('page')) {
        page = options.page
    }

    var promise = new Promise((resolve, reject) => {
        puppeteer(html, function (res) {
            resolve(res)
        }, page, {args:args}, false)
    })

    return promise
}