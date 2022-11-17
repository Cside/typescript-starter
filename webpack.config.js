const config = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    background: './src/background.ts',
    popup: './src/popup.ts',
    options: './src/options.ts',
    'content-script': './src/contentScript.ts',
  },
  output: {
    path: `${__dirname}/public/js`,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: ['last 1 years and Chrome >= 1'],
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
      name: 'vendor',
      chunks(chunk) {
        return chunk.name !== 'background';
      },
    },
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};

if (config.mode === 'development') {
  config.devtool = 'inline-source-map';
}

module.exports = config;
