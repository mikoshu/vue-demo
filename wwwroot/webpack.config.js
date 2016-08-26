module.exports = {
  entry: "./src/main.js",
  output: {
    path: "./build",
    publicPath: "/build/",
    filename: "build.js"
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: "vue" },
      { test: /\.html$/, loader: "html" }
    ]
  },
  vue: {
      loaders: {
          css: 'style!css',
          html:'html-loader'
      }
  }
}