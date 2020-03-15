if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/di-util.umd.min.js');
} else {
  module.exports = require('./dist/di-util.umd.js');
}
