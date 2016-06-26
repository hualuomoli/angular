(function() {
	'use strict';

	angular
		.module('nstp.dashboard', [

			'ui.router',
			'oc.lazyLoad',

			'assets',

			'nstp.dashboard.v1',
			'nstp.dashboard.v2'

		])

})();