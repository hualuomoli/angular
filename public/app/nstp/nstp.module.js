(function() {
	'use strict';

	angular
		.module('nstp', [
			'ui.router',
			'oc.lazyLoad',

			'ngStorage',
			'bui.bootstrap',

			'assets',
			'ui.jq',
			'ui.validate',

			// 模块
			'nstp.dashboard',
			'nstp.ui'

		])

})();