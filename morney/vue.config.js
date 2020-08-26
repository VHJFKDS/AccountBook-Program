const path = require('path')
// const { config } = require('process')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/AccountBook-website/'
    : '/',
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)    //筛选是svg文件
      .include.add(dir).end() // 只包含 icons 的目录生效，其他目录不走这个规则
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({ extract: false }).end()   //你提取/解析成文件
      .use('svgo-loader').loader('svgo-loader')  //使用svg优化
      .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end()
      //给他添加选项，如有添加svg，则删除它的属性fill
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }])
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录


    // config.module
    //   .rule('svg-sprite')
    //   .test(/\.(svg)(\?.*)?$/)
    //   .include.add(dir).end()
    //   .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({extract: false}).end()
    //   .use('svgo-loader').loader('svgo-loader')
    //   .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]}))
    //   .end()
    // config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'), [{plainSprite: true}])
    // config.module.rule('svg').exclude.add(dir)
  }
}
