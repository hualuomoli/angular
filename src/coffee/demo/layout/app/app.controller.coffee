angular.module 'demo.layout.app'
.controller 'demoLayoutAppCtrl', ['$scope', ($scope)->

  $scope.tabs = [true, false, false]
  $scope.tab = (index)->
    angular.forEach $scope.tabs, (i, v)->
      $scope.tabs[v] = false

    $scope.tabs[index] = true

]