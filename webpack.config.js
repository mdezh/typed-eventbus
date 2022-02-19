const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: {
      name: '@mdezh/typed-eventbus',
      type: 'commonjs',
    },
    clean: true,
  },
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
