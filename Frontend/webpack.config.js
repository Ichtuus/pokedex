const path = require("path");
// const ESLintPlugin = require("eslint-webpack-plugin");

const { NODE_ENV } = process.env;

const config = {
  entry: "./src/index.ts",
  // plugins: [
  //   new ESLintPlugin({
  //     extensions: [".ts", ".tsx", ".js"],
  //   }),
  // ],

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
    filename: "bundle.js",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader",
        // options: {
        //   name: '/public/icons/[name].[ext]'
        // }
      },

      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },

      {
        test: /\.scss$/,
        use: [
          "raw-loader",
          {
            loader: "sass-loader",
            options: {
              includePaths: [path.resolve(__dirname, "node_modules")],
            },
          },
        ],
      },

      {
        test: /\.html$/i,
        loader: "html-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [/node_modules/],
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
};

if (NODE_ENV === "DEVELOPMENT") {
  config.devServer = {
    disableHostCheck: true,
    host: "localhost",
    port: 8080,
    historyApiFallback: true,
    hot: true,
    inline: true,
    overlay: true,
    clientLogLevel: "warning",
    quiet: true,
    proxy: {
      "/api": "http://localhost:9999/",
    },
  };

  config.devtool = "inline-source-map";
}

if (NODE_ENV === "PRODUCTION") {
  config.devtool = "source-map";
}

module.exports = config;
