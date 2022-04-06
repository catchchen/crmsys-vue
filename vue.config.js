module.exports = {
  devServer: {
    // 服务的端口号
    port: 8888,
    // 启动时 自动打开网页
    open: true,
    proxy: {
      // 代理规则
      '/api': { // 配置的url请求名字开头
      // 代理的目标服务器地址,这个路径是我代理到服务器,即你要请求的第三方接口
        target: 'http://localhost:9999',
        // https请求需要该设置
        secure: false,
        // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        // 必须设置该项
        changeOrigin: true,
        // 将 '/api' 替换成 ''
        // 重写路径运行后就代理到对应的地址
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
