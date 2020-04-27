module.exports = {
  devServer: {
    contentBase: `${__dirname}/public`,
    publicPath: '/',
    historyApiFallback: true,
    compress: true,
    port: 3000
  },
  entry: './src/index.jsx',
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader'
        },
        test: /\.jsx?$/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
};
