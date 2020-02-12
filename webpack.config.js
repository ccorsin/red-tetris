var path = require('path');

module.exports = {
  entry: "./src/client/index.js",

  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js"
  },

  module: {
      loaders: 
      [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["env", "react", "stage-0"]
        }
      }],
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|mp3)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name][hash].[ext]"
            }
          }
        ]
      }
    ]
  }
};