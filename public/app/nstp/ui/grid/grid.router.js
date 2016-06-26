(function() {
	'use strict';

	angular
		.module('nstp.ui.grid')
		.config(router);

	/** @ngInject */
	function router($stateProvider) {

		$stateProvider
			.state('nstp.ui.grid', {
				url: '/grid',
				templateUrl: 'nstp/tpl/ui/grid/grid.html',
				controller: 'nstp_ui_gridCtrl',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'app/nstp/ui/grid/grid.service.js',
								'app/nstp/ui/grid/grid.controller.js'
							]);
						}
					]
				}
			})

	}

})();