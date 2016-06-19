 /**
  * 全屏
  *
  */
 (function() {
   'use strict';

   angular.module('app')
     .directive('nstpUiFullscreen', nstpUiFullscreen);

   /** @ngInject */
   function nstpUiFullscreen(VENDOR_CONFIG, uiLoad, $document, $window) {
     return {
       restrict: 'AC',
       template: '<i class="fa fa-expand fa-fw text"></i><i class="fa fa-compress fa-fw text-active"></i>',
       link: function(scope, el, attr) {
         el.addClass('hide');
         uiLoad.load(VENDOR_CONFIG.screenfull).then(function() {
           // disable on ie11
           if (window.screenfull.enabled && !navigator.userAgent.match(/Trident.*rv:11\./)) {
             el.removeClass('hide');
           }
           el.on('click', function() {
             var target;
             attr.target && (target = $(attr.target)[0]);
             window.screenfull.toggle(target);
           });
           $document.on(window.screenfull.raw.fullscreenchange, function() {
             if (window.screenfull.isFullscreen) {
               el.addClass('active');
             } else {
               el.removeClass('active');
             }
           });
         });
       }
     };
   }

 })();