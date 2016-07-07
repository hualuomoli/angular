###
# 设置路由
###
angular.module 'app'
.config ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider)->

  # 默认路由
  # $urlRouterProvider.otherwise('/app/demo/dashboard');
  $urlRouterProvider.otherwise('/nstp/demo/dashboard');

  # 路由配置
  $stateProvider
    .state('app', {
      abstract: true,
      url: '/app',
      template: 'app file start <div ui-view></div> app file end'
    })
    .state('app.demo', {
      url: '/demo',
      template: 'demo file start <div ui-view></div> demo file end'
    })
    .state('app.demo.dashboard', {
      url: '/dashboard',
      template: 'dashboard file'
    })

]