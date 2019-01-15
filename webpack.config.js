const path = require('path')
const uglifyjsPlugin = require('uglifyjs-webpack-plugin')// 压缩文件用
const htmlPlugin = require('html-webpack-plugin') // html插件
// const extractTextPlugin = require('extract-text-webpack-plugin') // css分离插件(目前不支持webpack4.x)
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css分离插件 


var website = {
  publicPath: 'http://192.168.1.163:1717/'
}

module.exports = {
  mode: 'development', // 设置mode
  // 入口
  entry:{
    entry: './src/entry.js',
    // entry2: './src/entry2.js'
  },
  // 出口
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js',
    publicPath: website.publicPath,// 配置公用路径
  },
  // 模块：例如解读CSS,图片如何转换，压缩
  module:{
    rules: [
      {
        test: /\.css$/,

        // // use: ['style-loader','css-loader'],    // 第1种
        // // loader: ['style-loader','css-loader'], // 第2种
        // use: [                                    // 第3种
        //   {loader: 'style-loader'},
        //   {loader: 'css-loader'}
        // ]

        // use: extractTextPlugin.extract({
        //   fallback: "style-loader",
        //   use: "css-loader"
        // })

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
              options: {
                // If you are having trouble with urls not resolving add this setting.
                // See https://github.com/webpack-contrib/css-loader#url
                url: false,
                minimize: true,
                sourceMap: true
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif)/,
        use:[{
          loader: 'url-loader',
          options: {
            limit: 50000,// 是把小于500000B的文件打成Base64的格式，写入JS
            outputPath:'images/'
          }
        }]
      },
      {
        test: /\.(html|htm)$/i,
        use: ['html-withimg-loader']
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        },{
            loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test:/\.(jsx|js)$/,
        use:{
          loader:'babel-loader'
        },
        exclude:/node_modules/
      }
    ]
  },
  //插件，用于生产模版和各项功能
  plugins:[
    // new uglifyjsPlugin(),// 压缩代码用的插件
    new htmlPlugin({ // html打包插件
      minify:{
        removeAttributeQuotes: true // 去除html标签中属性的引号
      },
      hash: true,// 避免缓存
      template: './src/index.html',// 指定模板
    }),
    // new extractTextPlugin('/css/index.css'), // 指定css文件 
    new MiniCssExtractPlugin({
      filename: "css/[name].css",// 生成的css文件名称
    })
  ],
  //配置webpack开发服务功能
  devServer:{
    contentBase: path.resolve(__dirname,'dist'),// 热更新路径配置
    host: '192.168.1.163',
    compress: true, // 服务器压缩
    port: 1717
  },
}