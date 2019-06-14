module.exports = (parameters, preferences) => {
	var fs = require('fs');
	var path = require('path');

	var gen = {
		html: require("./gen/html"),
		pdf: require('./gen/pdf')
	}

	parameters.source = path.resolve(parameters.source);
	if (parameters.style != "") {
		parameters.style = path.resolve(parameters.style);
	}

	filebase = path.basename(parameters.source, ".md");
	path.resolve("./" + filebase);

	var promise = new Promise((resolve, reject) => {
		fs.readFile(parameters.source, "utf-8", function (err, source) {
			if (err) reject(err)
			
			var user_css
			if (parameters.style != "") {
				user_css = fs.readFileSync(parameters.style, "utf-8");	
			}
			var katex_css = fs.readFileSync(__dirname + "/node_modules/katex/dist/katex.min.css", "utf-8");
			var css = user_css + katex_css
	
			gen.html(source, css).then(html => {
				switch (parameters.output) {
					case "html":
						resolve(html)
						break;

					case "pdf":
						gen.pdf(html, preferences.pdf).then(pdf => { 
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