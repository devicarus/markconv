module.exports = (sourcePath, stylePath, outputFormat) => {
	var fs = require('fs');
	var path = require('path');

	var gen = {
		html: require("./gen/html"),
		pdf: require('./gen/pdf')
	}

	var parameters = {
		files: {
			source: path.resolve(sourcePath),
			style: path.resolve(stylePath)
		},
		output: outputFormat
	}

	filebase = path.basename(parameters.files.source, ".md");
	path.resolve("./" + filebase);

	var promise = new Promise((resolve, reject) => {
		fs.readFile(parameters.files.source, "utf-8", function (err, source) {
			if (err) reject(err)
	
			var user_css = fs.readFileSync(parameters.files.style, "utf-8");
			var katex_css = fs.readFileSync(__dirname + "/node_modules/katex/dist/katex.min.css", "utf-8");
			var css = user_css + katex_css
	
			gen.html(source, css).then(html => {
				switch (parameters.output) {
					case "html":
						resolve(html)
						break;

					case "pdf":
						gen.pdf(html).then(pdf => { 
							resolve(pdf)
						})
						break; 
				
					default:
						reject(new Error("Unsupported output format"))
						break;
				}
			})
		})
	})

	return promise
};