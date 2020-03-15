const path = require('path');
const webpack = require('webpack');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

const umdConfig = {
  target: 'web',

  mode: 'none',

  entry: {
    'di-util.umd': './src/index.js',
    'di-util.umd.min': './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),

    filename: '[name].js', //打包之后生成的文件名，可以随意写。

    library: 'DIUtil', // 指定类库名,主要用于直接引用的方式(比如使用script 标签)

    libraryExport: 'default', // 对外暴露default属性，就可以直接调用default里的属性

    globalObject: 'this', // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况

    libraryTarget: 'umd' // 定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
  },

  module: {
    rules: [
      {
        test: /\.js$/,

        include: [path.resolve(__dirname, 'src')],

        exclude: /(node_modules|bower_components)/,

        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      // ProvidePlugin 可以将模块作为一个变量，被webpack在其他每个模块中引用。只有你需要使用此变量的时候，这个模块才会被 require 进来。

      _: ['lodash']
    })
  ],

  externals: {
    // 从输出的bundle中排除依赖

    lodash: {
      // 可以在各模块系统(Commonjs/Commonjs2/AMD)中通过'lodash'访问，但在全局变量形式下用'_'访问

      commonjs: 'lodash',

      commonjs2: 'lodash',

      amd: 'lodash',

      root: '_' // 指向全局变量
    }
  },

  optimization: {
    minimize: true,
    minimizer: [
      new UglifyjsWebpackPlugin({
        include: /\.min\.js$/
      })
    ]
  }
};

const windowConfig = {
  target: 'web',

  mode: 'none',

  entry: {
    'di-util.window': './src/index.js',
    'di-util.window.min': './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),

    filename: '[name].js',

    library: 'DIUtil',

    libraryExport: 'default',

    libraryTarget: 'window'
  },

  module: {
    rules: [
      {
        test: /\.js$/,

        include: [path.resolve(__dirname, 'src')],

        exclude: /(node_modules|bower_components)/,

        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: ['lodash']
    })
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new UglifyjsWebpackPlugin({
        include: /\.min\.js$/
      })
    ]
  }
};

const varConfig = {
  target: 'web',

  mode: 'none',

  entry: {
    'di-util.var': './src/index.js',
    'di-util.var.min': './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),

    filename: '[name].js',

    library: 'DIUtil',

    libraryExport: 'default',

    libraryTarget: 'var'
  },

  module: {
    rules: [
      {
        test: /\.js$/,

        include: [path.resolve(__dirname, 'src')],

        exclude: /(node_modules|bower_components)/,

        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: ['lodash']
    })
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new UglifyjsWebpackPlugin({
        include: /\.min\.js$/
      })
    ]
  }
};

const commonjs2Config = {
  target: 'node',

  mode: 'none',

  entry: {
    'di-util.commonjs2': './src/index.js',
    'di-util.commonjs2.min': './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),

    filename: '[name].js',

    libraryExport: 'default',

    globalObject: 'this',

    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.js$/,

        include: [path.resolve(__dirname, 'src')],

        exclude: /(node_modules|bower_components)/,

        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: ['lodash']
    })
  ],

  externals: {
    lodash: {
      commonjs: 'lodash',

      commonjs2: 'lodash'
    }
  },

  optimization: {
    minimize: true,
    minimizer: [
      new UglifyjsWebpackPlugin({
        include: /\.min\.js$/
      })
    ]
  }
};

module.exports = [umdConfig, windowConfig, varConfig, commonjs2Config];
