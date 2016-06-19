 (function() {
   'use strict';

   angular.module('app')
     .directive('nstpUiModule', nstpUiModule);

   /** @ngInject */
   function nstpUiModule(MODULE_CONFIG, uiLoad, $compile) {
     return {
       restrict: 'A',
       compile: function(el, attrs) {
         var contents = el.contents().clone();
         return function(scope, el, attrs) {
           el.contents().remove();
           uiLoad.load(MODULE_CONFIG[attrs.nstpUiModule])
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