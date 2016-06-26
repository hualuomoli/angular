(function() {
	'use strict';

	angular
		.module('nstp.ui.toaster')
		.config(router);

	/** @ngInject */
	function router($stateProvider) {

		$stateProvider
			.state('nstp.ui.toaster', {
				url: '/toaster',
				templateUrl: 'nstp/tpl/ui/toaster/toaster.html',
				controller: 'nstp_ui_toasterCtrl',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'toaster'
							]).then(function() {
								return $ocLazyLoad.load([
									'app/nstp/ui/toaster/toaster.service.js',
									'app/nstp/ui/toaster/toaster.controller.js'
								]);
							});
						}
					]
				}
			})

	}

})();