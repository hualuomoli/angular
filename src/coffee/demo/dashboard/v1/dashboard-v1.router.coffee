angular.module 'demo.dashboard.v1'
.config ['themeProvider', (themeProvider)->

  # 路由配置
  themeProvider
    .state('demo.dashboard.v1', {
      url: '/v1',
      templateUrl: 'demo/tpl/dashboard/dashboard-v1.html',
      controller: 'demoDashboardV1Ctrl'
    })


]