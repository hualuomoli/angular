(function() {
	'use strict';

	angular
		.module('app')
		.config(router);

	/** @ngInject */
	function router($urlRouterProvider) {

		// 默认路由
		$urlRouterProvider.otherwise('/nstp/dashboard/v1');

	}

})();