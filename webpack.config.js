const path = require("path");
const glob = require("glob");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  target: "web",

  entry: {
    background: "./src/background.ts",
    content: "./src/content.ts",
    popup: "./src/popup/popup.tsx",
    newtab: "./src/newtab/newtab.tsx",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    preferRelative: true,
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: path.resolve(__dirname, "src/popup/popup.html"),
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      filename: "newtab.html",
      template: path.resolve(__dirname, "src/newtab/newtab.html"),
      chunks: ["newtab"],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: "src/images",
          to: path.resolve(__dirname, "dist/images"),
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
    },
  },
};
