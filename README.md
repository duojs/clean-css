[![Build Status](https://travis-ci.org/duojs/clean-css.svg)](https://travis-ci.org/duojs/clean-css)

# duo-clean-css

> A clean-css plugin for use in duo builds

## Installation

```sh
$ npm install duo-clean-css
```

## Usage

```sh
$ duo --use duo-clean-css
```

```js
var duo = require('duo');
var cleancss = require('duo-clean-css');

duo(__dirname)
  .use(cleancss())
  .entry('index.css')
  .run(function (err, results) {
    // ...
  });
```

## API

### cleancss(options)

Generates a duo plugin function. Any `options` will be passed directly to
`new CleanCSS().minify()`.
