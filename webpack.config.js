const merge = require('lodash.merge');
const TerserPlugin = require('terser-webpack-plugin');

/** @type import('webpack').Configuration */
let config = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/ts/main.tsx',
  output: {
    path: `${__dirname}/public/js`,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: ['defaults'],
                    useBuiltIns: 'usage',
                    corejs: 3,
                  },
                ],
              ],
            },
          },
          'ts-loader',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};

if (config.mode === 'development') {
  config.devtool = 'inline-source-map';
  config = merge(config, {
    devtool: 'inline-source-map',
  });
} else {
  config = merge(config, {
    plugins: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            pure_funcs: ['console.log', 'console.info'],
          },
        },
      }),
    ],
  });
}

module.exports = config;
