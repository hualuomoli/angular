###
# 设置路由
###
angular.module 'nstp'
.config ['$stateProvider', ($stateProvider)->

  # 路由配置
  $stateProvider
    .state('nstp', {
      url: '/nstp',
      templateUrl: 'nstp/tpl/app.html',
      controller: 'nstpCtrl',
      resolve: {
        deps: ['$ocLazyLoad', ($ocLazyLoad)->
          return $ocLazyLoad.load([
            'nstp/css/animate.css',
            'nstp/css/app.css'
          ])
        ]
      }
    })
   

]