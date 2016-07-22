angular.module 'demo.dashboard.v2'
.config ['themeProvider', (themeProvider)->

  # 路由配置
  themeProvider
    .state('demo.dashboard.v2', {
      url: '/v2',
      templateUrl: 'demo/tpl/dashboard/dashboard-v2.html',
      controller: 'demoDashboardV2Ctrl'
    })


]