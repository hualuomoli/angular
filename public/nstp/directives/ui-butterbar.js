/**
 * 加载进度条
 * 1、路由切换时,显示加载条
 * 2、路由切换完成,页面加载完成后,隐藏加载条
 */
(function() {
  'use strict';

  angular.module('app')
    .directive('nstpUiButterbar', nstpUiButterbar);

  /** @ngInject */
  function nstpUiButterbar($rootScope, $anchorScroll) {
    return {
      restrict: 'AC',
      template: '<span class="bar"></span>',
      link: function(scope, el, attrs) {
        el.addClass('butterbar hide');
        scope.$on('$stateChangeStart', function(event) {
          $anchorScroll();
          el.removeClass('hide').addClass('active');
        });
        scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
          event.targetScope.$watch('$viewContentLoaded', function() {
            el.addClass('hide').removeClass('active');
          })
        });
      }
    };
  }

})();