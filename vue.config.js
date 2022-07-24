const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { defineConfig } = require('@vue/cli-service')
const IconsResolver = require('unplugin-icons/resolver')
const Icons = require('unplugin-icons/webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_PATH,
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
      }
    },
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          ElementPlusResolver(),
        ],
      }),
      Icons({
        autoInstall: true,
      }),
      require('unplugin-element-plus/webpack')({
        // options
      }),
      require('unplugin-icons/webpack')({
        /* options */
      }),
    ],
  },
  pwa: {
    name: '全国疫情低中高风险地区查询',
    themeColor: '#409EFF',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    assetsVersion: '1.0.7',
  },
})
