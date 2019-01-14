const path = require('path')
const uglify = require('uglifyjs-webpack-plugin')// 压缩文件用

module.exports = {
  // 入口
  entry:{
    entry: './src/entry.js',
    entry2: './src/entry2.js'
  },
  // 出口
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js'
  },
  // 模块：例如解读CSS,图片如何转换，压缩
  module:{
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader','css-loader'],    // 第1种
        // loader: ['style-loader','css-loader'], // 第2种
        use: [                                    // 第3种
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      }
    ]
  },
  //插件，用于生产模版和各项功能
  plugins:[
    // new uglify()
  ],
  //配置webpack开发服务功能
  devServer:{
    contentBase: path.resolve(__dirname,'dist'),// 热更新路径配置
    host: '192.168.1.163',
    compress: true, // 服务器压缩
    port: 1717
  }
}