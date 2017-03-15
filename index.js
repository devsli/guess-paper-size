var SIZES = [
    { name: "A0",  width: 841, height: 1189 },
    { name: "A1",  width: 594, height:  841 },
    { name: "A2",  width: 420, height:  594 },
    { name: "A3",  width: 297, height:  420 },
    { name: "A4",  width: 210, height:  297 },
    { name: "A5",  width: 148, height:  210 },
    { name: "A6",  width: 105, height:  148 },
    { name: "A7",  width:  74, height:  105 },
    { name: "A8",  width:  52, height:   74 },
    { name: "A9",  width:  37, height:   52 },
    { name: "A10", width:  26, height:   37 },

    { name: "B0",  width: 1000, height: 1414 },
    { name: "B1",  width:  707, height: 1000 },
    { name: "B2",  width:  500, height:  707 },
    { name: "B3",  width:  353, height:  500 },
    { name: "B4",  width:  250, height:  353 },
    { name: "B5",  width:  176, height:  250 },
    { name: "B6",  width:  125, height:  176 },
    { name: "B7",  width:   88, height:  125 },
    { name: "B8",  width:   62, height:   88 },
    { name: "B9",  width:   44, height:   62 },
    { name: "B10", width:   31, height:   44 },

    { name: "C0",  width: 917, height: 1297 },
    { name: "C1",  width: 648, height:  917 },
    { name: "C2",  width: 458, height:  648 },
    { name: "C3",  width: 324, height:  458 },
    { name: "C4",  width: 229, height:  324 },
    { name: "C5",  width: 162, height:  229 },
    { name: "C6",  width: 114, height:  162 },
    { name: "C7",  width:  81, height:  114 },
    { name: "C8",  width:  57, height:   81 },
    { name: "C9",  width:  40, height:   57 },
    { name: "C10", width:  28, height:   40 },

    { name: "Letter" , width: 216, height: 279 },
    { name: "Legal"  , width: 216, height: 356 },
    { name: "Tabloid", width: 279, height: 432 }
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
    var orientation = 'portrait';

    if (width > height) {
        orientation = 'landscape';
        var tmp = width;
        width = height;
        height = tmp;
    }

    var found = SIZES.find(function(paper) {
        var eq = exactMatcher;

        if (paper.name.match(/[A-C][0-9]+/)) {
            eq = iso216FuzzyMatcher;
        }

        return eq(paper.width, width) && eq(paper.height, height);
    });

    if (found == null) {
        throw 'Not found';
    }

    return { paper: found.name, orientation: orientation };
};
