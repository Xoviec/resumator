import webpack from "webpack";

module.exports = {
  webpack: {
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    configure: {
      resolve: {
        fallback: {
          process: require.resolve("process/browser.js"),
          zlib: require.resolve("browserify-zlib"),
          stream: require.resolve("stream-browserify"),
          util: require.resolve("util"),
          buffer: require.resolve("buffer"),
          asset: require.resolve("assert"),
        },
        alias: {
          "@react-dnd/asap": "@react-dnd/asap/dist/esm/browser/asap.js",
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser.js",
        }),
      ],
    },
  },
};
