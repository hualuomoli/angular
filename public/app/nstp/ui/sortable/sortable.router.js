(function() {
	'use strict';

	angular
		.module('nstp.ui.sortable')
		.config(router);

	/** @ngInject */
	function router($stateProvider) {

		$stateProvider
			.state('nstp.ui.sortable', {
				url: '/sortable',
				templateUrl: 'nstp/tpl/ui/sortable/sortable.html',
				controller: 'nstp_ui_sortableCtrl',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'app/nstp/ui/sortable/sortable.service.js',
								'app/nstp/ui/sortable/sortable.controller.js'
							]);
						}
					]
				}
			})

	}

})();