const { defineConfig } = require('@vue/cli-service');
module.exports = {
  devServer: {
    compress: true,
    disableHostCheck: true,
  },
};
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/todo': {
        target: 'http://localhost',
      },
    },
  },
});
