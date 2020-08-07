const path = require('path')
const { config } = require('process')

module.exports = {
  lintOnSave: false,
  chainWebpack:config=>{
    const dir = path.resolve(__dirname,'src/assets/icons')

    config.module   
      .rule('svg-sprite')
      .test(/\.svg$/)    //筛选是svg文件
      .include.add(dir).end() // 只包含 icons 的目录生效，其他目录不走这个规则
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract:false}).end()   //你提取/解析成文件
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录
  }
}
