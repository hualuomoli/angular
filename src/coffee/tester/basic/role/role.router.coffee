angular.module 'tester.basic.role'
.config ['themeProvider', (themeProvider)->

  # 路由配置
  themeProvider
    .state('tester.basic.role', {
      url: '/role',
      template: 'this is tester basic role html',
      # controller: 'testerbasicV1Ctrl'
    })


]