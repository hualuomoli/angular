(function() {
	'use strict';

	angular
		.module('nstp.ui.buttons')
		.config(router);

	/** @ngInject */
	function router($stateProvider) {

		$stateProvider
			.state('nstp.ui.buttons', {
				url: '/buttons',
				templateUrl: 'nstp/tpl/ui/buttons/buttons.html',
				controller: 'nstp_ui_buttonsCtrl',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'app/nstp/ui/buttons/buttons.service.js',
								'app/nstp/ui/buttons/buttons.controller.js'
							]);
						}
					]
				}
			})

	}

})();