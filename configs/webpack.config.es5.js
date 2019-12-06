const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'app.es5.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { useBuiltIns: 'usage', debug: true, targets: { browsers: '>1%' } }]]
          }
        }
      }
    ]
  }
};
