(function () {
  'use strict';

  angular
    .module('nstp.ui.tree')
    .controller('nstp_ui_treeCtrl', nstp_ui_treeCtrl);

  /** @ngInject */
  function nstp_ui_treeCtrl($scope, nstp_ui_treeService, $timeout) {

    // 页面加载完成后,加载数据
    $scope.$watch('$viewContentLoaded', function () {
      loadData();
    });

    var tree;
    $scope.my_tree = tree = {};

    $scope.doing_async = true;
    $scope.my_data = [];
    var treedata_avm, treedata_geography;

    function loadData() {
      nstp_ui_treeService
        .loadData()
        .then(function (data) {
          $scope.my_data = data;
          treedata_avm = data;
          $scope.doing_async = false;
        });
      nstp_ui_treeService
        .loadRandomData()
        .then(function (data) {
          treedata_geography = data;
        });
    }

    // 测试方法
    // 改变数据
    $scope.try_changing_the_tree_data = function () {
      if ($scope.my_data === treedata_avm) {
        $scope.my_data = treedata_geography;
      } else {
        $scope.my_data = treedata_avm;
      }
    }

    // 异步加载
    $scope.try_async_load = function () {
      $scope.my_data = [];
      $scope.doing_async = true;
      $timeout(function () {
        if (Math.random() < 0.5) {
          $scope.my_data = treedata_avm;
        } else {
          $scope.my_data = treedata_geography;
        }
        $scope.doing_async = false;
        $timeout(function () {
          tree.expand_all();
        });
      }, 1000);
    }

    // 动态添加branch
    $scope.try_adding_a_branch = function () {
      var b = tree.get_selected_branch();
      tree.add_branch(b, {
        label: 'New Branch',
        data: {
          something: 42,
          "else": 43
        }
      });
    }

    // 选中
    $scope.my_tree_handler = function (branch) {
      $scope.output = "You selected: " + branch.label;
      console.log(branch);
    };

  }

})();