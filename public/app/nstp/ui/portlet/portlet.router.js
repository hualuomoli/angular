(function() {
	'use strict';

	angular
		.module('nstp.ui.portlet')
		.config(router);

	/** @ngInject */
	function router($stateProvider) {

		$stateProvider
			.state('nstp.ui.portlet', {
				url: '/portlet',
				templateUrl: 'nstp/tpl/ui/portlet/portlet.html',
				controller: 'nstp_ui_portletCtrl',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'app/nstp/ui/portlet/portlet.service.js',
								'app/nstp/ui/portlet/portlet.controller.js'
							]);
						}
					]
				}
			})

	}

})();