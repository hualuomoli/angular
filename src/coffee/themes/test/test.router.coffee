###
# 设置路由
###
angular.module 'test'
.config ['$stateProvider', ($stateProvider)->

  # 路由配置
  $stateProvider
    .state('test', {
      url: '/test',
      template: 'test file <div ui-view></div>'
    })
   

]