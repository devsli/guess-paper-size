# Paper size detector #

[![Build Status](https://travis-ci.org/devsli/guess-paper-size.svg?branch=master)](https://travis-ci.org/devsli/guess-paper-size)

Basic paper size detector.

# Install #

    npm install guess-paper-size

# Use #

```javascript
// import guess from 'guess-paper-size';
var guess = require('guess-paper-size');

var width = 210; // mm
var height = 297; // mm

var paper = guess(width, height);
if (paper) {
  console.log('Detected ' + paper.size + ' paper, ' + paper.layout);
}
```

[Test me in your browser using RunKit!](https://runkit.com/npm/guess-paper-size)

## Return value ##

When found, JavaScript object returned:

* **size** - format name (e.g. `Letter`, `A4`, `B3`)
* **layout** - `landscape` or `portrait`

When not found, return `null`

# Known paper sizes #

It's supposed to recognize all page sizes [used by PDFKit](https://github.com/devongovett/pdfkit/blob/v0.8.0/lib/page.coffee#L72):

* International formats: `4A0`; `2A0`; `A0`...`A10`; `B0`...`B10`; `C0`...`C10`; `RA0`...`RA4`; `SRA0`...`SRA4`
* US formats: Executive, Folio, Letter, Legal, Tabloid

# Links #

* [ISO 216 - Wikipedia](https://en.wikipedia.org/wiki/ISO_216)
* [Paper size - Wikipedia](https://en.wikipedia.org/wiki/Paper_size#Loose_sizes)
* [guess-paper-size at npmjs.com](https://www.npmjs.com/package/guess-paper-size)
* https://www.npmjs.com/package/paper-size - get paper dimensions by name
