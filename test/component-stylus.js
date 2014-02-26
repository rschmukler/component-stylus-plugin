var assert = require('assert');
var Builder = require('component-builder');
var stylus = require('../');
stylus.linenos = false;

describe('component-stylus', function() {
  it('should pass-though if there are no Stylus files', function(done) {
    var builder = new Builder('test/fixtures/no-styl');
    builder.use(stylus);

    builder.build(function(err, res) {
      if (err) return done(err);
      assert.equal(res.css.trim(), 'body {\n  color: red;\n}');
      done();
    });
  });

  it('should build Stylus files to css', function(done) {
    var builder = new Builder('test/fixtures/simple');
    builder.use(stylus);

    builder.build(function(err, res) {
      if (err) return done(err);
      assert.equal(res.css.trim(), 'body {\n  color: #f00;\n}\nbody div {\n  display: block;\n}');
      done();
    });
  });

  it('should build with imported files', function(done) {
    var builder = new Builder('test/fixtures/multiple');
    builder.use(stylus);

    builder.build(function(err, res) {
      if (err) return done(err);
      assert.equal(res.css.trim(), '.bar {\n  color: #000;\n}\nbody {\n  content: "foo";\n  color: #f00;\n}\nbody div {\n  display: block;\n}');
      done();
    });
  });

  it('should build with imported component files', function(done) {
    var builder = new Builder('test/fixtures/with-import');
    builder.use(stylus);

    builder.build(function(err, res) {
      if (err) return done(err);
      assert.equal(res.css.trim(), '.bar,\n#barz {\n  content: "foo";\n}\n.bar {\n  content: "mixin";\n  font-size: 24px;\n}');
      done();
    });
  });
});
