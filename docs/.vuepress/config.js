module.exports = {
  title: 'lazylife7157\'s blog',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.10.0-alpha/dist/katex.min.css' }]
  ],
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
