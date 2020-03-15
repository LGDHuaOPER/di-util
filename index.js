if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/di-util.commonjs2.min.js');
} else {
  module.exports = require('./dist/di-util.commonjs2.js');
}
