(function() {
	'use strict';

	angular
		.module('hma', [
			'ui.router',
			'oc.lazyLoad',

			// 第三方组件
			'ngStorage',
			'ui.bootstrap',

			// 自定义组件
			'assets',
			// 业务
			'hma.dashboard'

		])

})();