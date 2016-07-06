###
# 设置路由
###
angular.module 'app'
.config ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider)->

  # 默认路由
  $urlRouterProvider.otherwise('/nstp/dashboard');

  # 路由配置
  $stateProvider
    .state('app', {
      abstract: true,
      url: '/app',
      template: 'abc <div ui-view></div>eft'
    })
    .state('app.main', {
      url: '/main',
      template: 'this is main file'
    })

]