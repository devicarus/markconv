#! /usr/bin/env node

'use strict'
var markpdf = require('./index')

const meow = require('meow');
var fs = require('fs')
var replaceExt = require('replace-ext');

const cli = meow(`
	Usage
	  $ markconf source=<source file> style=<styles file (optional)> format=<output format> pdf=<pdf options (optional)> [Options]

	Supported output formats
	  html, pdf

	PDF options
	  [page format (A4, A5, ...)]/[left margin (in px)]/[right]/[top]/[bottom]

	  If you choose to use this parameter, you have to fill in all of these.

	Options
	  --nosandbox, -ns  Passes no-sandbox flag to Puppeteer

	Examples
	  $ markconf source=MyFile.md style=style.css format=pdf pdf=A5/20/20/20/20 --nosandbox
`, {
	flags: {
		nosandbox: {
			type: 'boolean',
			alias: 'ns'
		},
	}
});

var parameters = {
	'source': "",
	'style': "",
	'output': ""
}

var options = {
	pdf: {
		sandbox: cli.flags.sandbox,
		page: null
	}
}

for (let index = 0; index < cli.input.length; index++) {
	var argument = cli.input[index].split('=')

	switch (argument[0]) {
		case 'source':
			parameters.source = argument[1]
			break;

		case 'style':
			parameters.style = argument[1]
			break;

		case 'format':
			parameters.output = argument[1]
			break;

		case 'pdf':
			var split = argument[1].split('/')
			if (split.length != 5) {
				console.log(new Error('Unvalid value of pdf argument'))
			}
			options.pdf.page = {
				format: split[0],
				margin: {
					left: split[1] + 'px',
					right: split[2] + 'px',
					top: split[3] + 'px',
					bottom: split[4] + 'px'
				}
			}
			break;

		default:
			console.log(new Error("Unknown parameter " + argument[0]))
			break;
	}
}

markpdf(parameters, options)
	.then((file) => {
		var target = replaceExt(parameters.source, `.${parameters.output}`)
		fs.writeFileSync(target, file, "utf-8")
		console.log(`Successfuly exported to ${parameters.output}`)
	}).catch(err => {
		console.log(err)
	})