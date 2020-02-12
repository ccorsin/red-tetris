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
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: [
            // 'file-loader',
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ],
          },
        ],
      }
    ]
  }
};