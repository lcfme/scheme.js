var utils = require("./fixtures/utils.js");

module.exports = {
    setUp: function(callback) {
        utils.resetEnv();
        callback();
    },
    testArithmetic: function(test) {
        test.equal(utils.evalFirst("(+ 1 3)"), 4);
        test.equal(utils.evalFirst("(- 4 1)"), 3);
        test.equal(utils.evalFirst("(* 2 9)"), 18);
        test.equal(utils.evalFirst("(/ 20 5)"), 4);
        test.done();
    },
    testComparison: function(test) {
        test.ok(utils.evalFirst("(= 1 1)"));
        test.ok(!utils.evalFirst("(= 1 2)"));
        test.ok(utils.evalFirst("(> 2 1)"));
        test.ok(!utils.evalFirst("(> 1 2)"));
        test.ok(utils.evalFirst("(< 1 2)"));
        test.ok(!utils.evalFirst("(< 2 1)"));
        test.ok(utils.evalFirst("(>= 2 1)"));
        test.ok(!utils.evalFirst("(>= 1 2)"));
        test.ok(utils.evalFirst("(<= 1 2)"));
        test.ok(!utils.evalFirst("(<= 2 1)"));
        test.ok(utils.evalFirst("(and 1 1)"));
        test.ok(!utils.evalFirst("(and 1 0)"));
        test.ok(utils.evalFirst("(or 1 0)"));
        test.ok(!utils.evalFirst("(or 0 0)"));
        test.done();
    },
    testConditions: function(test) {
        test.equal(utils.evalFirst("(if (= 1 1) 1 2)"), 1);
        test.equal(utils.evalFirst("(if (= 1 2) 1 2)"), 2);
        test.equal(utils.evalFirst("(if (= 1 1) 1)"), 1);
        test.equal(utils.evalFirst("(if (= 1 2) 1)"), undefined);
        test.done();
    },
    testVariables: function(test) {
        test.equal(utils.evalFirst("x"), undefined);
        utils.eval("(define x 5)");
        test.equal(utils.evalFirst("x"), 5);
        utils.eval("(set! x 6)");
        test.equal(utils.evalFirst("x"), 6);
        test.done();
    },
    testLambdas: function(test) {
        test.equal(utils.evalFirst("((lambda (x) (* x x)) 2)"), 4);
        test.done();
    },
    testMultipleExpressions: function(test) {
        test.deepEqual(utils.eval("1 2"), [1, 2]);
        test.deepEqual(utils.eval("(+ 1 2) (- 5 1)"), [3, 4]);
        test.deepEqual(utils.eval("(define x 5) (* x 2)"), [undefined, 10]);
        test.done();
    },
    testQuoting: function(test) {
        test.equal(utils.evalFirst("(quote hello)"), "hello");
        test.deepEqual(utils.evalFirst("(quote (1 2 3))"), [1, 2, 3]);
        test.done();
    },
    testStrings: function(test) {
        test.equal(utils.evalFirst('"hello"'), "hello");
        test.done();
    },
    testJavaScriptFunctions: function(test) {
        var stubWasCalled = false;
        stub = function() {
            stubWasCalled = true;
        };
        utils.eval("((.stub js))");
        test.ok(stubWasCalled,
                "The JavaScript function stub() should have been called");
        delete stub;
        test.equal(utils.evalFirst('((.substring "hello") 0 4)'), "hell");
        utils.eval('(define s "hello")');
        test.equal(utils.evalFirst("((.substring s) 0 4)"), "hell");
        test.done();
    },
    testJavaScriptVariables: function(test) {
        foo = "bar";
        test.equal(utils.eval("(.foo js)"), "bar");
        utils.eval('(set! (.foo js) "foobar")');
        test.equal(foo, "foobar");
        delete foo;
        test.done();
    },
    testBegin: function(test) {
        test.equal(utils.evalFirst("(begin 1 2 3)"), 3);
        test.done();
    },
    testProcedures: function(test) {
        utils.eval("(define (pow x) (* x x))");
        test.equal(utils.evalFirst("(pow 10)"), 100);
        test.equal(utils.evalFirst("(pow (* 2 5))"), 100);
        test.done();
    },
    testComments: function(test) {
        test.ok(utils.eval("1 ; 2").length === 1);
        test.done();
    },
    testBooleans: function(test) {
        test.equal(utils.evalFirst("#t"), true);
        test.equal(utils.evalFirst("#f"), false);
        test.done();
    },
    testLet: function(test) {
        test.equal(utils.evalFirst("(let ((x 1) (y 2)) x y)"), 2);
        test.equal(utils.evalFirst("(let* ((x 1) (y (* 2 x))) y)"), 2);
        test.done();
    }
};