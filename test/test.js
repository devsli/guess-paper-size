var assert = require('assert');
var guess = require('../index');

describe('guess-paper-size', function() {
    it('should detect metric sizes', function() {
        assert.deepEqual(
            { paper: 'A0', orientation: 'portrait' },
            guess(841, 1189));

        assert.deepEqual(
            { paper: 'B2', orientation: 'portrait' },
            guess(500, 707));

        assert.deepEqual(
            { paper: 'C6', orientation: 'portrait' },
            guess(114, 162));


        assert.deepEqual(
            { paper: 'A0', orientation: 'landscape' },
            guess(1189, 841));

        assert.deepEqual(
            { paper: 'B2', orientation: 'landscape' },
            guess(707, 500));

        assert.deepEqual(
            { paper: 'C6', orientation: 'landscape' },
            guess(162, 114));
    });

    it('should consider ISO 216 tolerance', function() {
        assert.deepEqual(
            { paper: 'A0', orientation: 'portrait' },
            guess(841 + 3, 1189 + 3));

        assert.deepEqual(
            { paper: 'A0', orientation: 'portrait' },
            guess(841 - 3, 1189 - 3));

        assert.deepEqual(
            { paper: 'A0', orientation: 'portrait' },
            guess(841 - 3, 1189 - 3));

        assert.deepEqual(
            { paper: 'A4', orientation: 'portrait' },
            guess(210 + 2, 297 - 2));

        assert.deepEqual(
            { paper: 'A4', orientation: 'landscape' },
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

    it('should detect US paper sizes', function() {
        assert.deepEqual(
            { paper: 'Letter', orientation: 'portrait' },
            guess(216, 279));

        assert.deepEqual(
            { paper: 'Legal', orientation: 'portrait' },
            guess(216, 356));

        assert.deepEqual(
            { paper: 'Tabloid', orientation: 'portrait' },
            guess(279, 432));
    });

    it('should consider ISO 216 tolerance is not used in US paper sizes', function() {
        assert.throws(guess.bind(null, 216 + 0.1, 279), /Not found/,
                      'US Letter detected when nothing expected');
    });
});

