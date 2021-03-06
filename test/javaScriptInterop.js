var utils = require("./fixtures/utils.js");

module.exports = {
    setUp: function(callback) {
        utils.resetEnv();
        callback();
    },
    testFunctions: function(test) {
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
    testVariables: function(test) {
        foo = "bar";
        test.equal(utils.eval("(.foo js)"), "bar");
        utils.eval('(set! (.foo js) "foobar")');
        test.equal(foo, "foobar");
        delete foo;
        test.done();
    },
    testCreateObject: function(test) {
        test.deepEqual(
            utils.evalFirst('(make-object \'((hello . "world")(foo . "bar")))'),
            {hello: "world", foo: "bar"});
        test.deepEqual(
            utils.evalFirst('(make-object `((nested . ,(make-object ' +
                            '\'((hello . "world"))))))'),
            {nested: {hello: "world"}});
        test.done();
    },
    testNew: function(test) {
        test.deepEqual(utils.evalFirst('(new (.String js) "Hello")'),
                       new String("Hello"));
        test.deepEqual(utils.evalFirst('(new (.Date js) 2012 0 19)'),
                       new Date(2012, 0, 19));
        test.done();
    },
    testTryCatch: function(test) {
        called = false;
        utils.eval('(try (foo) (lambda (e) (set! (.called js) #t)))');
        test.ok(called);
        delete called;
        test.done();
    }
};
