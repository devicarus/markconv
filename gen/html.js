module.exports = (md, css) => {
	var promise = new Promise((resolve, reject) => {
		var MarkdownIt = require('markdown-it')();

		MarkdownIt.use(require('@iktakahiro/markdown-it-katex'));
		MarkdownIt.use(require("markdown-it-wiki-toc"));
		MarkdownIt.use(require('markdown-it-attrs'), {
			leftDelimiter: '[[',
			rightDelimiter: ']]'
		});
		MarkdownIt.use(require('markdown-it-br'));

		var result = MarkdownIt.render(md);

		var html = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<style>
					@media print {
						hr {page-break-after:always;visibility:hidden;}
					}
					${css}
				</style>
			</head>
			<body>
				${result}
			</body>
			</html>
		`

		resolve(html)
	})



	return promise
}