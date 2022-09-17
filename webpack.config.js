const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path')
const deps = require("./package.json").dependencies;

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
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
      name: ".",
      filename: "remoteEntry.js",
      remotes: {
        header: 'header@https://header-mf.vercel.app/remoteEntry.js'
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    })
  ],
};
