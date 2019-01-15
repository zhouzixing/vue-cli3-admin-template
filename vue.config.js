const path = require('path');

module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: (config)=>{
        config.resolve.alias
          .set('@', path.join(__dirname, 'src'))
        // 一个规则里的 基础Loader
        // svg是个基础loader
        const svgRule = config.module.rule('svg')

        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()

        // 添加要替换的 loader
        svgRule.use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },

    configureWebpack: (config) => {
      if (process.env.NODE_ENV === 'production') {
          // 为生产环境修改配置...
          config.mode = 'production';
      } else {
          // 为开发环境修改配置...
          config.mode = 'development';
      }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        // open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        // proxy: {
        //  // 设置代理
        //  // proxy all requests starting with /api to jsonplaceholder
        //  'http://localhost:8080/': {
        //      target: 'http://baidu.com:8080', //真实请求的目标地址
        //      changeOrigin: true,
        //      pathRewrite: {
        //          '^http://localhost:8080/': ''
        //      }
        //  }
        // },
        // 在浏览器中输出eslint 错误
        overlay: true,
        before: (app) => {}
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
};
