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

        assert.equal(
            null,
            guess(841 + 4, 1189),
            '4mm tolerance accepted when 3mm max'
        );

        assert.equal(
            null,
            guess(297 + 3, 420),
            '3mm tolerance accepted when 2mm max'
        );

        assert.equal(
            null,
            guess(26 + 1.6, 37),
            '1.6mm tolerance accepted when 1.5mm max'
        );
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
        assert.equal(
            null,
            guess(216 + 0.1, 279),
            'US Letter detected when nothing expected'
        );
    });
});

