const { resolve } = require('path')
const { DefinePlugin, LoaderOptionsPlugin, optimize } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CompressionPlugin = require('compression-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const DEVELOPMENT_CONFIG = require('./config/development.json');
const DEVELOPMENT_80_CONFIG = require('./config/development80.json');
const PRODUCTION_CONFIG = require('./config/production.json');
const PROXY_CONFIG = require('./config/proxy.json');

module.exports = function createWebpackConfig(env) {
  console.log('Environment:', env);
  const test = !!env && !!env.test;

  let apiConfig;

  if (env.dev && env.windows) {
    apiConfig = DEVELOPMENT_80_CONFIG;
  }
  else if (env.dev) {
    apiConfig = DEVELOPMENT_CONFIG;
  }
  else {
    apiConfig = PRODUCTION_CONFIG;
  }

  const DEFAULT_PLUGINS = [
    new DefinePlugin({
      API_CONFIG: JSON.stringify(env.proxy ? PROXY_CONFIG : apiConfig)
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
  ].concat(test ? [] : [
    new optimize.CommonsChunkPlugin({
      // Optimizing ensures loading order in index.html
      name: ['legacy']
    }),
    new optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      name: 'inline',
      filename: 'inline.js',
      sourceMapFilename: 'inline.map'
    }),
  ]);

  const DEVELOPMENT_PLUGINS = [
    
  ];

  const PRODUCTION_PLUGINS = [
    // new optimize.DedupePlugin(),
    new optimize.OccurrenceOrderPlugin(true),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: (env.prod || env.test) ? '"production"' : '"development"',
      }
    }),
    new WebpackMd5Hash(),
    new optimize.UglifyJsPlugin({
      mangle: { screw_ie8 : true },
      compress: { screw_ie8: true },
      sourceMap: true
    }),
  ];

  const PLUGINS = env.prod ?
    [ ...DEFAULT_PLUGINS, ...PRODUCTION_PLUGINS ]: [ ...DEFAULT_PLUGINS, ...DEVELOPMENT_PLUGINS ];

  return {
    entry: {
      legacy: './app/index',
    },
    output: {
      path: resolve(__dirname, 'lighting_ui/static'),
      pathinfo: !env.prod,
      filename: '[name].[chunkhash].bundle.js',
      sourceMapFilename: '[name].[chunkhash].bundle.map',
      chunkFilename: '[id].[chunkhash].chunk.js'
    },
    devtool: env.prod ? false : 'eval',
    bail: env.prod,
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [
        'node_modules',
        resolve(__dirname, 'modules')
      ]
    },
    plugins: PLUGINS,
    devServer: {
      quiet: false,
      noInfo: false,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false
      },
      proxy: {
        '/api/v1/*': proxyTo(apiConfig.apiBaseUrl),
        '/lightsocket/*': proxyTo(apiConfig.lightSocket),
        '/theme.js': proxyTo(apiConfig.theme)
      }
    },
    module: {
      rules: [
      /**
       * The following turns on linting for ES6 as part of the build process. However,
       * because there are nearly 3000 warnings/errors this is currently
       * disabled.
       */
      //   {
      //     test: /\.js$/,
      //     loaders: 'eslint', exclude: /(bower_components|node_modules)/
      //   },
        {
          test: /\.ts$/,
          loaders: 'tslint-loader',
          enforce: 'pre'
        },
        {
          test: /\.js$/,
          loader: 'ng-annotate-loader?add=true!babel-loader',
          exclude: /(bower_components|node_modules)/
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader?' + JSON.stringify({ transpileOnly: env.prod }),
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader?modules!resolve-url-loader!sass-loader?sourceMap'
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [
            path('app/index.html')
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader?attrs=link:href',
          include: [
            path('app/index.html')
          ]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /(\.pdf?$|\.png?$|\.jpg?$|\.jpeg?$|\.svg?$|\.eot?$|\.ttf?$|\.woff?$|\.woff2?$|\.wav?$|\.mp3?$|\.ico?$)/,
          loader: 'file-loader'
        }
      ]
    },
    node: {
      fs: 'empty',
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
};

function path(to) {
  return resolve(__dirname, to);
}

function proxyTo(target) {
  return {
    target,
    prependPath: false,
    changeOrigin: true,
    ws: true
  };
}
