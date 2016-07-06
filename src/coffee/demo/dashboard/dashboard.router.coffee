angular.module 'demo.dashboard'
.config ['$stateProvider', ($stateProvider)->

  # 路由配置
  $stateProvider
    .state('nstp.dashboard', {
      url: '/dashboard',
      template: 'this is demo a dashboard file'
    })


]