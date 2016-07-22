angular.module 'nstp'
.controller 'nstpCtrl', ['$rootScope', '$scope', '$state', '$localStorage', 'hmUtils', 'nstpService', '$window', ($rootScope, $scope, $state, $localStorage, hmUtils, nstpService, $window)->

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

  treeMenus = []

  # aside --> 菜单列表
  $scope.asideMenus = {}
  # header --> 项目菜单
  $scope.projectMenus = []
  # 查询菜单
  $scope.searchMenus = []
  $scope.selected = undefined

  # 跳转菜单
  goMenu = (menu)->

    # 修改项目的菜单
    if menu.pCode != $scope.asideMenus.code
      for tree, index in treeMenus
        if menu.pCode == tree.code 
          $scope.asideMenus = tree

    # 切换当前状态
    if !menu.children || menu.children.length == 0
      $state.go 'nstp.' + menu.state
    else
      $state.go 'nstp.' + menu.children[0].state

  # 项目选择菜单
  $scope.goMenu = goMenu

  # 搜索菜单
  $scope.show = (menu)->
    return goMenu menu
     


  # 页面加载完成后,加载菜单
  $scope.$watch '$viewContentLoaded', ()->
    nstpService.loadMenus().success (menus)->
      # 转换成数
      treeMenus = hmUtils.tree.parse menus, {
        "code":"code",
        "pcode": "pCode",
        "sort": "orders"
        # "sorts": (d1, d2)->
        #   return d1.sort >= d2.sort
      }
      # 项目菜单
      $scope.projectMenus = treeMenus
      # 左侧菜单,显示第一个项目
      $scope.asideMenus = treeMenus[0] if treeMenus.length >0
      # 查询菜单
      $scope.searchMenus = hmUtils.tree.leaf treeMenus

]