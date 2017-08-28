/**
 * Created by lihongye on 2017/2/17.
 */
import path from 'path'
var webpack = require('webpack')
import OpenBrowserPlugin from 'open-browser-webpack-plugin'

var hostname = '10.2.54.127'

export default {
    devServer: {
        host: hostname
    },
  entry:"./src/index.js",
  output:{
    path: __dirname + '/build',
    filename: '[name].js'
  },
  module:{
    rules:[
      {test: /\.jsx?$/, use: 'babel-loader', exclude: path.resolve(__dirname, 'node_modules')},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader"},
      {test: /\.(woff|woff2)(\?v=\d\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/octet-stream"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=image/svg+xml"}
    ]
  },
  plugins: [
    new OpenBrowserPlugin({
      url: `http://${hostname}:8080`
    }),
  ],
  devtool: "eval"
}