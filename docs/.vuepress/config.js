module.exports = {
  title: 'lazylife7157\'s blog',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.9.0/dist/katex.min.css' }]
  ],
  markdown: {
    config: md => {
      md.use(require("@iktakahiro/markdown-it-katex"));
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
  },
  configureWebpack: (config, isServer) => {
    process.env.NODE_ENV = 'production'
  }
}
