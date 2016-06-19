(function() {
	'use strict';

	angular
		.module('nstp', [
			'ui.router',
			'oc.lazyLoad',

			// 第三方组件
			// 'ngAnimate',
			// 'ngCookies',
			// 'ngResource',
			// 'ngSanitize',
			// 'ngTouch',
			'ngStorage',
			'ui.bootstrap',

			// 自定义组件
			'assets',
			// 'ui.jq',
			// 'ui.validate',

			// 业务
			'nstp.dashboard'

		])

})();