(function() {
	'use strict';

	angular
		.module('nstp.ui')
		.config(router);

	/** @ngInject */
	function router($stateProvider) {

		$stateProvider
			.state('nstp.ui', {
				abstract: true,
				url: '/ui',
				template: '<div ui-view class="fade-in-up"></div>'
			})

	}

})();