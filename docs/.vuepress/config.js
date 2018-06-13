module.exports = {
  title: 'lazylife7157\'s blog',
  markdown: {
    config: md => {
      md.use(require("markdown-it-katex"));
    }
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
