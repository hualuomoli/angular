(function() {
	'use strict';

	angular
		.module('nstp.ui.widgets')
		.config(router);

	/** @ngInject */
	function router($stateProvider) {

		$stateProvider
			.state('nstp.ui.widgets', {
				url: '/widgets',
				templateUrl: 'nstp/tpl/ui/widgets/widgets.html',
				controller: 'nstp_ui_widgetsCtrl',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'app/nstp/ui/widgets/widgets.service.js',
								'app/nstp/ui/widgets/widgets.controller.js'
							]);
						}
					]
				}
			})

	}

})();