const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const buildPath = path.join(__dirname, "..", "build");
const staticPath = path.join(__dirname, "..", "static");
const srcPath = path.join(__dirname, "..", "src");

module.exports = {
  entry: {
    background: "./src/background/index.ts",
    options: "./src/options/index.js",
    popup: "./src/popup/index.ts"
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
      svelte: path.resolve("node_modules", "svelte"),
      // Keep up to date with tsconfig.json
      "@lib": path.resolve(srcPath, "lib"),
      "@options": path.resolve(srcPath, "options"),
      "@popup": path.resolve(srcPath, "popup")
    }
  },
  plugins: [new CopyPlugin([{ from: staticPath, to: buildPath }])]
};
