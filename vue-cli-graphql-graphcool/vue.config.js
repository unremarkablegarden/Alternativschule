module.exports = {
  runtimeCompiler: true,

  css: {
    sourceMap: true
  },

  pluginOptions: {
    apollo: {
      enableMocks: true,
      enableEngine: false
    }
  }
}