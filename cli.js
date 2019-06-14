#! /usr/bin/env node

'use strict'
var markpdf = require('./main')

const meow = require('meow');
var fs = require('fs')
var replaceExt = require('replace-ext');

const cli = meow(`
	Usage
	  $ markconf source=<source file> style=<styles file (optional)> format=<output format> config=<config file> [Options]

	Supported output formats
	  html, pdf
 
	Options
	  --nosandbox, -ns  Passes no-sandbox flag to Puppeteer
 
	Examples
	  $ markconf source=MyFile.md style=style.css format=pdf --nosandbox
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
	'output': "",
	'config': ""
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

		case 'config':
			parameters.config = argument[1]
			break;

		default:
			console.log(new Error("Unknown parameter " + argument[0]))
			break;
	}
}

var preferences = {
	pdf: {
		config: null,
		arguments: {
			sandbox: cli.flags.sandbox
		}
	}
}

if (parameters.config != "") {
	preferences.pdf.config = require(path.resolve(parameters.config));	
}

markpdf(parameters, preferences)
	.then((file) => {
		var target = replaceExt(parameters.source, `.${parameters.output}`)
		fs.writeFileSync(target, file, "utf-8")
		console.log(`Successfuly exported to ${parameters.output}`)
	}).catch(err => {
		console.log(err)
	})