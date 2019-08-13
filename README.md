# markpdf

> Feature-rich markdown convertor currently supporting HTML and PDF

## Quick start

```bash
# Install markconv globaly to use in cli
npm i markconv -g

# Example cli command
markconv source=MyFile.md format=pdf
```

[API example](#api)

## Features

- Export to HTML and PDF

- CSS support

- [Page break helper](#page-break)

- [Automatic Table of Contents generation](#toc-generator)

- Automatic wiki-like heading numbering

- LaTeX support

- Both library and CLI tool

## How to use

### CLI

```bash
# Install markconv globaly
npm i markconv -g

# Use markconv in CLI
markconv --help
```

### API

Install `markconv`

```bash
npm i markconv
```

Use `markconv` in your code

```javascript
const markconv = require('markconv')
const fs = require('fs')

markconv({
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

## Markdown helpers

### Page Break

```md
# First page
---
# Second page
<hr>
# Third page
```

### TOC Generator

```md
@[toc]
```
