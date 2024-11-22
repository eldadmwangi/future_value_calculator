const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point for your app
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output filename
    clean: true, // Clean the output directory before each build
  },
  mode: 'development', // Change to 'production' for production builds
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // Match .css files
        use: ['style-loader', 'css-loader'], // Process CSS files
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i, // Match image files
        type: 'asset/resource', // Handle assets
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these file types
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML template file
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve files from public directory
    },
    port: 3000, // Development server port
    open: true, // Automatically open the browser
    hot: true, // Enable Hot Module Replacement
    historyApiFallback: true, // Support React Router
  },
};
