 (function() {
   'use strict';

   angular.module('app')
     .directive('uiScroll', uiScroll);

   /** @ngInject */
   function uiScroll($location, $anchorScroll) {
     return {
       restrict: 'AC',
       link: function(scope, el, attr) {
         el.on('click', function(e) {
           $location.hash(attr.uiScroll);
           $anchorScroll();
         });
       }
     };
   }

 })();