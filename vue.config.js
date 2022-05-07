module.exports = {
  // 打包不需要map文件，缺点报错会不知道是哪一行代码
  productionSourceMap: false,
  // 关闭eslint
  // lintOnSave: false
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211'
        // pathRewrite: { '^/api': '/api' }
      }
    }
  }
}
