var scheme = require("../src/scheme.js");

function printOne(result) {
    var s = scheme.print([result]);
    return s.substring(0, s.indexOf("\n"));
}

module.exports = {
    testMultiple: function(test) {
        test.equal(scheme.print([1, 2]), "1\n2\n");
        test.done();
    },
    testStrings: function(test) {
        test.equal(printOne("hello"), '"hello"');
        test.done();
    },
    testBooleans: function(test) {
        test.equal(printOne(true), "#t");
        test.equal(printOne(false), "#f");
        test.done();
    },
    testSymbols: function(test) {
        test.equal(printOne(new scheme.Symbol("hello")), "hello");
        test.done();
    },
    testLists: function(test) {
        test.equal(printOne([1, 2, 3]), "(1 2 3)");
        test.done();
    },
    testProcedures: function(test) {
        test.equal(printOne(function() {}), "#procedure");
        test.done();
    }
};
