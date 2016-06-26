(function() {
	'use strict';

	angular
		.module('nstp.ui.timeline')
		.config(router);

	/** @ngInject */
	function router($stateProvider) {

		$stateProvider
			.state('nstp.ui.timeline', {
				url: '/timeline',
				templateUrl: 'nstp/tpl/ui/timeline/timeline.html',
				controller: 'nstp_ui_timelineCtrl',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'app/nstp/ui/timeline/timeline.service.js',
								'app/nstp/ui/timeline/timeline.controller.js'
							]);
						}
					]
				}
			})

	}

})();