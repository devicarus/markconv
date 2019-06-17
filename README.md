# markpdf

> Feature-rich markdown convertor currently supporting HTML and PDF

```bash
npm i markconv
```

## Features

- Export to HTML and PDF

- CSS support

- Page break helper

- Automatic Table of Contents generation

- Automatic wiki-like heading numbering

- LaTeX support

- Both library and CLI tool

## How to use

### CLI

Install `markconv` globaly

```bash
npm i markconv -g
```

Use `markconf` in CLI

```bash
markconv --help
```

### Code

Install `markconv`

```
npm i markconv
```

Use `markconv` in your code

```javascript
markpdf({
	source: "MyFile.md",
	style: "style.css",
	output: "pdf"
},
{
	pdf: {
		sandbox: false,
		page: {
			format: 'A6',
			margin: {
				left: '30px',
				right: '30px',
				top: '30px',
				bottom: '30px'
			}
		}
	}
}).then(file => {
    // Your code here, e.g.:
	fs.writeFileSync(`./MyPDF.pdf`, file, "utf-8")
})
```
