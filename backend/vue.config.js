module.exports = {
  runtimeCompiler: true,

  css: {
    sourceMap: true
  },

  pluginOptions: {
    apollo: {
      enableMocks: false,
      enableEngine: false
    }
  },

  chainWebpack(config) {
    config.module // optional
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()

    config.module
      .rule('mjs')
      .test(/\.mjs$/)
      .include.add(/node_modules/)
      .end()
      .type('javascript/auto')
      .end()

    config.resolve.extensions
      .add('.mjs')
      .add('.gql')
      .add('.graphql')
      .end()
  },
}
