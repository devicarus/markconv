module.exports = (html) => {
    var puppeteer = require("pdf-puppeteer");

    var promise = new Promise((resolve, reject) => {
        puppeteer(html, function (res) {
            resolve(res)
        }, {
            format: 'A6',
            margin: {
                left: '30px',
                right: '30px',
                top: '30px',
                bottom: '30px'
            }
        }, {
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }, false)
    })

    return promise
}