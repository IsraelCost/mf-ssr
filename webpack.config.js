const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist', 'public'),
    filename: 'main.js'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "ssr",
      filename: "remoteEntry.js",
      remotes: {
        header: 'header@https://s3.sa-east-1.amazonaws.com/smartcity-v2.0/test/dist/remoteEntry.js'
      },
      exposes: {},
      shared: {},
    })
  ],
};
