const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const buildPath = path.join(__dirname, "..", "build");
const staticPath = path.join(__dirname, "..", "static");

module.exports = {
  entry: {
    background: "./src/background/index.ts"
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
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [new CopyPlugin([{ from: staticPath, to: buildPath }])]
};
