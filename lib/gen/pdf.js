module.exports = (html, preferences) => {
    var puppeteer = require("pdf-puppeteer");

    var options = {
        page: preferences.config,
        puppeteer: {
            args: []
        }
    }

    if (!preferences.arguments.sandbox) {
        options.puppeteer.args.push('--no-sandbox', '--disable-setuid-sandbox')
    }

    var promise = new Promise((resolve, reject) => {
        puppeteer(html, function (res) {
            resolve(res)
        }, options.page, options.puppeteer)
    })

    return promise
}