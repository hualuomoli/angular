(function() {
	'use strict';

	angular
		.module('nstp.dashboard.v1')
		.config(router);

	/** @ngInject */
	function router($stateProvider) {

		$stateProvider
			.state('nstp.dashboard.v1', {
				url: '/v1',
				templateUrl: 'nstp/tpl/dashboard/v1/v1.html',
				controller: 'nstp_dashboard_v1Ctrl',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'app/nstp/dashboard/v1/v1.service.js',
								'app/nstp/dashboard/v1/v1.controller.js'
							]);
						}
					]
				}
			})

	}

})();