 (function() {
   'use strict';

   angular.module('app')
     .directive('uiModule', uiModule);

   /** @ngInject */
   function uiModule(MODULE_CONFIG, uiLoad, $compile) {
     return {
       restrict: 'A',
       compile: function(el, attrs) {
         var contents = el.contents().clone();
         return function(scope, el, attrs) {
           el.contents().remove();
           uiLoad.load(MODULE_CONFIG[attrs.uiModule])
             .then(function() {
               $compile(contents)(scope, function(clonedElement, scope) {
                 el.append(clonedElement);
               });
             });
         }
       }
     };

   }

 })();