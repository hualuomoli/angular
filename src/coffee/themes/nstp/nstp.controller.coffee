angular.module 'nstp'
.controller 'nstpCtrl', ['$rootScope', '$scope', '$state', '$localStorage', 'hmCollection', 'nstpService', '$window', ($rootScope, $scope, $state, $localStorage, hmCollection, nstpService, $window)->

  # setting
  $scope.app = {
    name: 'Angulr',
    version: '1.3.3',
    #
    color: {
      primary: '#7266ba',
      info:    '#23b7e5',
      success: '#27c24c',
      warning: '#fad733',
      danger:  '#f05050',
      light:   '#e8eff0',
      dark:    '#3a3f51',
      black:   '#1c2b36'
    },
    settings: {
      themeID: 1,
      navbarHeaderColor: 'bg-black',
      navbarCollapseColor: 'bg-white-only',
      asideColor: 'bg-black',
      headerFixed: true,
      asideFixed: false,
      asideFolded: false,
      asideDock: false,
      container: false
    }
  }

  # 菜单列表
  $scope.menus = []
  # 菜单树
  $scope.menuTree = []
  # 选中的项目
  $scope.projectMenuTree = {}
  $scope.selected = undefined

  $scope.goMenu = (menu)->

    # 修改项目的菜单
    if menu.pcode != $scope.projectMenuTree.code
      for tree, index in $scope.menuTree
        if menu.pcode == tree.code 
          $scope.projectMenuTree = tree

    # 切换当前状态
    if !menu.children || menu.children.length ==0
      $state.go 'nstp.' + menu.state
    else
      $state.go 'nstp.' + menu.children[0].state


  $scope.show = ()->
    console.log(arguments)


  # 页面加载完成后,加载菜单
  $scope.$watch '$viewContentLoaded', ()->
    nstpService.loadMenus().success (menus)->
      $scope.menus = menus
      $scope.menuTree = hmCollection.parse2Tree menus, {
        "code":"code",
        "pcode": "pCode",
        "label":"name",
        "sort": "orders"
        # "sorts": (d1, d2)->
        #   return d1.sort >= d2.sort
      }
      $scope.projectMenuTree = $scope.menuTree[0]

]