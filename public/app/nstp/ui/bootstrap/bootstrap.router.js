(function() {
	'use strict';

	angular
		.module('nstp.ui.bootstrap')
		.config(router);

	/** @ngInject */
	function router($stateProvider) {

		$stateProvider
			.state('nstp.ui.bootstrap', {
				url: '/bootstrap',
				templateUrl: 'nstp/tpl/ui/bootstrap/bootstrap.html',
				// controller: 'nstp_ui_bootstrapCtrl',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'app/nstp/ui/bootstrap/bootstrap.service.js',
								'app/nstp/ui/bootstrap/bootstrap.controller.js'
							]);
						}
					]
				}
			})

	}

})();