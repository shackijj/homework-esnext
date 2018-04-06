const path = require('path')

module.exports = {
  entry: [
    'whatwg-fetch',
    'core-js/fn/promise',
    './src/fetchSequence.js'
  ],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'fetch-sequence.js',
    publicPath: '/assets/',
    library: 'fetchSequence',
    libraryTarget: 'umd'
  }
}
