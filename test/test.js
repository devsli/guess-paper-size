var assert = require('assert');
var guess = require('../index');

describe('guess-paper-size', function() {
    it('should detect metric sizes', function() {
        assert.deepEqual(
            { size: 'A0', layout: 'portrait' },
            guess(841, 1189));

        assert.deepEqual(
            { size: 'B2', layout: 'portrait' },
            guess(500, 707));

        assert.deepEqual(
            { size: 'C6', layout: 'portrait' },
            guess(114, 162));


        assert.deepEqual(
            { size: 'A0', layout: 'landscape' },
            guess(1189, 841));

        assert.deepEqual(
            { size: 'B2', layout: 'landscape' },
            guess(707, 500));

        assert.deepEqual(
            { size: 'C6', layout: 'landscape' },
            guess(162, 114));
    });

    it('should consider ISO 216 tolerance', function() {
        assert.deepEqual(
            { size: 'A0', layout: 'portrait' },
            guess(841 + 3, 1189 + 3));

        assert.deepEqual(
            { size: 'A0', layout: 'portrait' },
            guess(841 - 3, 1189 - 3));

        assert.deepEqual(
            { size: 'A0', layout: 'portrait' },
            guess(841 - 3, 1189 - 3));

        assert.deepEqual(
            { size: 'A4', layout: 'portrait' },
            guess(210 + 2, 297 - 2));

        assert.deepEqual(
            { size: 'A4', layout: 'landscape' },
            guess(297 + 2, 210 - 2));


        // over 3mm when greater than 600mm
        assert.throws(guess.bind(null, 841 + 4, 1189), /Not found/,
                      '4mm tolerance accepted when 3mm max');

        // over 2mm for 150..600mm
        assert.throws(guess.bind(null, 297 + 3, 420), /Not found/,
                      '3mm tolerance accepted when 2mm max');

        // over 1.5mm when less than 150mm
        assert.throws(guess.bind(null, 26 + 1.6, 37), /Not found/,
                     '1.6mm tolerance accepted when 1.5mm max');
    });

    it('should detect US size sizes', function() {
        assert.deepEqual(
            { size: 'Letter', layout: 'portrait' },
            guess(216, 279));

        assert.deepEqual(
            { size: 'Legal', layout: 'portrait' },
            guess(216, 356));

        assert.deepEqual(
            { size: 'Tabloid', layout: 'portrait' },
            guess(279, 432));
    });

    it('should not apply ISO 216 tolerance to US formats', function() {
        assert.throws(guess.bind(null, 216 + 0.1, 279), /Not found/,
                      'US Letter detected when nothing expected');
    });
});

