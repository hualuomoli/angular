(function() {
	'use strict';

	angular
		.module('nstp.dashboard')
		.config(router);

	/** @ngInject */
	function router($stateProvider) {

		$stateProvider
			.state('nstp.dashboard', {
				abstract: true,
				url: '/dashboard',
				template: '<div ui-view class="fade-in-up"></div>'
			})

	}

})();