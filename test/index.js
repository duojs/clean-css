
/**
 * Module dependencies.
 */

var assert = require('assert');
var Duo = require('duo');
var cleancss = require('..');
var vm = require('vm');

/**
 * Tests.
 */

describe('duo-clean-css', function () {
  it('should compress css files', function (done) {
    build('simple').run(function (err, results) {
      if (err) return done(err);
      console.log(results.code);
      assert.equal(results.code.indexOf('\n'), -1); // 1 line
      done();
    });
  });

  it('should proxy additional options', function (done) {
    var options = { keepBreaks: true };
    build('simple', options).run(function (err, results) {
      if (err) return done(err);
      console.log(results.code);
      assert(results.code.indexOf('\n') > -1);
      done();
    });
  });
});

/**
 * Returns a duo builder for the given fixture.
 *
 * @param {String} fixture    The name of fixture (w/o fixtures/ or .js)
 * @param {Object} [options]  Options for the uglify plugin
 * @returns {Duo}
 */

function build(fixture, options) {
  return Duo(__dirname)
    .cache(false)
    .entry('fixtures/' + fixture + '.css')
    .use(cleancss(options));
}

/**
 * Evaluates code compiled by duo.
 *
 * @param {String} src
 * @param {Object} [ctx]
 * @returns {Object}
 */

function evaluate(src, ctx) {
  ctx = ctx || { console: console };
  return vm.runInNewContext(src, ctx)(1);
}
