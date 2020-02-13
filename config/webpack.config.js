const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const buildPath = path.join(__dirname, "..", "build");
const staticPath = path.join(__dirname, "..", "static");

module.exports = {
  entry: {
    background: "./src/background/index.ts",
    options: "./src/options/index.js"
  },
  output: {
    filename: "[name].js",
    path: buildPath
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(html|svelte)$/,
        use: {
          loader: "svelte-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".mjs", ".tsx", ".ts", ".js", ".svelte"],
    alias: {
      svelte: path.resolve("node_modules", "svelte")
    }
  },
  plugins: [new CopyPlugin([{ from: staticPath, to: buildPath }])]
};
