# Paper size detector

[![Build Status](https://travis-ci.org/devsli/guess-paper-size.svg?branch=master)](https://travis-ci.org/devsli/guess-paper-size)

Basic paper size detector.

# Install

    npm install guess-paper-size
    
# Use

```javascript
var guess = require('guess-paper-size');
    
var width = 210; // mm
var height = 297; // mm

try {
  var paper = guess(width, height);
  console.log('Detected ' + paper.size + ' paper, ' + paper.layout);
} catch {
  console.warn('Unknown paper format');
}
```

[Test me in your browser using RunKit!](https://runkit.com/npm/guess-paper-size)

# Known paper sizes

* ISO formats: `A0`...`A10`; `B0`...`B10`; `C0`...`C10`
* US formats: Letter, Legal, Tabloid

# Links

* [ISO 216 - Wikipedia](https://en.wikipedia.org/wiki/ISO_216)
* [Paper size - Wikipedia](https://en.wikipedia.org/wiki/Paper_size#Loose_sizes)
* https://www.npmjs.com/package/paper-size - get paper dimensions by name
