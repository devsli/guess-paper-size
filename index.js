var SIZES = [
    { size: "A0",  width: 841, height: 1189 },
    { size: "A1",  width: 594, height:  841 },
    { size: "A2",  width: 420, height:  594 },
    { size: "A3",  width: 297, height:  420 },
    { size: "A4",  width: 210, height:  297 },
    { size: "A5",  width: 148, height:  210 },
    { size: "A6",  width: 105, height:  148 },
    { size: "A7",  width:  74, height:  105 },
    { size: "A8",  width:  52, height:   74 },
    { size: "A9",  width:  37, height:   52 },
    { size: "A10", width:  26, height:   37 },

    { size: "B0",  width: 1000, height: 1414 },
    { size: "B1",  width:  707, height: 1000 },
    { size: "B2",  width:  500, height:  707 },
    { size: "B3",  width:  353, height:  500 },
    { size: "B4",  width:  250, height:  353 },
    { size: "B5",  width:  176, height:  250 },
    { size: "B6",  width:  125, height:  176 },
    { size: "B7",  width:   88, height:  125 },
    { size: "B8",  width:   62, height:   88 },
    { size: "B9",  width:   44, height:   62 },
    { size: "B10", width:   31, height:   44 },

    { size: "C0",  width: 917, height: 1297 },
    { size: "C1",  width: 648, height:  917 },
    { size: "C2",  width: 458, height:  648 },
    { size: "C3",  width: 324, height:  458 },
    { size: "C4",  width: 229, height:  324 },
    { size: "C5",  width: 162, height:  229 },
    { size: "C6",  width: 114, height:  162 },
    { size: "C7",  width:  81, height:  114 },
    { size: "C8",  width:  57, height:   81 },
    { size: "C9",  width:  40, height:   57 },
    { size: "C10", width:  28, height:   40 },

    { size: "Letter" , width: 216, height: 279 },
    { size: "Legal"  , width: 216, height: 356 },
    { size: "Tabloid", width: 279, height: 432 }
];

function exactMatcher(a, b) {
    return a == b;
};

function iso216FuzzyMatcher(a, b) {
    var tolerance;

    if (a > 600) {
        tolerance = 3;
    } else if (a > 150) {
        tolerance = 2;
    } else {
        tolerance = 1.5;
    }

    return Math.abs(a - b) <= tolerance;
}

module.exports = function(width, height) {
    var layout = 'portrait';

    if (width > height) {
        layout = 'landscape';
        var tmp = width;
        width = height;
        height = tmp;
    }

    var found = SIZES.find(function(paper) {
        var eq = exactMatcher;

        if (paper.size.match(/[A-C][0-9]+/)) {
            eq = iso216FuzzyMatcher;
        }

        return eq(paper.width, width) && eq(paper.height, height);
    });

    if (found == null) {
        throw "Not found";
    }

    return { size: found.size, layout: layout };
};
