import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'node:path';

import Info from '../../src/webpack';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

export default {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    Info(), // <-- Add the plugin
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Webpack Demo',
      template: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'dist')
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true
  }
} satisfies Configuration;
