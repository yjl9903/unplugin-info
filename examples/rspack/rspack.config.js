const path = require('path');

const { UnpluginInfo } = require('../../dist/index.cjs');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new (require('@rspack/core').DefinePlugin)({
      'import.meta.env': JSON.stringify({
        NODE_ENV: 'development',
        SSR: false,
      }),
      'process.env': JSON.stringify({
        NODE_ENV: 'development',
      }),
    }),
    UnpluginInfo.rspack({
      // Options here
    }),
  ],
  devServer: {
    port: 8081,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
};