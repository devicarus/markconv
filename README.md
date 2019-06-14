markpdf

> Feature-rich markdown convertor currently supporting HTML and PDF

```bash
npm i markconv
```

## Features

- CSS support

- Page break helper

- Automatic Table of Contents generation

- Automatic wiki-like heading numbering

- LaTeX support

## How to use

### CLI

Install `markconv` globaly

```bash
npm i markconv -g
```

Use `markconf`

```bash
markconv [source] [style] [format]
```

`source` - Path to your markdown file *(required)*

`style` - Path to your CSS file *(required, maybe changed in later updates)*

`format` - Your target format *(required)*

### Code

Install `markconv`

```
npm i markconv
```

Use `markconv` in your code

```javascript
markpdf({
    source: "source.md", // Path to your markdown file (required)
    style: "style.css", //Path to your CSS file (required, maybe changed in later updates)
    output: "format" // Your target format (required)
}).then(output => {
    // YOUR CODE
})
```
