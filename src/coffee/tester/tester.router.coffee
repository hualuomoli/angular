angular.module 'tester'
.config ['themeProvider', (themeProvider)->

  # 路由配置
  themeProvider
    .state('tester', {
      url: '/tester',
      template: '<div ui-view></div>'
    })


]