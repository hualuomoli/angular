(function () {
  'use strict';

  angular
    .module('nstp.ui.tree')
    .config(router);

  /** @ngInject */
  function router($stateProvider) {

    $stateProvider
      .state('nstp.ui.tree', {
        url: '/tree',
        templateUrl: 'nstp/tpl/ui/tree/tree.html',
        controller: 'nstp_ui_treeCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad) {
              return $ocLazyLoad.load([
                  'bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css',
                  'bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js'
                ])
                .then(function () {
                  return $ocLazyLoad.load([
                    'app/nstp/ui/tree/tree.service.js',
                    'app/nstp/ui/tree/tree.controller.js'
                  ]);
                })
            }
          ]
        }
      })

  }

})();