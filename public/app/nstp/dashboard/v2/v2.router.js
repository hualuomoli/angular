(function() {
	'use strict';

	angular
		.module('nstp.dashboard.v2')
		.config(router);

	/** @ngInject */
	function router($stateProvider) {

		$stateProvider
			.state('nstp.dashboard.v2', {
				url: '/v2',
				templateUrl: 'nstp/tpl/dashboard/v2/v2.html',
				controller: 'nstp_dashboard_v2Ctrl',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'app/nstp/dashboard/v2/v2.service.js',
								'app/nstp/dashboard/v2/v2.controller.js'
							]);
						}
					]
				}
			})

	}

})();