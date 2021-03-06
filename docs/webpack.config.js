const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const { build } = require("./template");

const NODE_ENV = process.env.NODE_ENV || "development";
const IS_PROD = NODE_ENV === "production";

module.exports = async () => {
  await build();

  return {
    stats: "errors-only",
    mode: NODE_ENV,
    devtool: IS_PROD ? false : "cheap-eval-source-map",
    entry: { bundle: ["./src/index.js"] },
    resolve: {
      alias: { svelte: path.resolve("node_modules", "svelte") },
      extensions: [".mjs", ".js", ".svelte"],
      mainFields: ["svelte", "browser", "module", "main"],
    },
    output: { path: `${__dirname}/build`, filename: "[name].[chunkhash].js" },
    module: {
      rules: [
        {
          test: /\.svelte$/,
          use: { loader: "svelte-loader", options: { hotReload: true } },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: "public/index.html" }),
    ],
  };
};
