
/**
 * Module dependencies.
 */

var bytes = require('bytes');
var CleanCSS = require('clean-css');
var debug = require('debug')('duo-cleancss');
var extend = require('extend');

/**
 * Default options.
 */

var defaults = {
  processImport: false
};

/**
 * Returns an uglify _alternate_ plugin (operates on the entire build for a JS
 * entry file)
 *
 * @param {Object} o
 * @returns {Function}
 */

module.exports = function (o) {
  debug('initializing', o);

  return alternate(function cleancss(build, entry) {
    if (entry.type !== 'css') return;

    debug('processing', entry.id);

    var src = build.code;
    var options = extend({}, defaults, o);
    debug('options', options);

    var results = new CleanCSS(options).minify(build.code);
    debug('saved %s', bytes(src.length - results.styles.length));

    build.code = results.styles;
  });
};

function alternate(fn) {
  fn.alternate = true;
  return fn;
}
