(function() {
	'use strict';

	angular
		.module('nstp.ui.icons')
		.config(router);

	/** @ngInject */
	function router($stateProvider) {

		$stateProvider
			.state('nstp.ui.icons', {
				url: '/icons',
				templateUrl: 'nstp/tpl/ui/icons/icons.html',
				controller: 'nstp_ui_iconsCtrl',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'app/nstp/ui/icons/icons.service.js',
								'app/nstp/ui/icons/icons.controller.js'
							]);
						}
					]
				}
			})

	}

})();