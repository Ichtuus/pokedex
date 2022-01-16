const path = require("path");
const { NODE_ENV } = process.env;

const config = {
  entry: "./src/index.ts",

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
    filename: "bundle.js",
  },

  resolve: {
    extensions: [".ts", ".js"],
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
        test: /\.ts$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [/node_modules/],
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
          "sass-loader?sourceMap",
        ],
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
    open: true,
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
